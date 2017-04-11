<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<Menu :activeName="select" @on-select="onSelect" width="135px">
					<li class="title">
						<i class="iconfont icon-video"></i>直播装修
					</li>
					<MenuItem name="video_detail_image">直播引导图</MenuItem>
					<MenuItem name="video_detail_share">分享设置</MenuItem>
					<MenuItem name="video_detail_setting">直播间设置</MenuItem>
					<li class="title">
						<i class="iconfont icon-video"></i>互动设置
					</li>
<!-- 					<MenuItem name="live_detail_livebuy">边看边买</MenuItem>
					<MenuItem name="live_detail_liveshop">宝贝上屏</MenuItem>
					<MenuItem name="live_detail_luckydraw">抽奖</MenuItem> -->
					<!-- <MenuItem name="live_detail_watch">关注观看</MenuItem> -->
					<MenuItem name="video_detail_authorize">授权观看</MenuItem>
				</Menu>
				<div class="button">
    				<iButton @click="goData" type="primary" class="menu-btn">直播数据</iButton>
    				<iButton @click="goControl" type="primary" class="menu-btn">中控台</iButton>
				</div>
			</div>
		</div>
		<transition name="fade" mode="out-in">
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
		mounted() {
		},
		methods: {
			onSelect (val) {
				this.$router.push({ name: val, params: this.$route.params })
			},
			goControl () {
				const uri = `/live/control/${this.$route.params.liveid}`
				window.open(uri)
			},
			goData () {
				const uri = `/live/data/${this.$route.params.liveid}`
				window.open(uri)
			}
		}
	}
</script>


<style scoped lang="less">
	@import "../../assets/styles/views/live/detail";
</style>
