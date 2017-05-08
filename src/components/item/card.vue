<template>
	<div class="card">
		<div class="card-header">
			<slot name="title" >这是标题</slot>
		</div>
		<div class="card-body">
			<slot>这是内容</slot>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
	}
</script>

<style scoped lang="less">
.card {
	margin-bottom: 25px;
	width: 100%;
	border-radius: 8px;
	background-color: #ffffff;
	overflow: hidden;
	.card-header {
		display: flex;
		align-items: center;
		padding: 11px 27px 9px;
		border-bottom: 2px solid #f2f3f7;
		color: #1f212f;

		&:before {
			content: '';
			display: inline-block;
			margin-right: 10px;
			height: 10px;
			width: 10px;
			border-radius: 50%;
			background-color: #31bedb;
		}
	}
	.card-body {
		padding: 20px 27px;
	}
	.text-bold {
		font-weight: 500;
		color: #4a4a4a;
	}
	.link {
		margin-left: 15px;
		font-weight: normal;
	}
}
</style>
