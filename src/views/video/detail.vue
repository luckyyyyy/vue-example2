<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-menu :default-active="select" @select="onSelect">
					<li class="title">
						<i class="iconfont icon-video"></i>直播装修
					</li>
					<el-menu-item index="video_detail_image">直播引导图</el-menu-item>
					<el-menu-item index="video_detail_share">分享设置</el-menu-item>
					<el-menu-item index="video_detail_setting">直播间设置</el-menu-item>
					<li class="title">
						<i class="iconfont icon-video"></i>互动设置
					</li>
<!-- 					<el-menu-item index="live_detail_livebuy">边看边买</el-menu-item>
					<el-menu-item index="live_detail_liveshop">宝贝上屏</el-menu-item>
					<el-menu-item index="live_detail_luckydraw">抽奖</el-menu-item> -->
					<!-- <el-menu-item index="live_detail_watch">关注观看</el-menu-item> -->
					<el-menu-item index="video_detail_authorize">授权观看</el-menu-item>
					<li class="title">
						<i class="iconfont icon-video"></i>视频管理
					</li>
					<el-menu-item index="video_detail_play">回放视频</el-menu-item>

				</el-menu>
			</div>
		</div>
		<transition name="el-fade-in-linear" mode="out-in">
			<router-view class="commoon-view"></router-view>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		computed: {
			select () {
				return this.$route.name;
			}
		},
		methods: {
			onSelect (val) {
				this.$router.push({ name: val, params: this.$route.params })
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/live/detail";
</style>
