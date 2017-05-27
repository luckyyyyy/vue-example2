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
				<el-col v-for="(item, index) in video.medias" :key="item.coverURL" class="video-list-box" :xs="12" :sm="12" :md="8" :lg="6">
					<div class="video-list__cover">
						<img :src="item.coverURL" alt="videoCover">
						<p class="video-list__detail">
							<span class="video-list__name">
								{{ video.liveInfo.name }}
							</span>
							<span class="video-list__time">
								{{ item.hdPlay.duration | secondsFormat }}
							</span>
						</p>
						<div class="video-list__musk" @click="playVideo(item.hdPlay.file)">
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
							<a class="video-list__delete" @click="confirmDelete(item)">
								<i class="iconfont icon-video-delete"></i>
							</a>
						</div>
					</div>
				</el-col>
				<h1 v-if="video.medias.length == 0">已经没有视频啦</h1>
			</template>
			<template v-else>
				<h1>正在转码中...</h1>
			</template>
		</el-row>
		<el-dialog
			title="视频"
			class="dialog--common"
			:visible.sync="isOpen"
			@close="modalClose"
			:close-on-click-modal="false">
			<div class="video-player">
				<ra-player ref="$player">
					您的浏览器不支持 video 标签。
				</ra-player>
			</div>
		</el-dialog>

	</div>
</template>


<script>

	import { mapState, mapActions } from 'vuex'
	import debounce from 'debounce'
	import { secondsFormat } from '@/filter'
	import raPlayer from '@/components/item/player'

	export default {
		components: {
			raPlayer
		},
		data () {
			return {
				form: {},
				isOpen: false,
			}
		},
		computed: {
			...mapState('video', [ 'video' ]),
		},
		methods: {
			...mapActions('video', {
				deleteMedia: 'VIDEO_MEDIA_DELETE'
			}),
			playVideo (url) {
				this.isOpen = true;
				this.$nextTick(() => {
					this.$refs.$player.play(url);
				});
			},
			modalClose () {
				this.$refs.$player.pause();
			},
			confirmDelete (params) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'info'
				}).then(() => {
					this.deleteMedia(params).then(() =>{
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}).catch(() => {

					})	
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			}
		},
		filters: {
			secondsFormat,
		}
	}
</script>

<style scoped lang="less">
	@import url(../../assets/styles/views/live/detail.less);
</style>
