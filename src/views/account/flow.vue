<template>
	<div class="container">
		<!-- 流量管理 -->
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">流量管理</p>
			<p class="content">当前流量余额：<span class="count">¥ 0.00</span></p>
		</Card>
		<!-- 充值 -->
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">一元起充</p>
			<!-- tips -->
			<div class="content content-info">
				<Input-number :min="1" :step="1" v-model="totalPrice" style="width:178px"></Input-number>
				<p class="tips">
					<span>注：起充金额 ≥ 1元；流量单价 0.06 元/人/分钟。</span>
					<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp观看费用 = 直播、点播累计观看时长 x 单价。</span>
					<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp单人次不满1分钟不计费。</span>
				</p>
				<p class="price-box">总价：<span class="price">￥ {{ totalPrice }}</span></p>
			</div>
			<!-- 确认按钮 -->
			<div class="content">
				<Button @click='onSubmit' type="error" class="pay-btn">立即购买</Button>
			</div>
		</Card>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				totalPrice: 1,
			}
		},
		methods: {
			onSubmit () {
				this.$router.push({ name: 'account_flow_order', params: { totalPrice: this.totalPrice }})
			}
		},
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/flow.less";
</style>
