<template>
	<div>
		<router-view class="commoon"></router-view>
		<div class="help">
			<!-- 测试 -->
		</div>
	</div>
</template>

<style scoped lang="less">
	.commoon {
		flex: 1;
		background: #fff;
	}
	@media (max-width: 1600px) {
		.help {
			background: #fff;
			display: none;
		}
	}
</style>
