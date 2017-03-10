<template>
	<div class="video" ref="video">
		<div id='video' class='prism-player'></div>
		<div class="lock" v-show="pause">
			<img src="../../assets/toplogo.png" height="40" width="196">
			<p>主播还未开始直播或断开连接，尝试刷新</p>
			<el-button type="primary" @click="onTryPlay">刷新</el-button>
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
		data () {
			return {
				pause: true,
				player: {},
			}
		},
		computed: {
			start () {
				this.play ? this.palyer.play() : this.palyer.pause();
				return this.play;
			}
		},
		mounted () {
			const source = isiPad() ? this.stream.playOriginM3uUrl : this.stream.playOriginFlvUrl;
			this.player = new prism({
				id       : 'video',
				source   : source,
				autoplay : false,
				preload  : true,
				isLive   : true,
				showBarTime: '100',
				width    : '100%',
				skinLayout: []
			});
			if (process.env.NODE_ENV !== 'production') {
				this.player.on('play', () => {
					this.$message(`DEBUG: 播放视频${source}`)
				})
			}
			this.player.on('play', () => {
				this.pause = false;
			})
			this.player.on('pause', () => {
				this.pause = true;
			})

			this.player.on('liveStreamStop', () => {
				this.pause = true;
			})
			this.player.on('m3u8Retry', () => {
				this.pause = true;
			})
			window.addEventListener('resize', this.autoSetPlayerSize, false);
			this.autoSetPlayerSize();
		},
		beforeDestroy () {
			window.removeEventListener('resize', this.autoSetPlayerSize, false);
		},
		methods: {
			autoSetPlayerSize () {
				const height = this.$refs.video.offsetHeight - 40;
				this.player.setPlayerSize('100%', `${height}px`);
			},
			onTryPlay () {
				// this.lockStream = false;
				this.player.pause();
				this.player.play();
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
