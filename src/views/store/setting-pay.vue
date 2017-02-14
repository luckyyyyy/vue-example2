<template>
	<div class="view">
		<h2>当前微信支付：彩虹云直播-代销 <el-switch @change="switchChange" v-model="enable" on-text="开" off-text="关" on-color="#87D068"></el-switch></h2>
		<p>使用彩虹云直播微信支付（代销账户），您的频道可以通过彩虹云直播代销商品，并由您发起提现申请与彩虹云直播结算相应货款。</p>
		<h2>提现时间：</h2>
		<p>当天18点前申请提现，当天审核完成，实际到账时间以银行入账时间为准。 <a>查看收入</a></p>
		<h2>交易手续费：</h2>
		<p>彩虹云直播不收取任何提现手续费；支付机构收取0.6%交易手续费，通过彩虹云直播完成代缴。</p>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		data () {
			return {
				enable: true
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

<style scoped lang="less">
	.view {
		display: flex;
		flex-direction: column;
		h2 {
			font-size: 14px;
			color: #000;
			margin: 0;
			.el-switch {
				margin-left: 10px;
			}
		}
		p {
			margin: 0;
			margin-bottom: 30px;
		}
	}
</style>
