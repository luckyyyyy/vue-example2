<template>
	<div class="wrap">
		<div v-if="token" class="main">
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
	import logout from './store/modules/user/logout'
	import channel_query from './store/modules/channel/query'
	store.registerModule('channel_query', channel_query);
	store.registerModule('logout', logout);
	export default {
		computed: {
			token () {
				return this.$store.state.token;
			},
		},
		beforeCreate () {
			this.$store.dispatch('LOGIN_CHECK');
			this.$store.dispatch('SELECT_CHANNEL');
		},
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















