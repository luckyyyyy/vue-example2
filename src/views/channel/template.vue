<template>
	<div>
		<div class="template">
			<ra-card>
				<p slot="title">频道编辑</p>
				<div class="temp-wrap">
					<div class="temp-box">
						<div class="temp-box__head">
							<p class="title">{{ channel.title || '页面标题' }}</p>
							<!-- 修改控件 -->
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
								<!-- 正在直播 -->
								<li class="temp-item" v-if="topBeing">
									<div class="temp-item__head">
										<span class="line"></span>
										<p class="title">正在直播</p>
										<p class="link">更多 ></p>
									</div>
									<div class="temp-item__body">
										<div class="temp-card">
											<div class="temp-card__head">
												<img class="head__avatar" :src="`${topBeing.liveInfo.avatarImageUrl}/avatar`">
												<div class="head__txt">
													<p class="nick-name">{{ topBeing.liveInfo.nickName }}</p>
													<p class="name">{{ topBeing.liveInfo.name }}</p>
												</div>
											</div>
											<div class="temp-card__body" :style="{ backgroundImage: `url(${ topBeing.liveInfo.coverImageUrl })` }"></div>
										</div>
										<!-- 修改控件 -->
										<div class="pop"><!-- 这里有个坑，刚打开页面，如何获取是用户自定义还是默认设置 -->
											<el-radio-group @change="beingOnChange" class='radio-group' v-model="beingRadio">
												<div class="pop-box">
													<div class="pop-box__radio">
														<el-radio class="radio" label="default">默认顺序</el-radio>
														<p class="tip">直播开始时间排序</p>
													</div>
												</div>
												<div class="pop-box">
													<div class="pop-box__radio">
														<el-radio class="radio" label="user-defined">自定义首位</el-radio>
														<p class="tip">自定义选中排为首位</p>
													</div>
												</div>
											</el-radio-group>
										</div>
										<transition name="el-fade-in-linear">
											<div class="pop pop--select" v-if="beingRadio == 'user-defined'">
												<div class="pop__button">
													<span class="prev"></span>
												</div>
												<ul class="live-list">
													<li class="live-item live-item--active"></li>
													<li class="live-item"></li>
													<li class="live-item"></li>
												</ul>
												<div class="pop__button">
													<span class="next"></span>
												</div>
											</div>
										</transition>
									</div>
								</li>
								<!-- 直播预告 -->
								<li class="temp-item" v-if="topAbout">
									<div class="temp-item__head">
										<span class="line"></span>
										<p class="title">直播预告</p>
										<p class="link">更多 ></p>
									</div>
									<div class="temp-item__body">
										<div class="temp-card">
											<div class="temp-card__head">
												<img class="head__avatar" :src="`${topAbout.liveInfo.avatarImageUrl}/avatar`">
												<div class="head__txt">
													<p class="nick-name">{{ topAbout.liveInfo.nickName }}</p>
													<p class="name">{{ topAbout.liveInfo.name }}</p>
												</div>
											</div>
											<div class="temp-card__body" :style="{ backgroundImage: `url(${ topAbout.liveInfo.coverImageUrl })` }"></div>
										</div>
										<!-- 修改控件 -->
										<div class="pop">
											<el-radio-group @change="beingOnChange" class='radio-group' v-model="aboutRadio">
												<div class="pop-box">
													<div class="pop-box__radio">
														<el-radio class="radio" label="default">默认顺序</el-radio>
														<p class="tip">直播开始时间排序</p>
													</div>
												</div>
												<div class="pop-box">
													<div class="pop-box__radio">
														<el-radio class="radio" label="user-defined">自定义首位</el-radio>
														<p class="tip">自定义选中排为首位</p>
													</div>
												</div>
											</el-radio-group>
										</div>
										<transition name="el-fade-in-linear">
											<div class="pop pop--select" v-if="aboutRadio == 'user-defined'">
												<div class="pop__button">
													<span class="prev"></span>
												</div>
												<ul class="live-list">
													<li class="live-item live-item--active"></li>
													<li class="live-item"></li>
													<li class="live-item"></li>
												</ul>
												<div class="pop__button">
													<span class="next"></span>
												</div>
											</div>
										</transition>
									</div>
								</li>
								<!-- 精彩回放 -->
								<li class="temp-item" v-if="topFinished">
									<div class="temp-item__head">
										<span class="line"></span>
										<p class="title">精彩回放</p>
										<p class="link">更多 ></p>
									</div>
									<div class="temp-item__body">
										<div class="temp-card">
											<div class="temp-card__head">
												<img class="head__avatar" :src="`${topFinished.liveInfo.avatarImageUrl}/avatar`">
												<div class="head__txt">
													<p class="nick-name">{{ topFinished.liveInfo.nickName }}</p>
													<p class="name">{{ topFinished.liveInfo.name }}</p>
												</div>
											</div>
											<div class="temp-card__body" :style="{ backgroundImage: `url(${ topFinished.liveInfo.coverImageUrl })` }"></div>
										</div>
										<!-- 修改控件 -->
										<div class="pop">
											<el-radio-group @change="finishedOnChange" class='radio-group' v-model="finishedRadio">
												<div class="pop-box">
													<div class="pop-box__radio">
														<el-radio class="radio" label="default">默认顺序</el-radio>
														<p class="tip">直播开始时间排序</p>
													</div>
												</div>
												<div class="pop-box">
													<div class="pop-box__radio">
														<el-radio class="radio" label="user-defined">自定义首位</el-radio>
														<p class="tip">自定义选中排为首位</p>
													</div>
												</div>
											</el-radio-group>
										</div>
										<transition name="el-fade-in-linear">
											<div class="pop pop--select" v-if="finishedRadio == 'user-defined'">
												<div class="pop__button">
													<span class="prev"></span>
												</div>
												<ul class="live-list">
													<li class="live-item live-item--active"></li>
													<li class="live-item"></li>
													<li class="live-item"></li>
												</ul>
												<div class="pop__button">
													<span class="next"></span>
												</div>
											</div>
										</transition>
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
				beingRadio: 'default',
				finishedRadio: 'default',
				aboutRadio: 'default',
				radio: '1',
			}
		},
		computed: {
			...mapState('channel', {
				info: state => state.channel
			}),
			...mapState('live', ['data', 'lock']),
			...mapState('template', ['topInfo', 'finishedInfo']),
			topBeing () {
				return this.topInfo.being
			},
			topAbout () {
				return this.topInfo.aboutTo
			},
			topFinished () {
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
				getTopLiveInfo: 'TEMPLATE_QUERY',
				sortBeing:      'TEMPLATE_SORT_BEING',
				sortFinished:   'TEMPLATE_SORT_FINISHED',
				findBeing: 			'TEMPLATE_FIND_BEING',
				findFinished:   'TEMPLATE_FIND_FINISHED'
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
			beingOnChange (value) {
				this.sortBeing(value).then(() => {

				}).catch(() => {

				})
			},
			finishedOnChange (value) {
				this.sortFinished(value).then(() => {
					if (value == 'user-defined') {
						this.findFinished()
					}
				}).catch(() => {

				})
			},
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/channel/template.less";
</style>
<style lang="less">
.el-radio__label {
	padding-left: 10px;
}
</style>
