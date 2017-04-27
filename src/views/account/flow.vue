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
					<span>有效期：1年（2017-02-10 至 2018-02-10）</span>
					<span>注：若当前版本未到期，剩余版本余额可抵用升级版本相应金额（如，专业版剩余3个月，则可抵扣1/4*4990=1247.5元。）；有效期于升级日期起计算。</span>
					<span>发票：订单对应可开发票的类型和抬头为您在用户中心-发票信息管理中设置的信息</span>
					<span class="tips-box">
						<Checkbox v-model="isAgree"><a href="#">《 彩虹云直播平台服务条款 》</a></Checkbox>
					</span>
				</p>
				<p class="price-box">总价：<span class="price">￥ {{ totalPrice.toFixed(2) }}</span></p>
			</div>
			<!-- 支付方式 -->
			<div class="content">
				<Paymethod @select="selectPayMethod" :defaultPayMethod="payMethod"></Paymethod>
			</div>
			<!-- 确认按钮 -->
			<div class="content">
				<Button @click='onSubmit' type="error" class="pay-btn" :disabled="!isAgree">立即购买</Button>
			</div>
		</Card>
	</div>
</template>

<script>
	import Paymethod from '../../components/item/paymethod.vue'

	export default {
		components: {
			Paymethod,
		},
		data () {
			return {
				totalPrice: 1,
				payMethod: 1,
				isAgree: false,
			}
		},
		methods: {
			onSubmit () {

			},
			selectPayMethod (result){
				this.payMethod = result;
				console.log('支付方式',this.payMethod);
			},
		},
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/flow.less";
</style>
