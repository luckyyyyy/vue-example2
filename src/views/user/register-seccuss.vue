<template>
	<div class="register-seccuss">
		<div class="top">
			<h1>注册成功</h1>
			<p>您的账号正在审核中，审核通过后客服会与您联系。</p>
		</div>
		<div class="contact">
			<img :src="qrcode">
			<p>彩虹云直播微信公众号</p>
			<p>客服热线：123456789</p>
		</div>
	</div>
</template>

<script>
import qrcode from '../../assets/qrcode.png'

export default {
	computed: {
	},
	data () {
		return {
			qrcode: this.$store.state.invitation && this.$store.state.invitation.qrcode_url || qrcode
		}
	}
}
</script>
