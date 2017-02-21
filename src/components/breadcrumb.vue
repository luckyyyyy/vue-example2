<template>
	<div class="commoon-page">
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item v-for="item of breadcrumb" :to="{ name: item.route, params: $route.params }">{{ item.name }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<router-view class="commoon-router-view"></router-view>
	</div>
</template>

<script>
	export default {
		computed: {
			breadcrumb () {
				let breadcrumb = [
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
				];
				if (this.$route.meta.breadcrumb) {
					breadcrumb = this.$route.meta.breadcrumb;
				}
				return breadcrumb
			}
		}
	}
</script>

<style scoped lang="less">
	.breadcrumb {

	}
</style>
