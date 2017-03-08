<template>
	<el-popover @show="onShow" popper-class="qrcode-wrapper" placement="top" width="240">
		<div class="qrcode-box">
			<slot name="tips"></slot>
			<div ref="qrcode" class="qr"></div>
			<div class="clipboard">
				<el-input :value="text" :disabled="true" size="small"></el-input>
				<el-button @error="handleError" @success="handleSuccess" size="small" v-clipboard="text">复制</el-button>
			</div>
		</div>
		<template slot="reference"><slot name="reference"></slot></template>
	</el-popover>
</template>

<script>
	import qrcodejs from 'qrcodejs2'
	import Vue from 'vue'
	import Clipboard from 'clipboard';
	Vue.directive(
		'clipboard',
		{
			bind(el, binding, vnode, oldVnode) {
				const clipboard = new Clipboard(el, {
					text: () => binding.value
				});
				clipboard.on('success', function(e) {
					vnode.child.$emit('success', e);
				});
				clipboard.on('error', function(e) {
					vnode.child.$emit('error', e);
				});
			}
		}
	);
	export default {
		props: {
			text: String,
		},
		methods: {
			handleSuccess (e) {
				this.$message({
					 message: '复制成功',
					 type: 'success'
				})
			},
			handleError (e) {
				this.$message({
					 message: '复制失败，您的浏览器不支持，请手动复制。',
					 type: 'error'
				})
			},
			onShow () {
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
				img {
					width: 120px;
					height: 120px;
				}
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
