<template>
	<div class="ra-video">
		<div class="ra-video__wrap">
			<video ref="VIDEO" :src.sync="url" :controls="false" width="100%" height="100%">
				您的浏览器不支持 video 标签。
			</video>
			<div v-loading="loading" class="ra-video__musk" @click="changePlayStatus">
				<div v-show="!playStatus" class="ra-video__play-logo">
					<div class="ra-video__play-triangle"></div>
				</div>
			</div>
		</div>
		<div class="ra-video__controls">
			<div class="ra-video__box">
				<div class="ra-video__control" @click="changePlayStatus"><button>播放</button></div>
				<div class="ra-video__control">{{ currentTime | secondsFormat }} / {{ totalTime | secondsFormat }}</div>
			</div>
			<div class="ra-video__box">
				<div class="ra-video__control">音量</div>
				<div class="ra-video__control">缩放</div>
			</div>
			<div class="ra-video__progress" @click="onSelect($event)" ref="PROGRESS">
				<div class="ra-video__progress-bar"></div>
				<div class="ra-video__progress-load"></div>
				<div class="ra-video__progress-play" :style="{ width: percent + '%' }">
					<div class="ra-video__progress-circle" @mousedown="onButtonDown">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { secondsFormat } from '@/filter'
	export default {
		data () {
			return {
				playStatus: false,
				totalTime: 0,
				currentTime: 0,
				loading: true,
				lineWidth: 0,
				isDragging: false,
				url: 'https://p.racdn.com/58f1b4af01304db4b2c958683903350d/transcode_1491730234717/vosa2_0.mp4',
			}
		},
		mounted() {
			this.initPlayer();
		},
		methods: {
//---------------------------------进度条拖动start--------------------------------
			onButtonDown (event) {
				this.isDragging = true;
				event.preventDefault();
				this.onDragStart(event);
				window.addEventListener('mousemove',   this.onDragging);
				window.addEventListener('mouseup',     this.onDragEnd);
				window.addEventListener('contextmenu', this.onDragEnd);
			},
			onDragStart (event) {
				// console.log('start',event.clientX);
			},
			onDragging (event) {
				if (this.isDragging) {
					this.lineWidth   = event.clientX - this.$refs.PROGRESS.getBoundingClientRect().left; // 按钮相对进度条水平坐标
					this.lineWidth   = this.lineWidth < 0 ? 0 : this.lineWidth;
					this.lineWidth   = this.lineWidth > this.progressWidth ? this.progressWidth : this.lineWidth;
					this.currentTime = this.lineWidth / this.progressWidth * this.totalTime;
				}
			},
			onDragEnd () {
				if (this.isDragging) {
					//	防止在 mouseup 后立即触发onSelect的click，导致滑块有几率产生一小段位移
					//	这个坑，element源码是这样解决的
					setTimeout(() => {
						this.isDragging = false;
						this.jumpToTime();
					}, 0);
					window.removeEventListener('mousemove',   this.onDragging);
					window.removeEventListener('mouseup',     this.onDragEnd);
					window.removeEventListener('contextmenu', this.onDragEnd);
				}
			},
//---------------------------------进度条拖动end---------------------------------

//---------------------------------播放/跳转方法start-----------------------------
			changePlayStatus () {
				this.playStatus = !this.playStatus;
			},
			jumpToTime () {
				let percent              = this.lineWidth / this.progressWidth;
				let time                 = percent * this.totalTime;
				this.currentTime         = time;
				this.H5video.currentTime = time;
			},
			onSelect (event) {
				if (this.isDragging) return;
				this.lineWidth = event.offsetX;
				this.jumpToTime();
			},
//---------------------------------播放跳转方法start-----------------------------

//---------------------------------video事件绑定start----------------------------
			initPlayer () {
				[
					this.H5video.onloadstart,
					this.H5video.oncanplay,
					this.H5video.onpause,
					this.H5video.onplay,
					this.H5video.onended,
					this.H5video.onerror,
					this.H5video.ontimeupdate,
				] = [
					this.onLoadstart,
					this.onCanplay,
					this.onPause,
					this.onPlay,
					this.onEnded,
					this.onError,
					this.onTimeupdate
				]
			},
			onLoadstart () {
				this.loading     = true;
			},
			onCanplay () {
				this.loading     = false;
				this.totalTime   = this.H5video.duration;
				this.currentTime = this.H5video.currentTime;
			},
			onPause () {
				//TODO
			},
			onPlay () {
				//TODO
			},
			onEnded () {
				this.playStatus  = false;
				this.currentTime         = 0;
				this.H5video.currentTime = 0;
			},
			onError () {

			},
			onTimeupdate () {
				if (!this.isDragging) {
					this.currentTime       = this.H5video.currentTime;
				}
			}
//---------------------------------video事件绑定end---------------------------------
		},
		computed: {
			H5video () {
				return this.$refs.VIDEO;
			},
			percent () {
				return this.currentTime / this.totalTime * 100;
			},
			progressWidth () {
				return this.H5video.offsetWidth;
			}
		},
		watch: {
			playStatus (status) {
				if (status) {
					this.H5video.play();
				} else {
					this.H5video.pause();
				}
			}
		},
		filters: {
			secondsFormat,
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
				.ra-video__play-logo {
					position: absolute;
					bottom: 30px;
					left: 30px;
					width: 85px;
					height: 85px;
					border: 4px solid #31bedb;
					border-radius: 50%;
					background: rgba(255,255,255,.1);
					cursor: pointer;
					box-shadow: 0px 0px 15px 1px rgba(255,255,255,0.4);
					transition: all .2s linear;
					&:hover {
						box-shadow: 0px 0px 20px 1px rgba(255,255,255,0.6);
					}
					.ra-video__play-triangle {
						position: absolute;
						top: 50%;
						left: 50%;
						margin-top: -25px;
						margin-left: -18px;
						width: 8px;
						height: 50px;
						border-radius: 999px;
						background: #31bedb;
						&:after,&:before {
							content: '';
							display: block;
							width: 8px;
							height: 50px;
							border-radius: 999px;
							background: #31bedb;
							transform-origin: 50% 4px;
							position: absolute;
							top: 0;
							left: 0;
						}
						&:before {
							transform-origin: 50% calc(100% - 4px);
							transform: rotate(60deg);
						}
						&:after {
							transform: rotate(-60deg);
						}
					}
				}
			}
		}
		&__controls {
			display: flex;
			position: relative;
			justify-content: space-between;
			padding: 0 20px;
			height: 40px;
			line-height: 40px;
			.ra-video__box {
				display: flex;
				.ra-video__control {
					margin: 0 10px;
				}
			}
			.ra-video__progress {
				position: absolute;
				cursor: pointer;
				top: -15px;
				left: 0;
				height: 15px;
				width: 100%;
				background-color: transparent;
				&-bar, &-load, &-play {
					position: absolute;
					bottom: 0;
					left: 0;
					height: 2px;
					transition: height .2s linear;
				}
				&-bar {
					width: 100%;
					background-color: rgba(0,0,0,.5);
					z-index: 10;
				}
				&-load {
					z-index: 20;
				}
				&-play {
					background-image: linear-gradient(left, #31bedb, #00FFFF 80%, #dee2da);
					z-index: 30;
					.ra-video__progress-circle {
						position: absolute;
						background-color: #fff;
						border-radius: 50%;
						cursor: pointer;
						height: 0;
						width: 0;
						opacity: 0;
						top: 0;
						right: 0;
						box-shadow: -1px 0 5px #626262;
						transition: all .2s linear;
						z-index: 40;
					}
				}
				&:hover {
					.ra-video__progress-bar,
					.ra-video__progress-load,
					.ra-video__progress-play {
						height: 15px;
					}
					.ra-video__progress-circle{
						margin-right: -8px;
						height: 16px;
						width: 16px;
						opacity: 1;
					}
				}
			}
			.ra-video__slider {

			}
		}
	}
</style>

