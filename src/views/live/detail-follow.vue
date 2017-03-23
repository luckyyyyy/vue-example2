<template>
	<div class="view">
		<div class="switch">
			<p>关注观看：</p>
			<iSwitch size="large" @on-change="switchChange" v-model="enable">
				<span slot="open">开启</span>
				<span slot="close">关闭</span>
			</iSwitch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">如果关闭，这里字也错了。</p>
				<div class="action">
					<div class="form">
						写点介绍给他们。。。。。。。。。。。。。。。。
					</div>
					<div class="iPhone-bg">
						<div class="iPhone-view">
							<!-- TODO IMG -->
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<p class="tips">开启后能干嘛？</p>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				enable: true,
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
	@import url('../../assets/styles/views/live/detail.less');
</style>
