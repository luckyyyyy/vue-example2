<template>
	<div id="app">
		<transition v-if="user" name="fade" mode="out-in">
			<div class="main">
				<template v-if="channel">
					<router-view name="topbar"></router-view>
					<router-view name="sidebar"></router-view>
					<router-view name="main" class="router-view"></router-view>
				</template>
				<router-view name="home"></router-view>
			</div>
		</transition>
		<transition v-else name="fade" mode="out-in">
			<router-view name="user"></router-view>
		</transition>
	</div>
</template>
<script>
	import { mapGetters, mapState } from 'vuex'
	export default {
		computed: {
			...mapGetters('user', [ 'user' ]),
			...mapGetters('channel', [ 'channel' ]),
			// ...mapState('user', ['user'])
		},
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
			min-height: 600px;
		}
	}
</style>
