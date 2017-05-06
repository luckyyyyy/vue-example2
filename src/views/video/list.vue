<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-menu :default-active="status" @select="onStatusChange">
					<li class="title">
						回放列表
					</li>
					<el-menu-item index="finish">列表</el-menu-item>
					<el-menu-item index="trash">回收站</el-menu-item>
				</el-menu>
			</div>
		</div>
		<div ref="list" class="commoon-view">
			<!-- <Spin fix v-if="loading"></Spin> -->
			<el-row class="list" v-if="data.length">
				<el-col v-for="item in data" :key="item.id" class="item" :xs="12" :sm="12" :md="8" :lg="6">
					<div class="box">
						<div class="body">
							<img src="../../assets/test.png">
							<div class="status" :class="item.streamStatus">
								{{ item.streamStatus == 'publish' ? '推流中' : '未推流' }}
							</div>
							<div class="active">
								<template v-if="item.trashStatus">
									<em @click="onChangeStatus(item.id, `您确定要恢复直播【${item.name}】`)">恢复</em>
									<em @click="onChangeStatus(item.id, `您确定彻底要删除直播【${item.name}】<br>一旦删除，将彻底无法恢复。`, true)">彻底删除</em>
								</template>
								<template v-else>
									<em @click="onChangeStatus(item.id, `您确定要删除直播【${item.name}】`)">删除</em>
								</template>
							</div>
							<div class="title">
								<span>{{ item.name }}</span>
							</div>
						</div>
						<div class="buttom">
							<div class="time">视频存储大小：<span>未知</span></div>
							<div class="button">
								<template v-if="!item.trashStatus">
									<router-link :to="{ name: 'video_detail', params: { videoid: item.id } }">
										<i class="iconfont icon-paintfill"></i>
										<span>直播装修</span>
									</router-link>
								</template>
								<!-- <router-link :to="{ name: 'video_detail_image', params: { videoid: item.id } }">
									<i class="iconfont icon-wefill"></i>
									<span>互动设置</span>
								</router-link> -->

								<router-link :to="{ name: 'video_data', params: { videoid: item.id } }">
									<i class="iconfont icon-rankfill"></i>
									<span>直播数据</span>
								</router-link>

								<router-link :to="{ name: 'live_control', params: { liveid: item.id } }">
									<i class="iconfont icon-videoplay"></i>
									<span>播放</span>
								</router-link>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<div v-else class="tips" v-loading="loading">
				<template v-if="!data.length">没有数据啦QAQ</template>
			</div>
		</div>


	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import iscroll from 'iscroll'

	export default {
		data () {
			return {
				status: this.$route.params.status || 'finish',
				loading: false,
			}
		},
		computed: {
			...mapState('video', ['data', 'lock']),
		},
		mounted () {
			this.findVideoList(true);
		},
		methods: {
			...mapActions('video', {
				getVideoList: 'VIDEO_FIND_REQUEST',
				trashVideo: 'VIDEO_TRASH',
				deleteVideo: 'VIDEO_DELETE'
			}),
			onStatusChange (val) {
				this.status = val;
				this.findVideoList(true);
				this.$router.push({ name: this.$route.name, params: { status: this.status } })
			},
			async findVideoList (reload) {
				if (!this.lock || reload && !this.loading) {
					this.loading = true;
					await this.getVideoList({ reload, status: this.status }).then(() => {
						if (!this.listScroll) {
							this.listScroll = new iscroll(this.$refs.list, {
								mouseWheel: true,
								// preventDefault: false,
								scrollbars: true,
								fadeScrollbars: true,
								interactiveScrollbars: true,
								shrinkScrollbars: 'clip',
							})
							this.listScroll.on('scrollStart', () => {
								this.findVideoList();
							});
						}
						this.$nextTick(() => {
							if (reload) {
								this.listScroll.scrollTo(0, 0);
							}
							this.listScroll.refresh();
						})
					});
					this.loading = false;
				}
			},
			onChangeStatus(id, message, confirmDelete) {
				const api = confirmDelete ? this.deleteVideo : this.trashVideo;
				this.$confirm(message, '视频', {
					type: 'warning',
					beforeClose: async (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							await api({ id }).then(() => {
								this.findLiveList(true);
							});
							instance.confirmButtonLoading = false;
						}
						done();
					},
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../assets/styles/views/live/list";
</style>
