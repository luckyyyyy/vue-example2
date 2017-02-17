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
			<ul class="account-overview-box">
				<li>
					<span>当前账户余额：</span><strong>100.00元</strong>
					<el-button type="text">充值</el-button>
				</li>
				<li>
					<span>当前账户版本：</span><strong>基础版</strong>
					<strong class="expire">（到期时间：2017-02-02 23:59:59）</strong>
					<el-button type="text">升级</el-button>					
				</li>
			</ul>
		</div>
		<div class="package-overview-wrapper">
			<p class="package-overview-title">套餐详情<el-button type="text">了解更多</el-button></p>
			<ul class="package-overview-box">
				<li>
					<span>当前流量套餐：无</span>
					<el-button type="text">购买</el-button>
				</li>
			</ul>
		</div>
		<div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		data () {
			return {
				input: 80
			}
		},
		mounted () {
		},
		methods: {
			switchChange (enabled) {

			},
		}
	}
</script>

<style scoped lang='less'>
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
	}
}
</style>
