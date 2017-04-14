<template>
	<div class="container">
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">
				流量管理
				<a class="link" href="#">充值</a>
				<a class="link" href="#">账户充值记录</a>
			</p>
			<p class="content">当前流量余额：<span class="text-bold">¥ 0.00</span></p>
		</Card>
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">
				当前频道
				<a class="link" href="#">了解更多</a>
			</p>
			<div class="content">
				<div class="content-head">
					<p>当前频道流量套餐：<span class="text-bold">基础班</span></p>
					<p>有效期至：<span class="text-bold">2018.04.06</span></p>
					<a class="link" href="#">购买</a>
				</div>
				<div class="content-body">
					<div class="content-card">

					</div>
					<div class="content-card">

					</div>
				</div>
			</div>
		</Card>
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
		}
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/overview.less";
</style>
