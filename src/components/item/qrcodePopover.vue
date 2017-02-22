<template>
	<el-popover @show="onShow" popper-class="qrcode-wrapper" placement="top" width="240">
		<div class="qrcode-box">
			<slot name="tips"></slot>
			<div ref="qrcode" class="qr"></div>
			<div class="clipboard">
				<el-input :value="text" :disabled="true" size="small"></el-input>
				<el-button @success="handleSuccess" size="small" v-clipboard="text">复制</el-button>
			</div>
		</div>
		<template slot="reference"><slot name="reference"></slot></template>
	</el-popover>
</template>

<script>
	import qrcodejs from 'qrcodejs2'
	export default {
		props: {
			text: '',
		},
		computed: {
			// text () {
			// 	return this.text;
			// }
		},
		mounted () {

		},
		methods: {
			handleSuccess () {
				this.$message({
					 message: '复制成功',
					 type: 'success'
				})
			},
			onShow () {
				if (this.qrcode) {
					this.qrcode.makeCode(this.text);
				} else {
					this.qrcode = new qrcodejs(this.$refs.qrcode, {
						text: this.text,
						width: 120,
						height: 120,
						colorDark : "#000000",
						colorLight : "#ffffff",
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.qrcode-wrapper {
		margin: 0;
		// padding: 20px;
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
			}
			.clipboard {
				width: 100%;
				display: flex;
				margin: 5px;
				.el-button {
					margin-left: 5px;
				}
			}
		}
	}
</style>