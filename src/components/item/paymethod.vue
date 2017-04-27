<!--  -->
<template>
	<div class="pay-wrap">
		<Radio-group v-model="payMethod" class="pay-box">
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
			},
			defaultPayMethod: {
				type: Number,
				required: true,
			}
		},
		data() {
			return {
				payMethod: this.defaultPayMethod,
			}
		},
		methods: {

		},
		watch: {
			payMethod () {
				this.$emit('select', this.payMethod);
			}
		}
	}
</script>

<style lang="less" scoped>
.pay-wrap {
	border-radius: 6px;
	background-color: #f2f3f7;
	padding: 29px 40px 28px;
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
