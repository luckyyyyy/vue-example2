<template>
	<div class="video" ref="video">
		<div id='video' class='prism-player'></div>
		<div class="video__info" v-if="play">
			<p><span><strong>Live information</strong></span></p>
			<p><span>BitRate:</span> {{ bitRateInfo.bitRate / 1000 | floor }} kbps</p>
			<p><span>FPS:</span>  {{ bitRateInfo.videoFrameRate }}</p>
			<p><span>AudioFrameRate:</span> {{ bitRateInfo.audioFrameRate }}</p>
			<p><span>Time:</span>  {{ bitRateInfo.time | date }}</p>
		</div>
		<div class="lock" v-show="!play || countdown.handel">
			<img src="../../assets/toplogo.png" height="40" width="196">
			<template v-if="countdown.handel">
				<p>主播已经开始推流</p>
				<p>但由于您的终端设备限制，视频将在{{ countdown.time }}秒后开始</p>
			</template>
			<template v-else>
				<p>{{ lock ? `正在刷新直播状态` : '主播还未开始直播或断开连接，请尝试刷新' }}</p>
				<iButton size="large" type="primary" :loading="lock" @click="checkStatus(true)">刷新</iButton>
			</template>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import '@/assets/libs/prism/index-min.css'
	import { isiPad, isDevelop, date } from '@/utils/util'
	let prism;
	if (isiPad()) {
		import('@/assets/libs/prism/prism-h5-min.js').then(p => prism = p)
	} else {
		import('@/assets/libs/prism/prism-flash-min.js').then(p => prism = p)
	}
	export default {
		props: {
			value: Boolean,
			live: Object
		},
		computed: {
			...mapState('live', [
				'bitRateInfo', 'publishStreamInfo'
			])
		},
		filters: {
			date,
			floor (val) {
				return Math.floor(val);
			}
		},
		data () {
			return {
				play: this.value,
				lock: true,
				countdown: {
					handel: null,
					time: 0,
				}
			}
		},
		mounted () {
			this.checkStatus(true);
		},
		beforeDestroy () {
			this.clearCountdown();
			this.clearInterval();
			window.removeEventListener('resize', this.autoSetPlayerSize, false);
		},
		methods: {
			...mapActions('live', {
				getStreamStatus: 'LIVE_QUERY_STREAM'
			}),
			playVideo () {
				if (this.player) {
					this.player.loadByUrl(this.getSource());
					this.player.play();
				} else {
					const source = this.getSource();
					this.player = new prism({
						id       : 'video',
						source   : source,
						autoplay : false,
						preload  : false,
						isLive   : true,
						showBarTime: '100',
						width    : '100%',
						skinLayout: []
					});
					if (isDevelop()) {
						this.player.on('play', () => {
							this.$Message.info(`DEBUG: source ${source}`)
						})
					}
					// this.player.on('play', () => {
					// 	console.log('play')
					// })
					// this.player.on('pause', () => {
					// 	console.log('pause')
					// })
					// this.player.on('liveStreamStop', () => {
					// 	// alert('liveStreamStop')
					// 	this.checkStatus();
					// })
					// this.player.on('m3u8Retry', () => {
					// 	// alert('m3u8Retry')
					// 	this.checkStatus();
					// })
					window.addEventListener('resize', this.autoSetPlayerSize, false);
					this.autoSetPlayerSize();
					// safari 有问题
					this.player.on('ready', () => {
						this.player.play();
					})
				}
			},
			getSource () {
				return isiPad() ? this.live.liveStream.playOriginM3u8Url : this.live.liveStream.playOriginFlvUrl;
			},
			autoSetPlayerSize () {
				const height = this.$refs.video.offsetHeight - 40;
				this.player.setPlayerSize('100%', `${height}px`);
			},
			checkStatus (lock) {
				this.lock = lock;
				this.getStreamStatus(this.live).then(data => {
					this.play = data.status != 0;
					this.lock = false;
					this.$emit('input', this.play);
				}).catch(() => {
					this.lock = false;
				})
			},
			clearCountdown () {
				if (this.countdown.handel) {
					clearInterval(this.countdown.handel);
					this.countdown.handel = null;
				}
			},
			clearInterval () {
				if (this.Interval) {
					clearInterval(this.Interval);
					this.Interval = null;
				}
			}
		},
		watch: {
			value (val) {
				this.play = val;
				if (this.play) {
					const fnAction = () => {
						this.playVideo();
						if (!this.Interval) {
							this.Interval = setInterval(() => {
								this.checkStatus();
							}, 60000)
						}
					}
					if (isiPad() && !this.countdown.handel) {
						this.countdown.time = 30;
						this.countdown.handel = setInterval(() => {
							if (--this.countdown.time == 0) {
								fnAction();
								this.clearCountdown();
							}
						}, 1000);
					} else {
						fnAction();
					}
				} else {
					if (this.player) {
						this.player.stop();
					}
					this.clearInterval();
					this.clearCountdown();
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.video {
		flex: 4;
		width: 100%;
		background: #333;
		position: relative;
		.video__info {
			position: absolute;
			z-index: 9;
			background: rgba(0, 0, 0, .4);
			color: darken(white, 30%);
			top: 0;
			left: 0;
			visibility: hidden;
			opacity: 0;
			padding: 10px;
			transition: visibility 0.3s, opacity 0.3s;
			backdrop-filter: blur(20px);
			span {
				color: white;
			}
		}
		&:hover {
			.video__info {
				visibility: visible;
				opacity: 1;
			}
		}
		.lock {
			user-select: none;
			// opacity: .2; // DEBUG
			text-shadow: 1px 1px 1px #444;
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			padding-bottom: 50px;
			box-sizing: border-box;
			background-image: radial-gradient(circle at 0 0, #2259eb, #8696ce 15%, #cea59d 37%, #e3a383 55%, #f87074 75%, #d22f7a);
			color: white;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			p {
				padding: 10px;
			}
		}
	}
</style>
