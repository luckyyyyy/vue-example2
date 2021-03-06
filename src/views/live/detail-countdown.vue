<template>
	<div class="view">
		<div class="switch">
			<p>倒计时开关：</p>
			<el-switch :width="60" on-text="开启" off-text="关闭" size="large" @change="onChange" v-model="enable"></el-switch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">如果关闭，将影响用户点击进入直播间的效果，同时没有提醒观看的功能。</p>
				<div class="action">
					<el-form label-position="left" ref="form" :model="form" label-width="100px" class="form">
						<el-form-item label="提示文字">
							<el-input @change="onDebounce" v-model="form.liveHint" placeholder="不超过10个字符"></el-input>
						</el-form-item >
						<el-form-item label="直播开始时间">
							<div class="block">
								<el-date-picker
									type="datetime"
									format="yyyy-MM-dd HH:mm"
									placeholder="选择日期时间"
									v-model="form.liveBeginTime"
									:picker-options="pickerOptions"
									@change="onChange"
									:editable="false"
									:clearable="false"
								></el-date-picker>
							</div>
						</el-form-item>
						<p class="datetime">
							倒计时剩余时间
							<template v-if="countDown.start">
								开始时间大于当前时间，直播已开始。
							</template>
							<template v-else>
								<span class="days">{{ countDown.d }}</span>天
								<span class="hours">{{ countDown.h }}</span>时
								<span class="minutes">{{ countDown.m }}</span>分
								<span class="seconds">{{ countDown.s }}</span>秒
							</template>
						</p>
					</el-form>
					<div class="preview">
						<div class="preview-box">
							<div class="preview__head">{{ live.name }}</div>
							<div class="preview__view">
								<!-- 包裹文本 -->
								<div class="txt-box">
									<p class="title">{{ form.liveHint || '直播开始文字' }}</p>
									<div class="time">
										<div class="desc">距离直播开始还剩</div>
										<div class="datetime">
											<template v-if="countDown.start">
												开始时间大于当前时间，直播已开始。
											</template>
											<template v-else>
												<span class="days">{{ countDown.d }}</span>天
												<span class="hours">{{ countDown.h }}</span>时
												<span class="minutes">{{ countDown.m }}</span>分
												<span class="seconds">{{ countDown.s }}</span>秒
											</template>
										</div>
									</div>
								</div>
							</div>
							<img class="preview__background" src="../../assets/images/live/countdown.png" alt="直播倒计时">
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<p class="tips">倒计时功能开启时，会以倒计时形式（xx天xx时xx分xx秒）显示在直播页面</p>
			</template>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import debounce from 'debounce'
	import { mapState, mapActions } from 'vuex'

	export default {
		data () {
			return {
				form: {},
				countDown: {
					start: false,
					d: 0,
					h: 0,
					m: 0,
					s: 0,
				},
				pickerOptions: {
					disabledDate (date) {
						return date && date.valueOf() < Date.now() - 86400000;
						// return time.getTime() < Date.now() - 8.64e7;
					}
				}
			}
		},
		computed: {
			...mapState('live', ['live']),
			enable: {
				set (val) {
					this.form.countDownStatus = val ? 1 : 0;
				},
				get () {
					return this.form.countDownStatus == 1;
				}
			}
		},
		created () {
			this.form = Object.assign({}, this.live.liveCountDown);
			this.form.liveBeginTime = moment(this.form.liveBeginTime).toDate();
			this.setInterval = setInterval(this.onInterval, 1000);
			this.onInterval();
		},
		beforeDestroy () {
			if (this.setInterval) clearInterval(this.setInterval);
		},
		methods: {
			...mapActions('live', {
				setCountDown: 'LIVE_COUNTDOWN'
			}),
			onInterval () {
				if (this.form.countDownStatus) {
					const unix = moment(this.form.liveBeginTime).unix();
					const left = unix - moment().unix();
					if (left > 0) {
						this.countDown.start = false;
						this.countDown.d = parseInt(left / 8.64e4);
						this.countDown.h = parseInt(left / 3600 % 24);
						this.countDown.m = parseInt(left / 60 % 60);
						this.countDown.s = parseInt(left % 60);
					} else {
						this.countDown.start = true;
					}
				}
			},
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.live.id;
				data.liveBeginTime = moment(data.liveBeginTime).valueOf()
				this.setCountDown(data);
			},
			onDebounce () {
				if(!this.debounce){
					this.debounce = debounce(this.onChange, 200)
				}
				this.debounce();
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
