<template>
	<div class="player" ref="videoWrap">
		<video id="video" ref="VIDEO" :src.sync="url" :controls="false" width="100%" height="100%">
			您的浏览器不支持 video 标签。
		</video>
		<div class="player__musk" @click.self="changePlayStatus" @dblclick.self="fullScreen">
			<div class="controls">
				<div class="controls-box">
					<div class="controls-item">
						<div class="controls-item__button" @click="changePlayStatus">
							<i class="iconfont" :class="{ 'icon-video-play': !playStatus, 'icon-video-pause': playStatus }"></i>
						</div>
					</div>
					<div class="controls-item">{{ currentTime | secondsFormat }} / {{ totalTime | secondsFormat }}</div>
				</div>
				<div class="controls-box">
					<div class="controls-item">
						<div class="controls-item__button" @click="valumeMute">
							<i class="iconfont" :class="{ 'icon-video-volume': !isMute, 'icon-video-mute': isMute }"></i>
						</div>
						<div class="controls-item__progress" ref="volumeProgress" @click="valumeSelect($event)">
							<div class="progress__bar"></div>
							<div class="progress__play" :style="{ width: volume + '%' }">
								<div class="progress__circle" @mousedown="volumeDown"></div>
							</div>
						</div>
					</div>
					<div class="controls-item">
						<div class="controls-item__button" @click="fullScreen">
							<i class="iconfont icon-video-fullscreen"></i>
						</div>
					</div>
				</div>
				<div class="player__progress" @click="onSelect($event)" ref="PROGRESS">
					<div class="progress__bar"></div>
					<div class="progress__load" :style="{ width: loadPercent + '%' }"></div>
					<div class="progress__play" :style="{ width: percent + '%' }">
						<div class="progress__circle" @mousedown="onButtonDown">
						</div>
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
				playStatus: false,  		// 播放状态
				totalTime: 0,						// video总时长
				currentTime: 0,					// 已播放时长
				loadTime: 0,						// 已缓冲时长
				loading: true,					// 是否正在加载
				lineWidth: 0,						// 已播放长度
				isDragging: false,  		// 是否正在拖放
				volume: 100,						// 音量
				volumeTem: 100,						// 暂存音量
				isVolumeDrgging: false,	// 是否正在拖放音量
				isFullScreen: false,		// 是否全屏
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
//---------------------------------音量条拖动start-------------------------------
			volumeDown () {
				this.isVolumeDrgging = true;
				event.preventDefault();
				this.valumeDragStart(event);
				window.addEventListener('mousemove',   this.valumeDragging);
				window.addEventListener('mouseup',     this.valumeDragEnd);
				window.addEventListener('contextmenu', this.valumeDragEnd);
			},
			valumeDragStart (event) {
				// todo
			},
			valumeDragging (event) {
				if (this.isVolumeDrgging) {
					this.volume   = event.clientX - this.$refs.volumeProgress.getBoundingClientRect().left; // 按钮相对进度条水平坐标
					this.volume   = this.volume < 0 ? 0 : this.volume;
					this.volume   = this.volume > this.volumeProgressWidth ? this.volumeProgressWidth : this.volume;
					this.jumpToVolume();
				}
			},
			valumeDragEnd () {
				if (this.isVolumeDrgging) {
					//	防止在 mouseup 后立即触发onSelect的click，导致滑块有几率产生一小段位移
					//	这个坑，element源码是这样解决的
					setTimeout(() => {
						this.isVolumeDrgging = false;
					}, 0);
					window.removeEventListener('mousemove',   this.valumeDragging);
					window.removeEventListener('mouseup',     this.valumeDragEnd);
					window.removeEventListener('contextmenu', this.valumeDragEnd);
				}
			},
//---------------------------------音量条拖动end---------------------------------
//---------------------------------video控制方法start----------------------------
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
			jumpToVolume () {
				this.H5video.volume = this.volume / 100;
			},
			valumeSelect (event) {
				if (this.isVolumeDrgging) return;
				this.volume = event.offsetX;
				this.jumpToVolume();
			},
			valumeMute () {
				if (!this.isMute) {
					this.volumeTem = this.volume;
					this.volume    = 0;
					return this.jumpToVolume();
				}
				if (this.isMute) {
					this.volume    = this.volumeTem;
					return this.jumpToVolume();
				}
			},
			fullScreen () {
				if(this.isFullScreen){
					this.isFullScreen = false;
					if (document.exitFullscreen) {
						return document.exitFullscreen();
					}
					if (document.msExitFullscreen) {
						return document.msExitFullscreen();
					}
					if (document.mozCancelFullScreen) {
						return document.mozCancelFullScreen();
					}
					if (document.webkitExitFullscreen) {
						return document.webkitExitFullscreen();
					}
				}
				if (!this.isFullScreen){
					this.isFullScreen = true;
					if (this.$refs.videoWrap.requestFullscreen) {
						return this.$refs.videoWrap.requestFullscreen()
					}
					if (this.$refs.videoWrap.mozRequestFullscreen) {
						return this.$refs.videoWrap.mozRequestFullScreen()
					}
					if (this.$refs.videoWrap.webkitRequestFullscreen) {
						return this.$refs.videoWrap.webkitRequestFullscreen()
					}
				}

			},
//---------------------------------播放/跳转方法end-----------------------------
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
				];
				this.H5video.controls = false;
				this.H5video.volume   = this.volume / 100;
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
				this.playStatus  = false;
			},
			onPlay () {
				//TODO
				this.playStatus  = true;
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
					this.loadTime          = this.H5video.buffered.end(0);
				}
			}
//---------------------------------video事件绑定end---------------------------------
		},
		computed: {
			H5video () {
				return this.$refs.VIDEO
			},
			percent () {
				return this.currentTime / this.totalTime * 100
			},
			loadPercent () {
				return	this.loadTime / this.totalTime * 100
			},
			progressWidth () {
				return this.H5video.offsetWidth
			},
			isMute () {
				return this.volume == 0 ? true : false
			},
			volumeProgressWidth () {
				return this.$refs.volumeProgress.offsetWidth
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
	@import url(../../assets/styles/components/player.less);
</style>

