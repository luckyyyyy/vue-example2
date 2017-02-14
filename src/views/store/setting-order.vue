<template>
	<div class="view">
		<div><span>拍下未付款</span> <el-input size="small" v-model="input"></el-input> <span>分钟内未付款，自动取消该订单。</span></div>
		<el-button type="primary">保存</el-button>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		data () {
			return {
				input: 80
			}
		},
		mounted () {
		},
		methods: {
			switchChange (enabled) {

			},
		}
	}
</script>

<style scoped lang="less">
	.view {
		.el-input {
			width: 40px;
		}
		.el-button {
			margin-top: 30px;
		}
	}
</style>
