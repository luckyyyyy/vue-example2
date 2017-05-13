<template>
	<div class="view">
		<div class="switch">
			<p>视频回放管理</p>
		</div>
		<div class="body">
			<p class="tips">您可以删除这里的视频，则会释放您的存储空间。</p>
		</div>
		<el-row class="video-list">
			<template v-if="video.transcodeStatus == 1">
				<el-col v-for="(item, index) in video.medias" :key="item.coverURL" class="video-list__box" :xs="12" :sm="12" :md="8" :lg="6">
					<div class="video-list__cover">
						<img src="../../assets/test.png" alt="videoCover">
						<p class="video-list__detail">
							<span class="video-list__name">
								{{ video.liveInfo.name }}
							</span>
							<span class="video-list__time">
								{{ item.hdPlayList[0].duration }}
							</span>
						</p>
						<div class="video-list__musk" @click="playVideo(item.hdPlayList[0].file)">
							<i class="iconfont icon-videoplay"></i>
						</div>
					</div>
					<div class="video-list__content">
						<p class="video-list__title">选集 {{ index + 1 }}</p>
						<div class="video-list__control">
							<a class="video-list__download">
								<i class="iconfont icon-video-download"></i>
							</a>
							<span class="video-list__line"></span>
							<a class="video-list__delete">
								<i class="iconfont icon-video-delete"></i>
							</a>
						</div>
					</div>
				</el-col>
			</template>
			<template v-else>
				<h1>正在转码中...</h1>
			</template>
		</el-row>
		<h1>..测试</h1>
		<div class="video-player">
			<video ref="H5video":src="videoURL" controls="controls" width="100%" height="100%">
				您的浏览器不支持 video 标签。
			</video>
			<div class="play-control">

			</div>
		</div>
	</div>
</template>


<script>

	import { mapState, mapActions } from 'vuex'
	import debounce from 'debounce'

	export default {
		data () {
			return {
				form: {},
				url: '',
				videoURL: '',
			}
		},
		computed: {
			...mapState('video', [ 'video' ]),
		},
		mounted () {
			// this.form = Object.assign({}, this.video.medias);
		},
		methods: {
			playVideo (url) {
				this.videoURL = url;
				this.$nextTick(() => {
					this.$refs.H5video.play();
				});
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
