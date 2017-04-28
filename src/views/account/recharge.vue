<template>
	<div><!-- 这里必须多套一层，否则高度不够的情况下背景有BUG -->
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
					<Input-number :min="1" :step="1" v-model="price" style="width:178px"></Input-number>
					<p class="tips">
						<span>注：起充金额 ≥ 1元；</span>
						<span>流量单价 0.06 元/人/分钟。 观看费用 = 直播、点播累计观看时长 x 单价。</span>
						<span>单人次不满1分钟不计费。</span>
						<span class="tips-box">有效期：一年</span>
						<span class="tips-box">
							<Checkbox v-model="isAgree"><a href="#">《 彩虹云直播平台服务条款 》</a></Checkbox>
						</span>
					</p>
					<p class="price-box">总价：<span class="price">￥ 0.00</span></p>
				</div>
				<!-- 支付方式 -->
				<div class="content">
				<Paymethod :balance='false' :defaultPayMethod='payMethod'></Paymethod>
				</div>
				<!-- 支付按钮 -->
				<div class="content">
					<Button type="error" class="pay-btn" :disabled='!isAgree' title='请确认同意《 彩虹云直播平台服务条款 》'>确认支付</Button>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import Paymethod from '../../components/item/paymethod.vue'
	export default {
		data () {
			return {
				payMethod: 1,
				isAgree: false,
				price: 1,
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
	@import "../../assets/styles/views/account/recharge.less";
</style>
