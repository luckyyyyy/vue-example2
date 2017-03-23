<template>
	<div class="view">
		<div class="form success">
			<div class="top">
				<h1>注册成功</h1>
				<p @click="to_login">请点击此处登录，或等待3秒页面跳转。</p>
			</div>
			<div class="contact">
				<img src="../../assets/qrcode.png">
				<p>彩虹云直播微信公众号</p>
				<p>客服热线：123456789</p>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	mounted () {
		// setTimeout(() => {
		// 	this.to_login();
		// }, 3000);
	},
	methods: {
		to_login () {
			this.$router.push({ name: 'login' });
		}
	}
}
</script>

<style scoped lang="less">
	.success {
		text-align: center;
		color: #fff;
		width: 480px;
		.top {
			margin: 20px;
			p {
				cursor: pointer;
				&:hover {
					color: darken(#fff, 5%);
				}
			}
		}
		img {
			width: 170px;
		}
	}
</style>
