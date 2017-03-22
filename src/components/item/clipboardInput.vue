<template>
	<div class="clipboard">
		<iInput :value="text" icon="ios-copy-outline" :readonly="true" size="small"></iInput>
		<iButton @error="handleError" @success="handleSuccess" size="small" v-clipboard="text"><slot>复制</slot></iButton>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Clipboard from 'clipboard';
	Vue.directive(
		'clipboard', {
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
				this.$Message.success('复制成功');
			},
			handleError (e) {
				this.$Message.error('您的浏览器不支持自动复制，请连续点击三下左边的输入框按ctrl+c手动复制。', 5);
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
