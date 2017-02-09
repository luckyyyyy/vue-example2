<template>
	<div class="view">
		<div class="left">
			授权观看：<el-switch @change="switchChange" v-model="enable" on-text="开" off-text="关" on-color="#87D068"></el-switch>
			<template v-if="enable">
				<div class="radio">
					<p>选择授权类型：</p>
					<el-radio-group v-model="authorize">
						<el-tooltip class="item" effect="dark" content="用户可以无限制进入直播间" placement="bottom">
							<el-radio :label="1">无限制</el-radio>
						</el-tooltip>
						<el-radio :label="2">验证码观看</el-radio>
						<el-radio :label="3">付费观看</el-radio>
					</el-radio-group>
					<div class="setting">
						<template v-if="authorize == 2">
							<el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
								<el-form-item label="提示文字:">
									<el-input></el-input>
								</el-form-item>
								<el-form-item label="自定义验证码:">
									<el-input>
									</el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">保存</el-button>
								</el-form-item>
							</el-form>
						</template>
						<template v-if="authorize == 3">
							<el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
								<el-form-item label="提示文字:">
									<el-input></el-input>
								</el-form-item>
								<el-form-item label="观看价格:">
									<el-input>
										<template slot="append">元</template>
									</el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary">保存</el-button>
								</el-form-item>
							</el-form>
						</template>
					</div>
				</div>
			</template>
			<template v-else>
			</template>
		</div>
		<div class="right">
			<template v-if="enable">
				<div class="iPhone-bg">
					<div class="iPhone-view">
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
				enable: true,
				authorize: 2,
				form: {
					name: '',
					time: moment().add(30, 'm').toDate(),//moment().format(),
					date: moment().toDate()
				},
			}
		},
		mounted () {
		},
		methods: {
			switchChange (enabled) {

			},
		}
	}
</script>

<style scoped lang="less">
	.left {
		width: 510px;
		.tips {
			font-size: 12px;
			color: #999;
		}
		.radio {
			margin-top: 30px;
			margin-left: 10px;
			.el-radio {
				margin: 0 30px;
			}
			.setting {
				margin-top: 30px;
			}
		}
	}
	.view {
		display: flex;
		.right {
			margin-left: 30px;
			.iPhone-view {
			}
		}
	}
</style>
