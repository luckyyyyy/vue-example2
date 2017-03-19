<template>
	<div class="wrap">
		<div v-if="member.token" class="main">
			<router-view name="topbar"></router-view>
			<router-view name="sidebar"></router-view>
			<router-view name="main" class="router-view"></router-view>
			<router-view name="home"></router-view>
		</div>
		<router-view v-else name="user"></router-view>
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
			this.checkChannel();
		},
		methods: {
			...mapActions('user', {
				checkLogin: 'USER_LOGIN'
			}),
			...mapActions('channel', {
				checkChannel: 'CHANNEL_CHECK'
			})
		}
	}
</script>

<style lang="less" scoped>
	.main {
		z-index: 99;
		.router-view {
			box-sizing: border-box;
			display: flex;
			padding-left: 135px;
			box-sizing: border-box;
		    position: absolute;
		    width: 100%;
		    top: 50px;
		    bottom: 0px;
		    background-color: #000;
		}
	}
</style>















