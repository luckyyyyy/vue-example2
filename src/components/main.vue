<template>
	<div>
		<router-view class="commoon"></router-view>
		<div class="help">
			<!-- 测试 -->
		</div>
	</div>
</template>

<script>
	import store from '../store'
	const record = {};
	const verifyRoute = (to, from, next) => {
		if (to.params.liveid) {
			if (record.liveid == to.params.liveid) {
				return next();
			}
			store.dispatch('LIVE_QUERY_REQUEST', { id: to.params.liveid }).then(res => {
				if (res.retCode == 0) {
					record.liveid = to.params.liveid;
					next();
				} else {
					next(false);
				}
			}).catch(err => {
				// 404 403
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
	.commoon {
		flex: 1;
		background: #fff;
	}
	@media (max-width: 1600px) {
		.help {
			background: #fff;
			display: none;
		}
	}
</style>
