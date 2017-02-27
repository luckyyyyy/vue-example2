<template>
	<div class="wrap" v-loading.fullscreen.lock="lock" element-loading-text="拼命加载中">
		<div v-if="token" class="main">
			<router-view name="sidebar"></router-view>
			<!-- <transition name="fade"> -->
				<router-view name="main" class="router-view"></router-view>
			<!-- </transition> -->
			<router-view name="select"></router-view>
			<router-view name="user"></router-view>
		</div>
		<div v-else class="home">
			<div class="box">
				<div class="logo">
					<img src="./assets/logo.png">
				</div>
				<router-view name="first"></router-view>
				<div class="footer">
					2016 © rainbowbr.cn - 浙ICP备16022511号
				</div>
			</div>
		</div>
		<div class="developer">
			build: 20170207
		</div>
	</div>
</template>
<script>

export default {
	computed: {
		lock () {
			return this.$store.state.logout.lock;
		},
		token () {
			return this.$store.state.token;
		},
	},
	beforeCreate () {
		this.$store.dispatch('LOGIN_CHECK');
		this.$store.dispatch('SELECT_CHANNEL');
	},
}
</script>

<style lang="less">
	.developer {
		position: absolute;
		left: 15px;
		top: 10px;
		color: red;
		font-size: 12px;
		z-index: 9999999;
	}
	.wrap {
		height: 100%;
	}
	.main {
		height: 100%;
		position: relative;
		.router-view {
			padding: 15px;
			right: 0;
			top: 0;
			width: 100%;
			padding-left: 15 + 135px;
			background: #f2f3f7;
			position: absolute;
			min-height: 100%;
			height: auto;
			box-sizing: border-box;
		}
	}
	@color-red: #C1272D;
	.home {
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















