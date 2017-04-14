<template>
	<div class="view">
		<div class="switch">
			<p>授权观看</p>
		</div>
		<div class="body">
			<p class="tips">授权观看需要什么什么什么什么大文件第五批几大块为契机哦</p>
			<div class="action">
				<div class="form">
					<RadioGroup @on-change="onChange" v-model="form.authWatchStatus">
						<Radio :label="1">
							<span>无限制</span>
						</Radio>
						<Radio :label="2">
							<span>关注观看</span>
						</Radio>
						<Radio :label="3">
							<span>验证码观看</span>
						</Radio>
						<Radio :label="4" disabled>
							<span>付费观看</span>
						</Radio>
					</RadioGroup>
					<div class="setting">
						<template v-if="form.authWatchStatus == 3">
							<iForm label-position="left" ref="form" :model="form" :label-width="100">
								<FormItem label="提示文字：">
									<iInput @on-change="onDebounce" v-model="form.authCodeHints" placeholder="不超过10个字符"></iInput>
								</FormItem>
								<FormItem label="验证码：">
									<iInput @on-change="onDebounce" v-model="form.authCode" placeholder="六位验证码"></iInput>
								</FormItem>
							</iForm>
						</template>
						<template v-if="form.authWatchStatus == 4">
							<iForm label-position="left" ref="form" :model="form" :label-width="100">
								<FormItem label="提示文字：">
									<iInput @on-change="onDebounce" v-model="form.chargeHints" placeholder="不超过10个字符"></iInput>
								</FormItem>
								<FormItem label="观看价格：">
									<iInput @on-change="onDebounce" v-model="form.price" placeholder="请输入价格"></iInput>
								</FormItem>
							</iForm>
						</template>
					</div>
				</div>
				<div class="iPhone-bg">
					<div class="iPhone-view">
						<template v-if="form.authWatchStatus == 1">
							<h2 class="head">{{ video.name }}</h2>
							<div class="view">
								<img :src="video.liveGuide.guideImageUrl" height="100%" width="100%" alt="直播引导图">
							</div>
							<img class="bgImg" src="../../assets/images/live/liveguide.png"></img>
						</template>
						<template v-if="form.authWatchStatus == 2">
							<h2 class="head">{{ video.name }}</h2>
							<div class="view">
								<img :src="video.liveGuide.guideImageUrl" height="100%" width="100%" alt="直播引导图">
							</div>
							<img class="bgImg" src="../../assets/images/live/QRcode.png"></img>
						</template>
						<template v-if="form.authWatchStatus == 3">
							<h2 class="head">{{ video.name }}</h2>
							<p class="authCodeHints">{{ form.authCodeHints }}</p>
							<div class="view">
								<img :src="video.liveGuide.guideImageUrl" height="100%" width="100%" alt="直播引导图">
							</div>
							<img class="bgImg" src="../../assets/images/live/test.png"></img>
						</template>
						<template v-if="form.authWatchStatus == 4">
							付费观看
						</template>
					</div>
				</div>
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
			}
		},
		computed: {
			...mapState('video', ['video']),
		},
		mounted () {
			this.form = Object.assign({}, this.video.liveAuthWatch);
			this.form.price = this.form.price / 100;
		},
		methods: {
			...mapActions('video/detail', {
				setAuth: 'VIDEO_DETAIL_AUTH'
			}),
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.video.id;
				data.price = this.form.price * 100;
				this.setAuth(data);
			},
			onDebounce () {
				if(!this.debounce){
					this.debounce = debounce(this.onChange, 200)
				}
				this.debounce();
			}
		},
		filters: {
			price (price) {
				return price / 100;
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
