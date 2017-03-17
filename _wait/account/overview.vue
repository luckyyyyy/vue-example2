<template>
	<div class="container">
		<div class="header">
			<span class="name">美女撩店</span>
			<span class="tag">服务号</span>
			<span class="tag">企业认证</span>
			<span class="tag">微频道</span>
		</div>
		<div class="account-overview-wrapper">
			<p class="account-overview-title">账户总览</p>
			<ul class="account-overview-box" router="router">
				<li>
					<span>当前账户余额：</span><strong>100.00元</strong>
					<el-button type="text" @click="goRecharge()">充值</el-button>
				</li>
				<li>
					<span>当前账户版本：</span><strong>基础版</strong>
					<strong class="expire">（到期时间：2017-02-02 23:59:59）</strong>
					<el-button type="text" @click="goUpgrade()">升级</el-button>
				</li>
			</ul>
		</div>
		<div class="package-overview-wrapper">
			<p class="package-overview-title">套餐详情<el-button type="text">了解更多</el-button></p>
			<ul class="package-overview-box">
				<li>
					<span>当前流量套餐：无</span>
					<el-button type="text" @click="goFlow()">购买</el-button>
				</li>
			</ul>
			<div class="indicator-box">
				<div class="indicator-item">
					<p>剩余存储空间（GB）</p>
					<dial-indicator min_value="0" :max_value="100" :current_value="value1"></dial-indicator>
				</div>
				<div class="indicator-item">
					<p>本月剩余观看时长（分钟）</p>
					<dial-indicator min_value="0" :max_value="4000" :current_value="value2"></dial-indicator>
				</div>
			</div>
		</div>
		<div>
		</div>
		<div class="test">

		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import DialIndicator from '../../components/item/dialIndicator'
	export default {
		mounted() {
			setTimeout(()=> {
				this.value1 = 70;
				this.value2 = 1400;
			}, 1000)
		},
		data () {
			return {
				input: 80,
				router: true,
				value1: 0,
				value2: 0
			}
		},
		components: {
			DialIndicator
		},
		methods: {
			switchChange (enabled) {

			},
			goRecharge() {
				this.$router.push({ name: 'account_recharge' })
			},
			goUpgrade() {
				this.$router.push({ name: 'account_upgrade' })
			},
			goFlow() {
				this.$router.push({ name: 'account_flow' })
			}
		}
	}
</script>

<style scoped lang="less">
/*.test {
	width: 100px;
	height: 100px;
	background-color: red;
	transition: all 2s;
	transform: rotate(100deg);
}*/
.container {
	padding: 25px;
	.el-button  {
		margin-left: 30px;
	}
	.header {
		display: flex;
		align-items: center;
		.name {
			color: #666666;
			font-size: 18px;
		}
		.tag {
			background-color: #e85471;
			padding: 1px 4px;
			color: #fff;
			font-size: 12px;
			margin-left: 10px;
		}
	}
	.account-overview-wrapper {
		margin-top: 30px;
		.account-overview-box {
			.expire {
				font-size: 12px;
			}
		}
	}
	.account-overview-box, .package-overview-box {
		background-color: #f7f8fa;
		padding: 20px 16px;
	}
	.account-overview-title, .package-overview-title {
		color: #666666;
	}
	.package-overview-wrapper {
		margin-top: 25px;
		.indicator-box {
			background-color: #f7f8fa;
			padding: 20px 50px;
			display: flex;
			.indicator-item {
				margin-right: 100px;
				p {
					margin: 0px;
				}
			}
		}
	}
}
</style>
