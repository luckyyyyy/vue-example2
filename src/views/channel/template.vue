<template>
	<div>
		<div class="template">
			<Icard>
				<p slot="title">频道编辑</p>
				<div class="card-body">
					<div class="template-box">
						<!-- 顶部 -->
						<div class="header">
							{{ channel.wxAppName }}
						</div>
						<!-- 频道设置	 -->
						<div class="content">
							<div class="content-bg">
								<img :src="channel.coverImageUrl" width="100%" height="100%">
							</div>
							<div class="content-bottom">
								<img class="content-logo" :src="channel.logoImageUrl + '/avatar'" alt="频道logo">
								<div class="content-main">
									<p>{{ channel.name }}</p>
								</div>
							</div>
						</div>
						<!-- 直播封面 -->
						<div class="live-wrap">
							<h2 class="live-head">－ 正在直播 －</h2>
							<div class="live-body">
								<div class="live-title">
									<img class="avatar" src="../../assets/images/live/live.png" height="36" width="36" alt="头像">
									直播昵称
								</div>
								<div class="live-main">
									<div class="info">
										<p>直播中</p>
										<span>3232人 在看</span>
									</div>
								</div>
							</div>
						</div>
						<div class="live-wrap">
							<h2 class="live-head">－ 直播预告 －</h2>
							<div class="live-body">
								<div class="live-title">
									<img class="avatar" src="../../assets/images/live/live.png" height="36" width="36" alt="头像">
									直播昵称
								</div>
								<div class="live-main">
									<div class="info">
										<p>直播中</p>
										<span>3232人 在看</span>
									</div>
								</div>
							</div>
						</div>
						<!-- 精彩回放 -->
						<div class="live-wrap">
							<h2 class="live-head">－ 精彩回放 －</h2>
							<div class="live-body">
								<div class="live-title">
									<img class="avatar" src="../../assets/images/live/live.png" height="36" width="36" alt="头像">
									直播昵称
								</div>
								<div class="live-main">
									<div class="info">
										<p>直播中</p>
										<span>3232人 在看</span>
									</div>
								</div>
							</div>
							<div class="small-wrap">
								<div class="live-body-small">
									<div class="live-title">
										<img class="avatar" src="../../assets/images/live/live.png" height="36" width="36" alt="头像">
										<div class="live-info">
											<p>直播昵称</p>
											<span class="">3232人 在看</span>
										</div>
									</div>
									<div class="live-main">
										TODO  bg
									</div>
								</div>
								<div class="live-body-small">
									<div class="live-title">
										<img class="avatar" src="../../assets/images/live/live.png" height="36" width="36" alt="头像">
										<div class="live-info">
											<p>直播昵称</p>
											<span class="">3232人 在看</span>
										</div>
									</div>
									<div class="live-main">
										TODO  bg
									</div>
								</div>
							</div>
						</div>
						<!-- 底部 -->
						<div class="footer"></div>
					</div>
					<!-- 气泡框 设置 -->
					<div class="pop-box">
						<div class="input-box">
							<span class="label">频道名称：</span>
							<el-input @change="onDebounce" v-model="channel.name" placeholder="请输入..." style="width: 170px;"></el-input>
						</div>
						<div class="input-box">
							<span class="label">频道背景：</span>
							<div @click="openCoverAlbum" class="icon"><i class="iconfont icon-upload"></i></div>
							<span class="tips">750 * 300像素</span>
						</div>
						<div class="input-box">
							<span class="label">频道LOGO：</span>
							<div @click="openLogoAlbum" class="icon"><i class="iconfont icon-upload"></i></div>
							<span class="tips">200 * 200像素</span>
						</div>
					</div>
				</div>
			</Icard>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import debounce from 'debounce'
	import Album from '@/components/item/album'

	export default{
		data () {
			return {
				channel: {},
				status: this.$route.params.status || 'public',
				loading: false,
			}
		},
		computed: {
			...mapState('channel', {
				info: state => state.channel
			}),
			...mapState('live', ['data', 'lock']),
		},
		mounted () {
			this.channel = Object.assign({}, this.info);
			this.findLiveList(true);
		},
		methods: {
			...mapActions('channel', {
				updateChannel: 'CHANNEL_UPDATE'
			}),
			...mapActions('live', {
				getLiveList: 'LIVE_FIND_REQUEST'
			}),
			findLiveList (reload) {
				if(!this.lock || reload && !this.loading){
					this.loading = true;
					this.getLiveList({ reload, status: this.status }).then(() => {
						this.loading = false;
						if(!this.lock){
							// 这里不能用滚动触发 分页请求，所以先一次性全加载完，不做滚动加载了
							this.findLiveList();
						}
					}).catch(() => {
						this.loading = false;
					})
				}
			},
			openCoverAlbum () {
				Album('1', (select, data) => {
					this.channel.coverImageId = select;
					this.channel.coverImageUrl = data.url;
					this.updateChannel(this.channel);
				})
			},
			openLogoAlbum () {
				Album('5', (select, data) => {
					this.channel.logoImageId = select;
					this.channel.logoImageUrl = data.url;
					this.updateChannel(this.channel);
				})
			},
			onChange () {
				this.updateChannel(this.channel);
			},
			onDebounce () {
				if (!this.debounce) {
					this.debounce = debounce(this.onChange, 200);
				}
				this.debounce();
			}
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/channel/template.less";
</style>
