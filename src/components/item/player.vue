<template>
	<div class="ra-video">
		<div class="ra-video__wrap">
			<video ref="H5video" :src="url" :controls="false" width="100%" height="100%">
				您的浏览器不支持 video 标签。
			</video>
			<div class="ra-video__musk" @click="changePlayStatus"></div>
		</div>
		<div class="ra-video__control">
			<div class="ra-video__left">
				<div class="ra-video__play">播放</div>
				<div class="ra-video__time">时间</div>
				<div class="ra-video__progress">进度条</div>
			</div>
			<div class="ra-video__right">
				<div class="ra-video__volume">音量</div>
				<div class="video__zoom">缩放</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				palyStatus: false,
				url: 'http://111.1.50.52/mp4files/31840000066B89DB/vjs.zencdn.net/v/oceans.mp4',
			}
		},
		methods: {
			changePlayStatus () {
				if (!this.palyStatus) {
					this.$refs.H5video.play();
					this.palyStatus = true;
				} else {
					this.$refs.H5video.pause();
					this.palyStatus = false;
				}
				return this.palyStatus;
			}
		}
	}
</script>

<style scoped lang="less">
	.ra-video {
		position: relative;
		background-color: #f7f8fa;
		overflow: hidden;
		width: 720px;
		&__wrap {
			position: relative;
			width: 720px;
			height: 480px;
			background-color: #000;
			.ra-video__musk {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background: transparent;
			}
		}
		&__control {
			display: flex;
			justify-content: space-between;
			padding: 0 20px;
			height: 40px;
			line-height: 40px;
			.ra-video__left, .ra-video__right {
				display: flex;
			}
		}
	}
</style>