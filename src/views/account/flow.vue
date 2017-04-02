<template>
	<div class="container">
		<!-- 流量管理 -->
		<div class="card-wrap">
			<Card class="border-r" :bordered="false" dis-hover>
				<p slot="title" class="title">流量管理</p>
				<p class="content">当前流量余额：<span class="count">¥ 0.00</span></p>
			</Card>
		</div>
		<!-- 充值 -->
		<div class="card-wrap">
			<Card class="border-r" :bordered="false" dis-hover>
				<p slot="title" class="title">一元起充</p>
				<!-- tips -->
				<div class="content content-info">
					<Input class="charge" placeholder="请输入充值金额"></Input>
					<p class="tips">
						<span>注：起充金额 ≥ 1元；流量单价 0.06 元/人/分钟。</span>
						<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp观看费用 = 直播、点播累计观看时长 x 单价。</span>
						<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp单人次不满1分钟不计费。</span>
						<span class="tips-box">有效期：无限期</span>
						<span class="tips-box">
							<Checkbox v-model="isAgree"><a href="#">《 彩虹云直播平台服务条款 》</a></Checkbox>
						</span>
					</p>
					<p class="price-box">总价：<span class="price">￥ 0.00</span></p>
				</div>
				<!-- 支付方式 -->
				<div class="content content-info">
					<Radio-group v-model="pay_method" class="pay-box">
						<Radio :label="1">
							<img class="pay-mothod" src="../../assets/images/account/alipay.png" height="43" width="125" alt="支付宝支付">
						</Radio>
						<Radio :label="2">
							<img class="pay-mothod" src="../../assets/images/account/offline.png" height="43" width="125" alt="线下支付">
						</Radio>
						<Radio :label="3">
							<img class="pay-mothod" src="../../assets/images/account/yu'e.png" height="43" width="125" alt="余额支付">
						</Radio>
					</Radio-group>
				</div>
				<!-- 支付按钮 -->
				<div class="content">
					<Button type="error" class="pay-btn">确认支付</Button>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				pay_method: 1,
				isAgree: false
			}
		},
		mounted () {
		},
		methods: {
			handleChange () {

			}
		},
		watch: {
			pay_method() {
				console.log("支付方式： " + this.pay_method);
			},
			isAgree() {
				console.log("是否同意： " + this.isAgree);
			}
		}
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/flow.less";
</style>
