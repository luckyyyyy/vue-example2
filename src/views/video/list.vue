<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<Menu :activeName="status" @on-select="onStatusChange" width="135px">
					<li class="title">
						直播列表
					</li>
					<MenuItem name="finish">列表</MenuItem>
					<MenuItem name="trash">回收站</MenuItem>
				</Menu>
			</div>
		</div>
		<div ref="list" class="commoon-view">
			<!-- <Spin fix v-if="loading"></Spin> -->
			<Row class="list" v-show="data.length">
				<Col v-for="item in data" :key="item.id" className="item" :xs="12" :sm="12" :md="8" :lg="6">
					<div class="box">
						<div class="body">
							<div class="top">
								<div class="status">
									<em :class="item.streamStatus">
										{{ item.streamStatus == 'publish' ? '推流中' : '未推流' }}
									</em>
								</div>
								<!-- <div class="active">
									<template v-if="item.trashStatus">
										<em @click="onChangeStatus(item.id, `您确定要恢复直播【${item.name}】`)">恢复</em>
										<em @click="onChangeStatus(item.id, `您确定彻底要删除直播【${item.name}】<br>一旦删除，将彻底无法恢复。`, true)">彻底删除</em>
									</template>
									<template v-else>
										<template v-if="!item.publicStatus">
											<em @click="onChangePublic(item.id, `您确定要发布直播【${item.name}】<br>发布后在微信端公开展示给用户。`)">发布</em>
										</template>
										<template v-else>
											<em @click="onChangePublic(item.id, `您确定要撤回直播【${item.name}】<br>撤回后微信端用户无法查看直播。`)">撤回</em>
										</template>
										<em @click="onChangeStatus(item.id, `您确定要删除直播【${item.name}】`)">删除</em>
									</template>
								</div> -->
							</div>
							<div class="title">
								<span>{{ item.name }}</span>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<div class="button">
								<router-link :to="{ name: 'video_detail', params: { videoid: item.id } }">
									<i class="iconfont icon-paintfill"></i>
									<span>直播装修</span>
								</router-link>

								<router-link :to="{ name: 'live_detail_image', params: { liveid: item.id } }">
									<i class="iconfont icon-wefill"></i>
									<span>互动设置</span>
								</router-link>

								<router-link :to="{ name: 'video_data', params: { videoid: item.id } }">
									<i class="iconfont icon-rankfill"></i>
									<span>直播数据</span>
								</router-link>

								<router-link :to="{ name: 'live_control', params: { liveid: item.id } }">
									<i class="iconfont icon-k"></i>
									<span>中控台</span>
								</router-link>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<div v-show="!loading && !data.length" class="tips">
				没有数据啦QAQ
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
			...mapState('video/find', ['data', 'lock']),
		},
		mounted () {
			this.findVideoList(true);
		},
		methods: {
			...mapActions('video/find', {
				getVideoList: 'VIDEO_FIND_REQUEST'
			}),
			// ...mapActions('live/create', {
			// 	createLive: 'LIVE_CREATE_REQUEST'
			// }),
			// ...mapActions('live/trash', {
			// 	trashLive: 'LIVE_TRASH_REQUEST'
			// }),
			// ...mapActions('live/delete', {
			// 	deleteLive: 'LIVE_DELETE_REQUEST'
			// }),
			// ...mapActions('live/public', {
			// 	livePublic: 'LIVE_PUBLIC_REQUEST'
			// }),
			onStatusChange (val) {
				this.status = val;
				this.findVideoList(true);
				this.$router.push({ name: this.$route.name, params: { status: this.status } })
			},
			findVideoList (reload) {
				if (!this.lock || reload && !this.loading) {
					const msg = this.$Message.loading('正在加载中...', 0);
					this.loading = true;
					this.getVideoList({ reload, status: this.status }).then(() => {
						this.loading = false;
						msg();
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
					}).catch(() => {
						this.loading = false;
						msg();
					});
				}
			},


		}
	}
</script>

<style lang="less" scoped>
	@import "../../assets/styles/views/live/list";
</style>
