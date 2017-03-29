<template>
	<div class="video" ref="video">
		<div id='video' class='prism-player'></div>
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
	import '../../assets/libs/prism/index-min.css'
	import { isiPad, isDev } from '../../utils/util'
	import { mapActions } from 'vuex'
	// 其实都加载了 只是es6 import 不可以做判断 解决Safari问题
	//
	let prism;
	require.ensure([], function(require){
		prism = isiPad() ? require('../../assets/libs/prism/prism-h5-min.js') :
						   require('../../assets/libs/prism/prism-flash-min.js');
	});

	export default {
		props: {
			value: Boolean,
			live: Object
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
		computed: {
			// check () {
			// 	const init = this.$store.state.im.init;
			// 	if (init) {
			// 		this.clearInterval();
			// 	}
			// 	return init;
			// },
		},
		mounted () {
			this.checkStatus(true);
		},
		beforeDestroy () {
			this.clearCountdown();
			window.removeEventListener('resize', this.autoSetPlayerSize, false);
			// this.clearInterval();
		},
		methods: {
			...mapActions('live/query_stream', {
				getStreamStatus: 'LIVE_QUERY_STREAM_REQUEST'
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
					if (isDev()) {
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
			// clearInterval () {
			// 	if (this.interval) {
			// 		clearInterval(this.interval);
			// 		this.interval = undefined;
			// 	}
			// },
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
			}
		},
		watch: {
			value (val) {
				this.play = val;
				if (this.play) {
					const fnAction = () => {
						this.playVideo();
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
					// this.player.liveStreamStop();
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
