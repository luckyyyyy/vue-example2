<template>
	<div class="container">
		<div class="header">
			<p class="current-plan">
				<span>当前账户版本：</span>
				<span>基础版</span>
				<span class="validity">有效期至：2017-03-31  23:59:59</span>
			</p>

		</div>
		<ul class="package-detail">
			<li>
				<span class="title">升级类型：</span>
				<span class="content">专业版</span>
			</li>
			<li>
				<span class="title">收费标准：</span>
				<span class="blue-text">4990</span>
				<span class="amount">元/年</span>
			</li>
			<li>
				<span class="title">购买年限：</span>
				<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
				<span style="padding-left: 10px;padding-right: 10px;">年</span>
				<span>（有效期限：2017-02-10 23:59:59 至 2018-02-10 23:59:59)</span>
			</li>
			<li>
				<span class="title">总价：</span>
				<span class="blue-text">¥ 4990.00</span>
			</li>
			<hr>
			<li>
				<span class="title">实付金额：</span>
				<span class="orange-text">¥ 4990.00</span>
			</li>
		</ul>
		<div class="pay-mothod-wrapper">
			<p>选择付款方式：</p>
			<hr>
			<div class="pay-methods-box">
				<el-radio class="radio" v-model="pay_method" label="alipay">
					<img src="../../assets/account/alipay.png" height="43" width="125">
				</el-radio>
	  			<el-radio class="radio" v-model="pay_method" label="wechat">
	  				<img src="../../assets/account/wechat.png" height="43" width="125">
	  			</el-radio>
	  			<el-radio class="radio" v-model="pay_method" label="offline">
	  				<img src="../../assets/account/offline.png" height="43" width="125">
	  			</el-radio>
	  			<el-radio class="radio" v-model="pay_method" label="yue">
	  				<img src="../../assets/account/yu'e.png" height="43" width="125">
	  			</el-radio>
			</div>
			<el-button type="primary">立即支付</el-button>
		</div>
		<ul class="reminder-box">
			<li class="title">温馨提示：</li>
			<li class="content">1.支持微信，银联支付，线下银行付款等方式充值。</li>
			<li class="content">2.支付成功后，可在账户总览中查看最新余额。</li>
			<li class="content">3.充值成功的金额不支持提现。</li>
			<li class="content">4.支持查看所有历史充值记录，点击进入查询。</li>
			<li class="content">5.若充值未到账或有其他疑问可致电客服热线：0571-12345678。</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				num1: 1,
				pay_method: 'alipay'
			}
		},
		mounted () {
		},
		methods: {
			handleChange () {

			}
		}
	}
</script>

<style scoped lang='less'>
	.container {
		padding: 15px 30px;
		.blue-text {
			color: #1190bf;
			font-size: 18px;
		}
		.orange-text {
			color: #fe5000;
			font-size: 18px;
		}
		.amount {
			font-size: 18px;
		}
		.header {
			background-color: #f7f8fa;
			padding: 22px 16px;
			.validity {
				margin-left: 50px;
			}
			.current-plan {
				color: #666666;
				line-height: 14px;
				margin: 0px;
			}
		}
		.package-detail {
			.title {
				color: #797979;
				width: 80px;
				display: inline-block;
				text-align: right;
				margin-right: 20px;
			}
			.content {
				color: #666;
			}
			padding: 25px 40px;
			li {
				margin-top: 30px;
				display: flex;
				align-items: center;
			}
			hr {
				margin: 0 -30px;
				margin-top: 30px;
			}
		}
		hr {
			border-width: 0 0 1px 0;
			border-bottom: 1px solid #ebecf0;
			margin-top: 30px;
		}
		.pay-mothod-wrapper {
			padding: 22px 15px;
			background-color: #f7f8fa;
			.pay-methods-box {
				margin-top: 20px;
				padding: 5px 30px;
				.el-radio {
					margin-right: 30px;
					img {
						vertical-align: middle;
						margin-left: 5px;
					}
				}
			}
			p {
				margin: 0px;
			}
			hr {
				margin: 0 -15px;
				margin-top: 22px;
			}
			.el-button {
				margin-left: auto;
				margin-right: auto;
				display: block;
				font-size: 12px;
				background-color: #1190bf;
				margin-top: 70px;
			}
		}
		.reminder-box {
			margin-top: 25px;
			.title {
				color: #333;
			}
			.content {
				color: #797979;
				margin-top: 3px;
				font-size: 12px;
			}
		}
	}
</style>
