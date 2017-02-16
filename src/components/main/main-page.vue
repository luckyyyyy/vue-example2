<template>
	<div v-if="shop != 0" class="main-page">
		<sidebar></sidebar>
		<router-view class="router-view" name="main"></router-view>
	</div>
	<div v-else>
		<router-view name="select"></router-view>
	</div>
</template>

<script>
// TODO iscroll 解决滚动问题
import sidebar from '../sidebar.vue'
import { mapState } from 'vuex';
export default {
	components: {
		sidebar,
	},
	computed: {
		...mapState({
			user: state => state.user
		}),
		shop () {
			const requiresAuth = this.$route.meta.requiresAuth;
			if (requiresAuth) {
				if (this.$store.state.shop > 0) {
					if (this.$route.meta.group == 'select') {
						if (this.$route.query.redirect) {
							this.$router.push({ path: this.$route.query.redirect })
						} else {
							this.$router.push({ name: 'index' })
						}
					}
				} else {
					if (this.$route.meta.group != 'select') {
						this.$router.push({ name: 'select_shop', query: { redirect: this.$route.fullPath } });
					}
				}
			}
			return this.$store.state.shop;
		}
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











