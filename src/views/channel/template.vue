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
											<a @click="openAlbum('1', 'coverImage')" class="button" href="javascript:;" :style="{ backgroundImage: `url(${ channel.coverImageUrl })` }">
											</a>
											<p class="tip">750 * 300像素</p>
										</div>
									</div>
									<div class="pop-box">
										<p class="pop-box__title">频道LOGO：</p>
										<div class="pop-box__input">
											<a @click="openAlbum('5', 'logoImage')" class="button" href="javascript:;" :style="{ backgroundImage: `url(${channel.logoImageUrl}/avatar)` }">
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
								<li class="temp-item">
									<div class="temp-item__head">
										<span class="line"></span>
										<p class="title">正在直播</p>
										<p class="link">更多 ></p>
									</div>
									<div class="temp-item__body" v-if="topInfo.being">
										<div class="temp-card">
											<div class="temp-card__head">
												<img class="head__avatar" :src="`${topInfo.being.liveInfo.avatarImageUrl}/avatar`">
												<div class="head__txt">
													<p class="nick-name">{{ topInfo.being.liveInfo.nickName }}</p>
													<p class="name">{{ topInfo.being.liveInfo.name }}</p>
												</div>
											</div>
											<div class="temp-card__body" :style="{ backgroundImage: `url(${ topInfo.being.liveInfo.coverImageUrl })` }"></div>
										</div>
										<!-- 修改控件 -->
										<select-box
										 :orderBy="topInfo.beingOrderBy"
										 :data="beingData"
										 :totalPage="beingTotalPage"
										 :loading="beingLoading"
										 :reset="beingReset"
										 v-on:pageChange="beingPage"
										 v-on:radioChange="beingRadio"
										 v-on:onSelect="beingSelect">
										 </select-box>
									</div>
									<h3 class="temp-item__foot" v-else>暂时没有任何内容</h3>
								</li>
								<!-- 直播预告 -->
								<li class="temp-item">
									<div class="temp-item__head">
										<span class="line"></span>
										<p class="title">直播预告</p>
										<p class="link">更多 ></p>
									</div>
									<div class="temp-item__body" v-if="topInfo.aboutTo">
										<div class="temp-card">
											<div class="temp-card__head">
												<img class="head__avatar" :src="`${topInfo.aboutTo.liveInfo.avatarImageUrl}/avatar`">
												<div class="head__txt">
													<p class="nick-name">{{ topInfo.aboutTo.liveInfo.nickName }}</p>
													<p class="name">{{ topInfo.aboutTo.liveInfo.name }}</p>
												</div>
											</div>
											<div class="temp-card__body" :style="{ backgroundImage: `url(${ topInfo.aboutTo.liveInfo.coverImageUrl })` }"></div>
										</div>
										<!-- 修改控件 -->
										<select-box
										 :orderBy="topInfo.aboutToOrderBy"
										 :data="aboutData"
										 :totalPage="aboutTotalPage"
										 :loading="aboutLoading"
										 :reset="aboutReset"
										 v-on:pageChange="aboutPage"
										 v-on:radioChange="aboutRadio"
										 v-on:onSelect="aboutSelect">
										 </select-box>
									</div>
									<h3 class="temp-item__foot" v-else>暂时没有任何内容</h3>
								</li>
								<!-- 精彩回放 -->
								<li class="temp-item">
									<div class="temp-item__head">
										<span class="line"></span>
										<p class="title">精彩回放</p>
										<p class="link">更多 ></p>
									</div>
										<div class="temp-item__body" v-if="topInfo.video">
											<div class="temp-card">
												<div class="temp-card__head">
													<img class="head__avatar" :src="`${topInfo.video.liveInfo.avatarImageUrl}/avatar`">
													<div class="head__txt">
														<p class="nick-name">{{ topInfo.video.liveInfo.nickName }}</p>
														<p class="name">{{ topInfo.video.liveInfo.name }}</p>
													</div>
												</div>
												<div class="temp-card__body" :style="{ backgroundImage: `url(${ topInfo.video.liveInfo.coverImageUrl })` }"></div>
											</div>
											<!-- 修改控件 -->
											<select-box
											 :orderBy="topInfo.videoOrderBy"
											 :data="finishedData"
											 :totalPage="finishedTotalPage"
											 :loading="finishedLoading"
											 :reset="finishedReset"
											 v-on:pageChange="finishedPage"
											 v-on:radioChange="finishedRadio"
											 v-on:onSelect="finishedSelect">
										 	</select-box>
										</div>
										<h3 class="temp-item__foot" v-else>暂时没有任何内容</h3>
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
	import selectBox from '@/components/template/selectBox'

	export default{
		components: {
			'select-box': selectBox,
		},
		data () {
			return {
				channel: {},
				status: this.$route.params.status || 'public',
				finishedLoading: false,
				beingLoading: false,
				aboutLoading: false,
				finishedReset: false,
				beingReset: false,
				aboutReset: false,
			}
		},
		computed: {
			...mapState('channel', {
				info: state => state.channel
			}),
			...mapState('live', ['data', 'lock']),
			...mapState('template', [
				'topInfo',
				'finishedData', 'finishedTotalPage',
				'beingData', 'beingTotalPage',
				'aboutData', 'aboutTotalPage'
			]),
		},
		created () {
			this.channel = Object.assign({}, this.info);
			this.init();
		},
		methods: {
			...mapActions('channel', {
				updateChannel: 'CHANNEL_UPDATE'
			}),
			...mapActions('live', {
				getLiveList: 'LIVE_FIND_REQUEST'
			}),
			...mapActions('template', {
				getTopInfo: 		'TEMPLATE_QUERY',
				sortBeing:      'TEMPLATE_SORT_BEING',
				sortFinished:   'TEMPLATE_SORT_FINISHED',
				sortAbout:      'TEMPLATE_SORT_ABOUT',
				findBeing: 			'TEMPLATE_FIND_BEING',
				findFinished:   'TEMPLATE_FIND_FINISHED',
				findAbout:   		'TEMPLATE_FIND_ABOUT',
				firstFinished: 	'TEMPLATE_FIRST_FINISHED',
				firstBeing: 		'TEMPLATE_FIRST_BEING',
				firstAbout: 		'TEMPLATE_FIRST_ABOUT',
			}),
			init () {
				this.getTopInfo()
			},
			openAlbum (value, type) {
				Album(value, (select, data) => {
					if (type == 'coverImage') {
						this.channel.coverImageId  = select;
						this.channel.coverImageUrl = data.url;
					} else if (type == 'logoImage') {
						this.channel.logoImageId   = select;
						this.channel.logoImageUrl  = data.url;
					}
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
			finishedPage (page) {
				this.loading = true
				this.findFinished(page).then(_ => {
					this.loading = false
				}).catch(_ => {
					this.loading = false
				})
			},
			finishedRadio (value) {
				this.sortFinished(value)
				if (value == 'user-defined') {
					this.loading = true
					this.findFinished().then(_ => {
						this.loading = false
					}).catch(_ => {
						this.loading = false
					})
				}
			},
			finishedSelect (id) {
				this.$confirm('提示什么什么什么什么的内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					this.firstFinished(id).then(_ => {
						this.loading = true
						this.getTopInfo()
						this.findFinished().then(_ => {
							this.finishedReset = !this.finishedReset // 触发select组件重置
							this.loading       = false
						}).catch(_ => {
							this.loading = false
						})
						this.$message({
	            type: 'success',
	            message: '置顶成功!'
	          });
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置顶'
          });
        });
			},
			aboutPage (page) {
				this.loading = true
				this.findAbout(page).then(_ => {
					this.loading = false
				}).catch(_ => {
					this.loading = false
				})
			},
			aboutRadio (value) {
				this.sortAbout(value)
				if (value == 'user-defined') {
					this.loading = true
					this.findAbout().then(_ => {
						this.loading = false
					}).catch(_ => {
						this.loading = false
					})
				}
			},
			aboutSelect (id) {
				this.$confirm('提示什么什么什么什么的内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					this.firstAbout(id).then(_ => {
						this.loading = true
						this.getTopInfo()
						this.findAbout().then(_ => {
							this.aboutReset = !this.aboutReset // 触发select组件重置
							this.loading       = false
						}).catch(_ => {
							this.loading = false
						})
						this.$message({
	            type: 'success',
	            message: '置顶成功!'
	          });
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置顶'
          });
        });
			},
			beingPage (page) {
				this.loading = true
				this.findBeing(page).then(_ => {
					this.loading = false
				}).catch(_ => {
					this.loading = false
				})
			},
			beingRadio (value) {
				this.sortBeing(value)
				if (value == 'user-defined') {
					this.loading = true
					this.findBeing().then(_ => {
						this.loading = false
					}).catch(_ => {
						this.loading = false
					})
				}
			},
			beingSelect (id) {
				this.$confirm('提示什么什么什么什么的内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
					this.firstBeing(id).then(_ => {
						this.loading = true
						this.getTopInfo()
						this.findBeing().then(_ => {
							this.beingReset = !this.beingReset // 触发select组件重置
							this.loading       = false
						}).catch(_ => {
							this.loading = false
						})
						this.$message({
	            type: 'success',
	            message: '置顶成功!'
	          });
					})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置顶'
          });
        });
			}
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
