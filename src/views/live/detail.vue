<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-menu :default-active="select" @select="onSelect">
					<li class="title">
						<i class="iconfont icon-video"></i>直播装修
					</li>
					<el-menu-item index="live_detail_countdown">直播倒计时</el-menu-item>
					<el-menu-item index="live_detail_image">直播引导图</el-menu-item>
					<el-menu-item index="live_detail_share">分享设置</el-menu-item>
					<el-menu-item index="live_detail_setting">直播间设置</el-menu-item>
					<li class="title">
						<i class="iconfont icon-video"></i>互动设置
					</li>
<!-- 					<el-menu-item index="live_detail_livebuy">边看边买</el-menu-item>
					<el-menu-item index="live_detail_liveshop">宝贝上屏</el-menu-item>
					<el-menu-item index="live_detail_luckydraw">抽奖</el-menu-item> -->
					<!-- <el-menu-item index="live_detail_watch">关注观看</el-menu-item> -->
					<el-menu-item index="live_detail_authorize">授权观看</el-menu-item>
				</el-menu>
				<div class="button">
					<router-link :to="{ name: 'live_data', params: { liveid: $route.params.liveid } }" target="_blank">
    					<el-button type="primary" class="menu-btn">直播数据</el-button>
    				</router-link>
    				<router-link :to="{ name: 'live_control', params: { liveid: $route.params.liveid } }" target="_blank">
    					<el-button type="primary" class="menu-btn">中控台</el-button>
    				</router-link>
				</div>
			</div>
		</div>
		<transition name="fade" mode="out-in">
			<router-view class="commoon-view"></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		computed: {
			select () {
				return this.$route.name;
			}
		},
		methods: {
			onSelect (val) {
				this.$router.push({ name: val, params: this.$route.params })
			},
		}
	}
</script>


<style scoped lang="less">
	@import "../../assets/styles/views/live/detail";
</style>
