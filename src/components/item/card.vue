<template>
	<div class="card">
		<div class="card__header">
			<slot name="title" >标题</slot>
		</div>
		<div class="card__body">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="less">
	.card {
		width: 100%;
		border-radius: 8px;
		background-color: #ffffff;
		overflow: hidden;
		margin-bottom: 25px;
		&__header {
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
		&__body {
			padding: 20px 27px;
		}
		&:last-of-type {
			margin-bottom: 0;
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
