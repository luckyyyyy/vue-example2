<template>
	<div>
		<div class="container">
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					账户版本
				</p>
				<div class="content">
					<div class="content-head">
						<p>当前账户版本：<span class="focus">基础版</span></p>
						<p>有效期：<span class="focus">有效期至：2017-03-31  23:59:59</span></p>
					</div>
				</div>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					升级版本选择
				</p>
				<div class="content">

				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
			}
		},
		mounted () {
		},
		methods: {
		},
		watch: {
		},
		computed: {
		},
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/package.less";
</style>

