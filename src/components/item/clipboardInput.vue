<template>
	<div class="clipboard">
		<el-input :value="text" :readonly="true" size="small">
			<el-button slot="append" @error="handleError" @success="handleSuccess" size="small" v-clipboard="text">
				<slot>复制</slot>
			</el-button>
		</el-input>

	</div>
</template>

<script>
	import Clipboard from 'clipboard'

	export default {
		directives: {
			clipboard: {
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
		},
		props: {
			text: String,
		},
		methods: {
			handleSuccess (e) {
				this.$message.success('复制成功');
			},
			handleError (e) {
				this.$message.error('您的浏览器不支持自动复制，请连续点击三下左边的输入框按ctrl+c手动复制。', 5);
			}
		}
	}
</script>

<style lang="less" scoped>
	.clipboard {
		display: flex;
		margin: 5px;
		justify-content: space-between;
		align-items: center;
		.ivu-btn {
			margin-left: 5px;
		}
	}
</style>
