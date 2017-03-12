<template>
	<div>
		<router-view class="commoon-router-view"></router-view>
	</div>
</template>

<script>
	import store from '../store'
	const verifyRoute = (to, from, next) => {
		if (to.params.liveid) {
			store.dispatch('LIVE_QUERY_REQUEST', { id: to.params.liveid }).then(res => {
				next();
			}).catch(err => {
				next({ name: 'index' });
			})
		} else {
			next();
		}
	}
	export default {
		beforeRouteEnter: verifyRoute,
		beforeRouteUpdate: verifyRoute
	}
</script>
<style scoped lang="less">
	.commoon-router-view {
		flex: 1;
		background: #fff;
	}
</style>
