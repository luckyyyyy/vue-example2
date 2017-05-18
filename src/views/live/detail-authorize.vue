<template>
	<div class="view">
		<div class="switch">
			<p>授权观看</p>
		</div>
		<div class="body">
			<p class="tips">授权观看需要什么什么什么什么大文件第五批几大块为契机哦</p>
			<div class="action">
				<div class="form">
					<el-radio-group @change="onChange" v-model="form.authWatchStatus">
						<el-radio :label="1">
							<span>无限制</span>
						</el-radio>
						<el-radio :label="2">
							<span>关注观看</span>
						</el-radio>
						<el-radio :label="3">
							<span>验证码观看</span>
						</el-radio>
						<el-radio :label="4" disabled>
							<span>付费观看</span>
						</el-radio>
					</el-radio-group>
					<div class="setting">
						<template v-if="form.authWatchStatus == 3">
							<el-form label-position="left" ref="form" :model="form" label-width="100px">
								<el-form-item label="提示文字：">
									<el-input @change="onDebounce" v-model="form.authCodeHints" placeholder="不超过10个字符"></el-input>
								</el-form-item>
								<el-form-item label="验证码：">
									<el-input @change="onDebounce" v-model="form.authCode" :maxlength="6" placeholder="六位验证码"></el-input>
								</el-form-item>
							</el-form>
						</template>
						<template v-if="form.authWatchStatus == 4">
							<el-form label-position="left" ref="form" :model="form" :label-width="100">
								<el-form-item label="提示文字：">
									<el-input @change="onDebounce" v-model="form.chargeHints" placeholder="不超过10个字符"></el-input>
								</el-form-item>
								<el-form-item label="观看价格：">
									<el-input @change="onDebounce" v-model="form.price" placeholder="请输入价格"></el-input>
								</el-form-item>
							</el-form>
						</template>
					</div>
				</div>
				<div class="preview">
					<div class="preview-box">
						<h2 class="preview__head">{{ live.name }}</h2>
						<template v-if="form.authWatchStatus == 1">
							<div class="preview__view">
								<img class="guide" :src="live.liveGuide.guideImageUrl" alt="直播引导图">
							</div>
							<img class="preview__background" src="../../assets/images/live/liveguide.png">
						</template>
						<template v-if="form.authWatchStatus == 2">
							<div class="preview__view">
								<img class="guide" :src="live.liveGuide.guideImageUrl" alt="直播引导图">
							</div>
							<img class="preview__background" src="../../assets/images/live/QRcode.png">
						</template>
						<template v-if="form.authWatchStatus == 3">
							<div class="preview__view">
								<p class="authCodeHints">{{ form.authCodeHints }}</p>
								<img class="guide" :src="live.liveGuide.guideImageUrl" alt="直播引导图">
							</div>
							<img class="preview__background" src="../../assets/images/live/test.png">
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
			...mapState('live', ['live']),
		},
		mounted () {
			this.form = Object.assign({}, this.live.liveAuthWatch);
			this.form.price = this.form.price / 100;
		},
		methods: {
			...mapActions('live', {
				setAuth: 'LIVE_AUTH'
			}),
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.live.id;
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
