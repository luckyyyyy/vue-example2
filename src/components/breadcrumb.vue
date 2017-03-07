<template>
	<div>
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					v-for="item of breadcrumb"
					:key="item.name"
					:to="{ name: item.route, params: $route.params }">
					{{ item.name }}
				</el-breadcrumb-item>
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
		padding: 15px 0;
		padding-left: 30px;
		background: #fff;
		border-bottom: 1px solid #EBECF0;
		// box-sizing: border-box;
	}
	.commoon-router-view {
		flex: 1;
		background: #fff;
		// height: 100%;
		// margin-bottom: 15px;
		// box-sizing: border-box;
	}
</style>
