<template>
	<div class="view">
		<div class="switch">
			<p>授权观看：</p>
			<iSwitch size="large" @on-change="switchChange" v-model="enable">
				<span slot="open">开启</span>
				<span slot="close">关闭</span>
			</iSwitch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">爱爱爱爱</p>
				<div class="action">
					<div class="form">
						<RadioGroup v-model="authorize">
							<Radio :label="1">
								<Icon type="social-apple"></Icon>
								<span>无限制</span>
							</Radio>
							<Radio :label="2">
								<Icon type="social-android"></Icon>
								<span>验证码观看</span>
							</Radio>
							<Radio :label="3">
								<Icon type="social-windows"></Icon>
								<span>付费观看</span>
							</Radio>
						</RadioGroup>
						<div class="setting">
							<template v-if="authorize == 2">
								<iForm label-position="left" ref="form" :model="form" :label-width="100">
									<FormItem label="提示文字：">
										<iInput v-model="form.name" placeholder="不超过10个字符"></iInput>
									</FormItem>
									<FormItem label="自定义验证码：">
										<iInput v-model="form.name" placeholder="aaaaa"></iInput>
									</FormItem>
								</iForm>
							</template>
							<template v-if="authorize == 3">
								<iForm label-position="left" ref="form" :model="form" :label-width="100">
									<FormItem label="提示文字：">
										<iInput v-model="form.name" placeholder="不超过10个字符"></iInput>
									</FormItem>
									<FormItem label="观看价格：">
										<iInput v-model="form.name" placeholder="aaaaa"></iInput>
									</FormItem>
								</iForm>
							</template>
						</div>
					</div>
					<div class="iPhone-bg">
						<div class="iPhone-view">
							<!-- TODO IMG -->
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<p class="tips">不不不不</p>
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
	@import url('../../assets/styles/live/detail.less');
</style>