<template>
	<div>
		<router-view name="sidebar"></router-view>
		<router-view class="router-view" name="main"></router-view>
		<router-view name="select"></router-view>
		<router-view name="user"></router-view>
	</div>
</template>

<script>
export default {
	computed: {
	},
	beforeCreate () {
		this.$store.dispatch('SELECT_SHOP');
	},
	mounted () {

	},
}
</script>

<style lang="less" scoped>
	.router-view {
		padding: 15px;
		right: 0;
		top: 0;
		width: 100%;
		padding-left: 15 + 135px;
		background: #f2f3f7;
		position: absolute;
		min-height: 100%;
		height: auto;
		box-sizing: border-box;
	}
	.main-page {
		min-height: 100%;
	}
</style>











