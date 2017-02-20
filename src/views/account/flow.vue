<template>
	<div class="container">
		<div class="header">
			<p class="current-plan">
				<span>当前账户版本：</span>
				<span>A套餐</span>
				<span class="validity">有效期至：2017-03-31  23:59:59</span>
			</p>
			<p><span>当前流量余额：</span><span>¥ 20.00</span></p>
		</div>
		<div class="buy-mothod-wrapper">
			<p>选择流量购买方式：</p>
			<hr>
			<div class="buy-methods-box">
				<el-radio class="radio" v-model="buy_method" label="money">1元起充</el-radio>
	  			<el-radio class="radio" v-model="buy_method" label="package">购买流量套餐</el-radio>
			</div>
			<div class="money-box" v-if="buy_method === 'money'">
				<div class="money-wrapper">
					<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
					<div class="description">			
						<span>注：起充金额 ≥ 1元；流量单价 0.06 元/人/分钟。</span>
						<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp观看费用 = 直播、点播累计观看时长 x 单价。</span>
						<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp单人次不满1分钟不计费。</span>
					</div>
					<p class="text">有效期：无期限</p>
					<p class="text"><span>总价：</span><span class="blue-text">¥ 0.00</span></p>
				</div>
			</div>
			<div class="package-box" v-if="buy_method === 'package'">
				<div class="package-list">
					<ul class="package-item" :class="{'checked-package': checked_package === package.name}" v-for='package in packages' @click="checked_package = package.name">
						<li class="header">
							<span>套餐A</span>
							<i class="icon iconfont icon-delete"></i>
						</li>
						<li class="content">单价</li>
						<li class="content" style='color: #fe5000'><span style="font-size:14px;">0.04</span><span>元</span></li>
						<li class="content">时长</li>
						<li class="content"><span style="font-size: 14px;">300000</span><span>分钟</span></li>
					</ul>
				</div>
				<div>
					<div class="attention-box">
						<span class="attention">注：1.时长套餐到期后余额冻结不清零，购买任意套餐激活，时效顺延；</span>
						<span class="attention">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2.若当前套餐未到期，流量未使用完，套餐升级时，流量累计有效期于升级购买日期起算。</span>		
					</div>
					<p>有效期：1年（2017-02-10 至 2018-02-10）</p>
					<p><span>总价：</span><span class="blue-text">¥ 12000</span></p>
				</div>
			</div>
		</div>
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
				pay_method: 'alipay',
				buy_method: 'money',
				input1: 1,
				packages: [{
					name: 'A套餐'
				}, {
					name: 'B套餐'
				}, {
					name: 'C套餐'
				}],
				checked_package: 'A套餐'
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
		.header {
			background-color: #f7f8fa;
			padding: 22px 16px;
			.validity {
				margin-left: 50px;
			}
			p {
				margin: 0px;
			}
			.current-plan {
				color: #666666;
				line-height: 14px;
				margin-bottom: 15px;
			}
		}
		hr {
			border-width: 0 0 1px 0;
			border-bottom: 1px solid #ebecf0;
			margin-top: 30px;
		}
		.pay-mothod-wrapper, .buy-mothod-wrapper {
			padding: 22px 15px;
			background-color: #f7f8fa;
			p {
				margin: 0px;
			}
		}
		.buy-mothod-wrapper {
			margin-top: 16px;
			.buy-methods-box {
				margin-top: 20px;
				padding: 5px 30px;
				.el-radio {
					margin-right: 50px;
				}
			}
			.money-box {
				margin: 20px 30px 0px 30px;
				height: 281px;
				background-color: #ffffff;
				border: solid 1px #ebecf0;	
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;		
				.el-input {
					width: 178px;
				}
				.money-wrapper {
					p {
						margin-top: 20px;
					}
					.description {
						font-size: 12px;
						margin-top: 15px;
						display: flex;
						flex-direction: column;
					}
				}	
			}
			.package-box {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;	
				margin: 20px 30px 0px 30px;
				height: 344px;
				background-color: #ffffff;
				border: solid 1px #ebecf0;	
				.package-list {
					display: flex;
					.package-item {
						width: 150px;
						height: 129px;
						border-radius: 5px;
						background-color: #ffffff;
						border: solid 1px #c4c6cf;
						margin-left: 20px;
						.header {
							display: flex;
							justify-content: space-between;
							padding: 10px;
							border-radius: 3px 3px 0 0;
							background-color: #c4c6cf;
							color: #fff;
							i {
								display: none;
								font-size: 14px;
							}
						}
						.content {
							margin-left: 10px;
							font-size: 12px;
							margin-top: 2px;
						}
					}
					.checked-package {
						border: solid 1px #1190bf;
						.header {
							background-color: #1190bf;
							i {
								display: inline;
							}
						}
					}
				}
				.attention-box {
					display: flex;
					flex-direction: column;
					color: #1190bf;
					margin-top: 10px;
				}				
				p {
					margin-top: 25px;
				}
			}
			hr {
				margin: 0 -15px;
				margin-top: 22px;
			}
		}
		.pay-mothod-wrapper {
			margin-top: 15px;
			.pay-methods-box {
				margin-top: 20px;
				padding: 5px 30px;
				.el-radio {
					margin-right: 50px;
				}
				img {
					vertical-align: middle;
					margin-left: 5px;
				}
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
