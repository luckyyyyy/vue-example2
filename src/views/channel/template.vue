<template>
	<div>
		<div class="template">
			<ra-card>
				<p slot="title">频道编辑</p>
				<!-- <div class="wrap">
					<div class="temp">
						<div class="temp__main">
							<div class="phone__title">
								<p>频道主页</p>
							</div>
							<div class="phone__head">
								{{ channel.title || '页面标题' }}
							</div>
							<div class="phone__body">
								<ul class="temp-list">
									<li class="temp-list__head">
										<img class="channel-bg" :src="channel.coverImageUrl" alt="频道封面">
										<div class="channel-main">
											<img class="channel-main__logo" :src="channel.logoImageUrl + '/avatar'" alt="频道logo">
											<p class="channel-main__name">{{ channel.name }}</p>
											<div class="channel-main__follow">
												关注
											</div>
										</div>
									</li>
									<li class="temp-list-item">
										<div class="item__head">
											<div class="line"></div>
											<p class="text">正在直播</p>
											<a class="link" href="javascript:;">更多></a>
										</div>
										<div class="item__body">
											<div class="topbar">
												<img :src="channel.logoImageUrl + '/avatar'">
												{{ channel.name }}
											</div>
											<div class="content">
												<img class="content__bg" :src="channel.coverImageUrl">
												<div class="content__musk"></div>
												<div class="content__musk"  :style="{ background: 'url(' + channel.coverImageUrl + ') no-repeat center' }"></div>
											</div>
										</div>
									</li>
									<li class="temp-list-item">
										<div class="item__head">
											<div class="line"></div>
											<p class="text">直播预告</p>
											<a class="link" href="javascript:;">更多></a>
										</div>
										<div class="item__body">
											<div class="topbar">
												<img :src="channel.coverImageUrl + '/avatar'">
												{{ channel.name }}
											</div>
											<div class="content">
												<img class="content__bg" :src="channel.coverImageUrl">
												<div class="content__musk"></div>
											</div>
										</div>
									</li>
									<li class="temp-list-item">
										<div class="item__head">
											<div class="line"></div>
											<p class="text">精彩回放</p>
											<a class="link" href="javascript:;">更多></a>
										</div>
										<div class="item__body">
											<div class="topbar">
												<img :src="channel.coverImageUrl + '/avatar'">
												{{ channel.name }}
											</div>
											<div class="content">
												<img class="content__bg" :src="channel.coverImageUrl">
												<div class="content__musk"></div>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="phone__foot">
								<img src="../../assets/images/bottombar@2x.png" width="100%" height="100%">
							</div>
						</div>
						<div class="temp__popwrap">
							<ul class="temp__pop">
								<li class="control-box">
									<div class="control-box__title">页面标题：</div>
									<el-input
										size="small"
										placeholder="请输入内容"
										@change="onDebounce"
										v-model="channel.title">
									</el-input>
								</li>
								<li class="control-box">
									<div class="control-box__title">页面描述：</div>
									<el-input
										class="textarea"
										type="textarea"
										:rows="2"
										:maxlength="20"
										@change="onDebounce"
										placeholder="用户通过微信分享时，会显示页面描述(20)"
										v-model="channel.description">
									</el-input>
								</li>
								<li class="control-box">
									<div class="control-box__title">频道名称：</div>
									<el-input
										size="small"
										placeholder="请输入内容"
										@change="onDebounce"
										v-model="channel.name">
									</el-input>
								</li>
								<li class="control-box">
									<div class="control-box__title">频道背景：</div>
									<a @click="openCoverAlbum" class="control-box__album" href="javascript:;">
										<img :src="channel.coverImageUrl">
									</a>
									<p class="control-box__tip">750 * 300像素</p>
								</li>
								<li class="control-box">
									<div class="control-box__title">频道LOGO：</div>
									<a @click="openLogoAlbum" class="control-box__album" href="javascript:;">
										<img :src="channel.logoImageUrl + '/avatar'">
									</a>
									<p class="control-box__tip">200 * 200像素</p>
								</li>
							</ul>
						</div>
					</div>
					<div class="temp">
						<div class="temp__popwrap">
							<ul class="temp__pop temp__pop--small">
								<li class="radio-box" >
									<el-radio v-model="labelSelect" :label="0">默认顺序</el-radio>
									<el-radio v-model="labelSelect" :label="1">自定义首位</el-radio>
								</li>
							</ul>
							<transition name="el-zoom-in-center">
								<ul class="temp__pop temp__pop--add" v-if="labelSelect == 1">
									<li>
										<a href="javascript:;" class="button"><i class="iconfont icon-btn-up"></i></a>
										<ul class="select-box">
											<li class="select-box-item">
												<img :src="channel.coverImageUrl" width="100%" height="100%">
												<div class="item__musk item__musk--active"></div>
											</li>
											<li class="select-box-item">
												<img :src="channel.coverImageUrl" width="100%" height="100%">
												<div class="item__musk"></div>
											</li>
											<li class="select-box-item">
												<img :src="channel.coverImageUrl" width="100%" height="100%">
												<div class="item__musk"></div>
											</li>
										</ul>
										<a href="javascript:;" class="button"><i class="iconfont icon-btn-down"></i></a>
									</li>
								</ul>
							</transition>
						</div>
					</div>
				</div> -->
				<div class="temp-wrap">
					<div class="temp-box">
						<div class="temp-box__head">
							<p class="title">{{ channel.title || '页面标题' }}</p>
							<div class="pop">
								<div class="pop-horizontal">
									<div class="pop-box">
										<p class="pop-box__title">页面标题：</p>
										<div class="pop-box__input">
											<el-input
											size="small"
											placeholder="请输入内容"
											@change="onDebounce"
											v-model="channel.title">
											</el-input>
										</div>
									</div>
									<div class="pop-box">
										<p class="pop-box__title">频道名称：</p>
										<div class="pop-box__input">
											<el-input
											size="small"
											placeholder="请输入内容"
											@change="onDebounce"
											v-model="channel.name">
											</el-input>
										</div>
									</div>
								</div>
								<div class="pop-horizontal">
									<div class="pop-box">
										<p class="pop-box__title">频道背景：</p>
										<div class="pop-box__input">
											<a @click="openCoverAlbum" class="button" href="javascript:;" :style="{ backgroundImage: `url(${ channel.coverImageUrl })` }">
											</a>
											<p class="tip">750 * 300像素</p>
										</div>
									</div>
									<div class="pop-box">
										<p class="pop-box__title">频道LOGO：</p>
										<div class="pop-box__input">
											<a @click="openLogoAlbum" class="button" href="javascript:;" :style="{ backgroundImage: `url(${channel.logoImageUrl}/avatar)` }">
											</a>
											<p class="tip">200 * 200像素</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="temp-box__body">
							<div class="banner" :style="{ backgroundImage: `url(${ channel.coverImageUrl })` }">
								<div class="banner-content">
									<img :src="channel.logoImageUrl + '/avatar'" alt="头像" class="banner-content__avatar">
									<p class="banner-content__title">{{ channel.name }}</p>
									<div class="banner-content__button">关注</div>
								</div>
							</div>
							<ul class="temp-list">
								<li class="temp-item" v-if="topBeing">
									<div class="temp-item__head">
										<span class="line"></span>
										<p class="title">正在直播</p>
										<p class="link">更多 ></p>
									</div>
									<div class="temp-item__card">
										<div class="head">
											<img class="head__avatar" :src="`${topBeing.liveInfo.avatarImageUrl}/avatar`">
											<div class="head__txt">
												<p class="nick-name">{{ topBeing.liveInfo.nickName }}</p>
												<p class="name">{{ topBeing.liveInfo.name }}</p>
											</div>
										</div>
										<div class="body" :style="{ backgroundImage: `url(${ topBeing.liveInfo.coverImageUrl })` }"></div>
									</div>
								</li>
							</ul>
						</div>
						<div class="temp-box__foot"></div>
					</div>
				</div>
			</ra-card>
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
				text: '',
				labelSelect: 0,
			}
		},
		computed: {
			...mapState('channel', {
				info: state => state.channel
			}),
			...mapState('live', ['data', 'lock']),
			...mapState('template', ['topInfo']),
			topBeing () {
				return this.topInfo.being
			},
			topAbout () {
				return this.topInfo.aboutTo
			},
			topAbout () {
				return this.topInfo.video
			},
		},
		created () {
			this.channel = Object.assign({}, this.info);
			this.getTopLiveInfo();
		},
		methods: {
			...mapActions('channel', {
				updateChannel: 'CHANNEL_UPDATE'
			}),
			...mapActions('live', {
				getLiveList: 'LIVE_FIND_REQUEST'
			}),
			...mapActions('template', {
				getTopLiveInfo: 'TEMPLATE_QUERY'
			}),
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
			},
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/channel/template.less";
</style>
<style lang="less">
.textarea {
	textarea {
		height: 54px;
		max-height: 54px;
	}
}
</style>
