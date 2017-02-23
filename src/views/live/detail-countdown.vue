<template>
	<div class="view">
		<div class="left">
			倒计时开关：<el-switch @change="switchChange" v-model="enable" on-text="开" off-text="关" on-color="#87D068"></el-switch>
			<template v-if="enable">
				<p class="tips">如果关闭，将影响用户点击进入直播间的效果，同时没有提醒观看的功能。</p>
				<el-form label-position="left" ref="form" :model="form" label-width="120px" class="form">
					<el-form-item label="直播提示文字:">
						<el-input v-model="form.name" placeholder="不超过10个字符"></el-input>
					</el-form-item>
					<el-form-item label="直播开始时间:">
						<div class="block">
							<el-date-picker @change="dateChange" v-model="form.date" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
							<el-time-picker v-model="form.time" :picker-options="pickerOptions1" placeholder="选择时间"> </el-time-picker>
						</div>
					</el-form-item>
					<p class="datetime">倒计时剩余时间：
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
			</template> 
			<template v-else>
				<p class="tips">倒计时功能开启时，会以倒计时形式（xx天xx时xx分xx秒）显示在直播页面</p>
			</template>
		</div>
		<div class="right">
			<template v-if="enable">
				<div class="iPhone-bg">
					<div class="iPhone-view">
						<p class="title">{{ form.name || '直播开始文字' }}</p>
						<div class="time">
							<div class="tips">距离直播开始还剩</div>
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
			</template>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		data () {
			return {
				form: {
					name: '',
					time: moment().add(30, 'm').toDate(),//moment().format(),
					date: moment().toDate()
				},
				countDown: {
					start: false,
					d: 0,
					h: 0,
					m: 0,
					s: 0,
				},
				enable: true,
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				pickerOptions1: {
					// selectableRange: `${moment().format('HH:mm:ss')} - 23:59:59`,
					format: 'HH:mm:ss'

				}
			}
		},
		computed: {
		},
		mounted () {
			setInterval(() => {
				if (this.enable) {
					const time = moment(this.form.time).format('HH:mm:ss');
					const date = moment(this.form.date).format('Y-MM-DD');
					const start = moment(`${date} ${time}`);
					const left = start.unix() - moment().unix();
					if (left > 0) {
						this.countDown.start = false;
						this.countDown.d = parseInt(left / 86400);
						this.countDown.h = parseInt(left / 3600 % 24);
						this.countDown.m = parseInt(left / 60 % 60);
						this.countDown.s = parseInt(left % 60);
					} else {
						this.countDown.start = true;
					}
				}
			}, 1000);
		},
		methods: {
			switchChange (enabled) {

			},
			dateChange (val) {
				// 有问题
				// if (!moment(val).isSame(moment().format('Y-MM-DD'))) {
				// 	this.pickerOptions1 = { selectableRange: null }
				// } else {
				// 	this.pickerOptions1 = {
				// 		selectableRange: `${moment().format('HH:mm:ss')} - 23:59:59`
				// 	}
				// }
			}
		}
	}
</script>

<style scoped lang="less">
	.left {
		width: 520px;
		.tips {
			font-size: 12px;
			color: #999;
		}
		.form {
			margin-top: 30px;
			margin-left: 10px;
		}
		.datetime {
			margin-left: 120px;
			span {
				padding: 5px;
			}
		}
	}
	.view {
		display: flex;
		.right {
			margin-left: 30px;
			.iPhone-view {
				color: white;
				text-align: center;
				.title {
					padding-top: 200px;
				}
				.time {
					font-size: 12px;
					.datetime {
						span {
							padding: 5px;
							color: #b73d6a;
						}
					}
				}
			}
		}
	}
</style>
