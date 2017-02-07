<template>
	<div class="first-page">
		<div class="box">
			<div class="logo">
				<a href=""><img src="../../assets/logo.png"></a>
			</div>
			<router-view name="first"></router-view>
			<div class="footer">
				2016 © rainbowbr.cn - 浙ICP备16022511号
			</div>
		</div>
	</div>
</template>

<script>

export default {
	// data () {

	// },
	computed: {

	},
	mounted () {
		//
	},
	methods: {

	}
}
</script>

<style lang="less">
	@color-red: #C1272D;
	.first-page {
		position: absolute;
		background-image: linear-gradient(90deg, #e85471, #00aecb);
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;

		.box {
			display: flex;
			align-items: center;
			flex-direction: column;
			padding-top: 40px;
			background: #fff;
			height: 100%;
			box-sizing: border-box;
			.logo {
				margin-bottom: 20px;
				.icon-logo {
					font-size: 80px;
				}
			}
			.register-seccuss {
				text-align: center;
				.top {
					width: 480px;
					&:after {
						content: "";
						margin: 50px 0 45px 0;
						background-image: linear-gradient(to right, #ad6b88, #4095b2);
						display: block;
						height: 2px;
					}
				}
				img {
					width: 170px;
				}
			}
			.form {
				width: 480px;
				padding-top: 8px;
				&:before {
					content: "";
					background-image: linear-gradient(to right, #ad6b88, #4095b2);
					display: block;
					height: 2px;
				}
				.title {
					padding: 30px 0 10px 0;
					text-align: center;
					font-size: 24px;
					color: #666666;
					letter-spacing: 2px;
					line-height: 26px;
					margin-bottom: 20px;
				}
				.el-button {
					text-align: center;
				}
				.smscode {
					.el-input {
						width: 270px;
					}
					button {
						float: right;
						width: 100px;
					}
				}
				.bottom, .bottom-center {
					margin-top: 15px;
					display: flex;
					justify-content: space-between;
					a {
						text-decoration: none;
					}
					.resetpwd {
						color: #4D4D4D;
						&:hover {
							color: darken(#4D4D4D, 15%);
						}
					}
					.register, .login {
						color: @color-red;
						&:hover {
							color: darken(@color-red, 10%);
						}
					}
				}
				.bottom-center {
					text-align: center;
					display: block;
				}
			}
			.footer {
				position: absolute;
				bottom: 30px;
			}
		}
	}
</style>

