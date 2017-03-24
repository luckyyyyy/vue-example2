<template>
	<div class="wrap">
		<transition v-if="member.token" name="fade" mode="out-in">
			<div class="main">
				<router-view name="topbar"></router-view>
				<router-view name="sidebar"></router-view>
				<router-view name="main" class="router-view"></router-view>
				<router-view name="home"></router-view>
			</div>
		</transition>
		<transition v-else name="fade" mode="out-in">
			<router-view name="user"></router-view>
		</transition>
	</div>
</template>
<script>
	import store from './store'
	import { mapActions, mapGetters, mapState } from 'vuex'
	export default {
		computed: {
			...mapGetters('user', [ 'member' ]),
			...mapState('user', [ 'token' ])
		},
		mounted () {
			this.checkLogin();
		},
		methods: {
			...mapActions('user', {
				checkLogin: 'USER_LOGIN'
			}),
		}
	}
</script>

<style lang="less" scoped>
	.main {
		z-index: 99;
		.router-view {
			box-sizing: border-box;
			display: flex;
			padding-left: 140px;
			box-sizing: border-box;
			position: absolute;
			width: 100%;
			top: 46px;
			bottom: 0px;
			min-height: 650px;
		}
	}
</style>
