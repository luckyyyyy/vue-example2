<template>
	<div class="container">
		<!-- 流量管理 -->
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">账户充值</p>
			<p class="content">当前账户余额：<span class="count">0.00元</span></p>
		</Card>
		<!-- 充值 -->
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">一元起充</p>
			<!-- tips -->
			<div class="content content-info">
				<Input class="charge" placeholder="请输入充值金额"></Input>
				<p class="tips">
					<span>注：起充金额 ≥ 1元；</span>
					<span>流量单价 0.06 元/人/分钟。 观看费用 = 直播、点播累计观看时长 x 单价。</span>
					<span>单人次不满1分钟不计费。</span>
					<span class="tips-box">有效期：一年</span>
					<span class="tips-box">
						<Checkbox v-model="form.isAgree"><a href="#">《 彩虹云直播平台服务条款 》</a></Checkbox>
					</span>
				</p>
				<p class="price-box">总价：<span class="price">￥ 0.00</span></p>
			</div>
			<!-- 支付方式 -->
			<Paymethod :balance='false' :form='form'></Paymethod>
			<!-- 支付按钮 -->
			<div class="content">
				<Button type="error" class="pay-btn">确认支付</Button>
			</div>
		</Card>
	</div>
</template>

<script>
	import Paymethod from '../../components/item/paymethod.vue'
	export default {
		data () {
			return {
				form: {
					payMethod: 1,
					isAgree: false,
				}
			}
		},
		methods: {

		},
		components: {
			Paymethod,
		}
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/flow.less";
</style>
