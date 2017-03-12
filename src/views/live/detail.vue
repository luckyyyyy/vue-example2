<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-radio-group v-model="select">
					<div class="title">
						<i class="iconfont icon-video"></i>直播装修
					</div>
					<el-radio-button label="live_detail_countdown">直播倒计时</el-radio-button>
					<el-radio-button label="live_detail_image">直播引导图</el-radio-button>
					<el-radio-button label="live_detail_share">分享设置</el-radio-button>
					<div class="line"></div>
					<div class="title">
						<i class="iconfont icon-video"></i>互动设置
					</div>
					<el-radio-button label="live_detail_livebuy">边看边买</el-radio-button>
					<el-radio-button label="live_detail_liveshop">宝贝上屏</el-radio-button>
					<el-radio-button label="live_detail_luckydraw">抽奖</el-radio-button>
					<el-radio-button label="live_detail_follow">关注观看</el-radio-button>
					<el-radio-button label="live_detail_authorize">授权观看</el-radio-button>
				</el-radio-group>
				<div class="button">
					<el-button @click="goData">直播数据</el-button>
					<el-button @click="toControl">中控台</el-button>
				</div>
			</div>
		</div>
		<router-view class="commoon-view"></router-view>
	</div>
</template>

<script>
	export default {
		computed: {
			select: {
				get () {
					return this.$route.name;
				},
				set (val) {
					this.$router.push({ name: val, params: this.$route.params })
				}
			}
		},
		methods: {
			toControl () {
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
	// .commoon-view {

</style>


