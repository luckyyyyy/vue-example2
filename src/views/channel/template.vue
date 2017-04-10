<template>
	<div>
		<div class="edit">
			<Card class="commoon-card" :bordered="false" dis-hover>
					<p slot="title" class="commoon-card__title">频道编辑</p>
					<div class="template-box">
						<!-- 顶部 -->
						<div class="header">
							{{ channel.wxAppName }}
						</div>
						<!-- 频道设置	 -->
						<div class="content">
							<div class="content-bg">
								<img src="../../assets/images/live/live.png" width="100%" height="100%">
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
							<Input @on-change="onDebounce" v-model="channel.name" placeholder="请输入..." style="width: 170px;"></Input>
						</div>
						<div class="input-box">
							<span class="label">频道背景：</span>
							<Album @submit="onSelectLogo" v-model="openLogoAlbum" :type="5">
									<img @click="openLogoAlbum = true" :src="channel.logoImageUrl + '/avatar'" class="img">
									<span class="tips">750 * 300像素</span>
							</Album>
						</div>
						<div class="input-box">
							<span class="label">频道LOGO：</span>
							<Album @submit="onSelectLogo" v-model="openLogoAlbum" :type="5">
									<img @click="openLogoAlbum = true" :src="channel.logoImageUrl + '/avatar'" class="img">
									<span class="tips">200 * 200像素</span>
							</Album>
						</div>
					</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Album from '../../components/item/album'
	import debounce from 'debounce'
	export default{
		components: {
			Album,
		},
		data () {
			return {
				openLogoAlbum: false,
				lock: false,
				channel: {},
			}
		},
		computed: {
			...mapState('channel', {
				info: state => state.channel
			})
		},
		mounted () {
			this.channel = Object.assign({}, this.info);
		},
		methods: {
			...mapActions('channel', {
				updateChannel: 'CHANNEL_UPDATE'
			}),
			onSelectLogo (select, data) {
				this.channel.logoImageId  = select;;
				this.channel.logoImageUrl = data.url;
				this.updateChannel(this.channel);
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
	@import "../../assets/styles/views/channel/edit.less";
</style>
