<template>
	<div class="commoon-menu-view">
		<Affix>
			<div class="commoon-menu">
				<div class="box">
					<el-radio-group v-model="select">
						<div class="title">
							<i class="iconfont icon-video"></i>电商设置
						</div>
						<el-radio-button label="store_setting_pay">支付设置</el-radio-button>
						<el-radio-button label="store_setting_order">订单设置</el-radio-button>
						<el-radio-button label="store_setting_logistics">物流设置</el-radio-button>
						<el-radio-button label="store_setting_address">地址库</el-radio-button>
					</el-radio-group>
				</div>
			</div>
		</Affix>
		<router-view class="commoon-view"></router-view>
	</div>
</template>

<script>
	import Affix from '../../components/item/affix.vue'
	export default {
		components: {
			Affix
		},
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

		}
	}
</script>


<style scoped lang="less">
	// .commoon-view {

</style>


