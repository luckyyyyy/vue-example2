<template>
	<div class="video" ref="video">
		<div id='video' class='prism-player'></div>
		<div class="lock" v-show="!start">
			<img src="../../assets/toplogo.png" height="40" width="196">
			<p>{{ lock ? `正在请求直播状态` : '主播还未开始直播或断开连接，请尝试刷新' }}</p>
			<el-button type="primary" :loading="lock" @click="checkStatus">刷新</el-button>
		</div>
	</div>
</template>

<script>
	import '../../assets/prism/index-min.css'
	import prism from '../../assets/prism/prism-min.js'
	import { isiPad } from '../../utils/util'
	export default {
		props: {
			stream: Object,
			play: Boolean
		},
		computed: {
			start () {
				if (this.player) {
					this.play ? this.player.play() : this.player.pause();
				}
				return this.play;
			},
			lock () {
				return this.$store.state.live_query_stream.lock;
			}
		},
		mounted () {
			const source = isiPad() ? this.stream.playOriginM3u8Url : this.stream.playOriginFlvUrl;
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
			if (process.env.NODE_ENV !== 'production') {
				this.player.on('play', () => {
					this.$message(`DEBUG: source ${source}`)
				})
			}
			// this.player.on('play', () => {
			// 	console.log('play')
			// })
			// this.player.on('pause', () => {
			// 	console.log('pause')
			// })
			this.player.on('liveStreamStop', () => {
				this.checkStatus();
			})
			this.player.on('m3u8Retry', () => {
				this.checkStatus();
			})
			window.addEventListener('resize', this.autoSetPlayerSize, false);
			this.player.on('ready', () => {
				// TODO 初始化状态
				this.autoSetPlayerSize();
				this.checkStatus();
			})
		},
		beforeDestroy () {
			window.removeEventListener('resize', this.autoSetPlayerSize, false);
		},
		methods: {
			autoSetPlayerSize () {
				const height = this.$refs.video.offsetHeight - 40;
				this.player.setPlayerSize('100%', `${height}px`);
			},
			checkStatus () {
				const id = this.$store.state.live_query.data.id;
				this.$store.dispatch('LIVE_QUERY_STREAM_REQUEST', { id }).then(data => {
					this.$emit('play', data.status == 0 ? 'publish_done' : 'publish');
				}).catch(() => {
					console.log('获取直播状态')
				})
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
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			padding-bottom: 50px;
			box-sizing: border-box;
			background-image: linear-gradient(90deg,#55bd77,#b7ce00);
			color: white;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			p {
				padding: 10px 0;
			}
		}
	}
</style>
