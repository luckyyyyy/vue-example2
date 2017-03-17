<template>
	<div class="wrap">
		<div v-if="token" class="main">
			<router-view name="topbar"></router-view>
			<router-view name="sidebar"></router-view>
			<router-view name="main" class="router-view"></router-view>
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
	</div>
</template>
<script>
	import store from './store'
	import logout from './store/modules/user/logout'
	import channel_query from './store/modules/channel/query'
	store.registerModule('channel_query', channel_query);
	store.registerModule('logout', logout);
	export default {
		computed: {
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
<style>
</style>
<style lang="less">
	.developer {
		position: absolute;
		left: 15px;
		top: 10px;
		color: red;
		font-size: 12px;
		z-index: 9999999;
		ol {
			list-style-type: decimal;
			margin-left: 20px;
		}
	}
	.wrap {
		height: 100%;
	}
	.main {
		z-index: 99;
		.router-view {
			box-sizing: border-box;
			display: flex;
			padding-left: 135px;
			box-sizing: border-box;
		    position: absolute;
		    width: 100%;
		    top: 50px;
		    bottom: 0px;
		    background-color: #000;
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
				.smscode {
					display: flex;
					align-items: center;
					.ivu-btn {
						margin-left: 10px;
						width: 100px;
					}
				}
				.button {
					.ivu-btn {
						margin: 5px 0;
					}
				}
				.bottom {
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
			}
			.footer {
				position: absolute;
				width: 100%;
				text-align: center;
				bottom: 30px;
				left: 0;
			}
		}
	}
</style>















