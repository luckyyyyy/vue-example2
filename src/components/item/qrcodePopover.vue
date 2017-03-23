<template>
	<Poptip class="qrcode-wrapper" placement="bottom" width="240">
		<template slot="content">
			<div class="qrcode-box">
				<slot name="tips"></slot>
				<div ref="qrcode" class="qr"></div>
				<clipboardInput :text="text"></clipboardInput>
			</div>
		</template>
		<slot name="reference"></slot>
	</Poptip>
</template>

<script>
	import qrcodejs from 'qrcodejs2'
	import clipboardInput from './clipboardInput'
	export default {
		components: {
			clipboardInput
		},
		props: {
			text: String,
		},
		mounted () {
			// 需要优化
			if (this.qrcode) {
				this.qrcode.makeCode(this.text);
			} else {
				this.qrcode = new qrcodejs(this.$refs.qrcode, {
					text: this.text,
					width: 240,
					height: 240,
					// colorDark : "#000000",
					// colorLight : "#ffffff",
				});
			}
		},
	}
</script>

<style lang="less">
	.qrcode-wrapper {
		margin: 0;
		// padding: 20px;
		z-index: 999;
		.qrcode-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			p {
				font-size: 14px;
				color: #666;
				margin: 0;
			}
			.qr {
				background-color: #999;
				width: 120px;
				height: 120px;
				margin: 5px;
				img {
					width: 120px;
					height: 120px;
				}
			}
		}
	}
</style>
