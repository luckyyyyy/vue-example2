<template>
	<Poptip placement="bottom-end" width="200" v-model="visible" class="confirmPopover">
		<template slot="content">
			<div class="body">
				<Icon type="help-circled"></Icon>
				<slot name="tips"></slot>
			</div>
			<div class="button">
				<iButton type="text" @click="onConfirm(false)">取消</iButton>
				<iButton type="primary" @click="onConfirm(true)">确定</iButton>
			</div>
		</template>
		<slot name="reference"></slot>
	</Poptip>
</template>

<script>
	export default {
		data () {
			return {
				visible: false,
			}
		},
		methods: {
			onConfirm (confirm) {
				confirm ? this.$emit('ok') : this.$emit('cancel');
				this.visible = false;
			},
		},
	}
</script>

<style lang="less">
	.confirmPopover {
		.ivu-poptip-body-content {
			color: #333;
			min-height: 80px; // 设计稿为准
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.body {
				flex: 1;
				display: flex;
				// flex-wrap: wrap;
				align-items: center;
				white-space: normal;
				// justify-content: center;
				i {
					color: red;
					font-size: 20px;
					padding-right: 10px;
				}
			}
			.button {
				text-align: right;
			}
		}
	}
</style>
