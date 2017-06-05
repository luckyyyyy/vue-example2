<template>
	<div class="wrap">
		<div class="page">
			<div class="head">
				<div class="left">
					<h1 title="彩虹云直播">
						<router-link :to="{ name: 'select_channel' }" title="返回首页">
							<img src="../../assets/images/home/headerLogo.png" height="26" width="143" alt="彩虹云直播">
						</router-link>
					</h1>
					<h2>{{ name }}</h2>
				</div>
				<div class="right">
					<span class="text">{{ user.nickname || user.phone }}</span>
					<a href="javascript:;" @click="submit_logout">退出</a>
				</div>
			</div>
			<router-view class="box"></router-view>
			<!-- <div class="footer">© rainbowbr.cn</div> -->
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		computed: {
			...mapState('user', [ 'user' ]),
			name () {
				return this.$route.meta.name;
			}
		},
		methods: {
			...mapActions('user', {
				logout: 'USER_LOGOUT'
			}),
			submit_logout () {
				this.$confirm('确定退出系统么？', '提示', {
					type: 'warning',
					beforeClose: async (action, instance, done) => {
						try {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								await this.logout();
							}
							instance.confirmButtonLoading = false;
							done();
						} catch(e) {
							instance.confirmButtonLoading = false;
							done();
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
 @import "../../assets/styles/views/home/main.less";
</style>
