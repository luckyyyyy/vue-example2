<template>
	<div class="home">
		<div class="box">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
			<div class="footer">
				2016 © rainbowbr.cn - 浙ICP备16022511号
			</div>
		</div>
	</div>
</template>

<style lang="less">
	@color-red: #C1272D;
	.home {
		position: absolute;
		background: url(data:image/png;base64,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) #082b4f;
		background-attachment: fixed;
		background-size: contain;
		// background-image: linear-gradient(90deg, #e85471, #00aecb);
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
			// background: #fff;
			height: 100%;
			box-sizing: border-box;
			.form {
				padding: 20px;
				width: 480px;
				background: rgba(255, 255, 255, .05);
				transition: background .3s ease-in-out, box-shadow .3s ease-in-out;
				border-radius: 10px;
				box-shadow: 0 0 10px rgba(0, 0, 0, .1);
				// -webkit-backdrop-filter: blur(20px);
				.logo {
					text-align: center;
				}
				.title {
					padding: 30px 0 10px 0;
					text-align: center;
					font-size: 24px;
					color: #fff;
					letter-spacing: 2px;
					line-height: 26px;
					margin-bottom: 20px;
				}
				.ivu-form-item-label {
					color: #fff
				}
				.ivu-input {
					background: rgba(255, 255, 255, .85);
					 -webkit-box-shadow: 0 0 0 1000px white inset;
					&:hover, &:focus {
						background: #fff;
					}
				}
				.ivu-form-item-error-tip {
					color: #ffdddd;
				}
				.button {
					text-align: center;
				}
				&:hover {
					box-shadow: 0 0 10px rgba(0, 0, 0, .3);
					background: rgba(255, 255, 255, .08);
				}
			}
			.line {
				position: relative;
				margin-top: 20px;
				display: flex;
				// justify-content: space-between;
				flex-direction: column;
				align-items: center;
				a {
					color: #fff;
					margin-top: 10px;
					&:hover {
						color: darken(#fff, 10%);
					}
				}
				&:after {
					content: "";
					background-image: url(../../assets/images/HR_gradient_light.png);
					background-size: cover;
					height: 1px;
					width: 100%;
					position: absolute;
					left: 0;
					top: 0;
				}
			}
			.footer {
				position: absolute;
				width: 100%;
				text-align: center;
				bottom: 30px;
				left: 0;
				color: #fff;
			}
		}
	}
</style>
