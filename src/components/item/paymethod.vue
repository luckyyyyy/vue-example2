<template>
	<div class="container">
		<Radio-group v-model="form.payMethod" class="pay-box">
			<Radio :label="1" v-if="alipay">
				<img class="pay-method" src="../../assets/images/account/alipay.png" height="43" width="125" alt="支付宝支付">
			</Radio>
			<Radio :label="2" v-if="offline">
				<img class="pay-method" src="../../assets/images/account/offline.png" height="43" width="125" alt="线下支付">
			</Radio>
			<Radio :label="3" v-if="balance">
				<img class="pay-method" src="../../assets/images/account/yu'e.png" height="43" width="125" alt="余额支付">
			</Radio>
		</Radio-group>
	</div>
</template>

<script>
	export default {
		props: {
			form: {
				type: Object,
				default: {},
				required: true,
			},
			alipay: {
				type: Boolean,
				default: true,
			},
			offline: {
				type: Boolean,
				default: true,
			},
			balance: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
.container {
	border-radius: 6px;
	background-color: #f2f3f7;
	margin-bottom: 20px;
	padding: 20px 40px;
	&:last-child {
		margin-bottom:0px;
	}
}
.pay-box {
	display: flex;
	justify-content: space-around;
	.pay-method {
		vertical-align:middle;
	}
}

</style>
