<template>
	<div class="view">
		<div class="switch">
			<p>授权观看</p>
		</div>
		<div class="body">
			<p class="tips">授权观看需要什么什么什么什么大文件第五批几大块为契机哦</p>
			<div class="action">
				<div class="form">
					<RadioGroup v-model="authorize">
						<Radio :label="1">
							<span>无限制</span>
						</Radio>
						<Radio :label="2">
							<span>关注观看</span>
						</Radio>
						<Radio :label="3">
							<span>验证码观看</span>
						</Radio>
						<Radio :label="4">
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
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				authorize: 1,
				form: {
					name: '',
				},
			}
		},
		mounted () {
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
