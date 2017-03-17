<template>
	<Poptip placement="bottom" width="240" v-model="visible" class="confirmPopover">
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
			height: 80px; // 设计稿为准
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.body {
				display: flex;
				align-items: center;
				i {
					color: red;
					font-size: 20px;
					padding: 10px;
				}
			}
		}
	}
</style>
