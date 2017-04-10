<template>
	<div class="container">
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">立即充值</p>
			<!-- 账户充值 -->
			<div class="content content-info">
				<p class="price-box">当前账户余额： <span class="price">100.00</span> 元</p>
				<Input class="charge" placeholder="请输入充值金额"></Input>
				<span>注：起充金额 ≥ 1元。</span>
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
			<!-- 温馨提示 -->
			<div class="content">
				<ul class="list">
					<li class="list-title">温馨提示：</li>
					<li>1.支持微信，银联支付，线下银行付款等方式充值啊搜嘎第三个发达阿斯蒂芬撒地方换个地方更多发挥。</li>
					<li>2.支付成功后，可在账户总览中查看最新余额公司的符合规范的实施换个房间换个。</li>
					<li>3.充值成功的金额不支持提现是否感到很舒服规划规范化个h。</li>
					<li>4.支持查看所有历史充值记录，点击进入查询花费多少时间还是官方就会更加开放空间框架高科技和。</li>
				</ul>
			</div>
		</Card>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				pay_method: 1
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
			}
		}
	}
</script>

<style lang="less">
	@import "../../assets/styles/views/account/recharge.less";
</style>
