<template>
	<div class="commoon-page">
		<div class="breadcrumb">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<router-view class="commoon-router-view"></router-view>
	</div>
</template>


<style scoped lang="less">
	.breadcrumb {

	}
</style>
