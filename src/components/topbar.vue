<template>
	<div class="topbar">
		<div class="left">
			<div class="logo">
				<img src="../assets/toplogo.png" height="20" width="100" alt="彩虹云直播">
			</div>
			<div class="breadcrumb">
				{{ channel.name }} - 彩虹云直播 alpha Build 20170330
<!-- 			<el-breadcrumb separator="/">
					<el-breadcrumb-item
						v-for="item of breadcrumb"
						:key="item.name"
						:to="{ name: item.route, params: $route.params }">
						{{ item.name }}
					</el-breadcrumb-item>
				</el-breadcrumb> -->
			</div>
		</div>
		<div class="user">
			<menu class="menu">
				<img :src="user.avatar + '/avatar'" class="avatar">
				<span class="name">
					{{ user.nickName || user.phone }}
					<!-- <i class="el-icon-caret-bottom"></i> -->
				</span>
				<div class="popper">
				<!-- 	<div class="popper__account">
						<p v-show="user.nickName">{{ user.nickName }}</p>
						<p>{{ user.phone }}</p>
					</div> -->
					<ul class="popper__menu">
						<li><router-link :to="{ name: 'profile', query: { redirect: $route.fullPath } }"><i class="iconfont icon-userSetting"></i>账号设置</router-link></li>
						<li><a @click="switchShop" href="javascript:;"><i class="iconfont icon-change"></i>切换频道</a></li>
						<li><a @click="submit_logout" href="javascript:;"><i class="iconfont icon-signOut"></i>退出系统</a></li>
					</ul>
				</div>
				<span class="icon"></span>
			</menu>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		computed: {
			...mapState('user', [ 'user' ]),
			...mapState('channel', ['channel'])
			// breadcrumb () {
			// 	let breadcrumb = [
			// 		{ route: this.$route.name, name: '测试面包' },
			// 		{ route: this.$route.name, name: '测试面包' },
			// 		{ route: this.$route.name, name: '测试面包' },
			// 		{ route: this.$route.name, name: '测试面包' },
			// 		{ route: this.$route.name, name: '测试面包' },
			// 	];
			// 	if (this.$route.meta.breadcrumb) {
			// 		breadcrumb = this.$route.meta.breadcrumb;
			// 	}
			// 	return breadcrumb
			// }
		},
		methods: {
			...mapActions('user', {
				logout: 'USER_LOGOUT'
			}),
			...mapActions('channel', {
				clearChannel: 'CHANNEL_SELECT'
			}),
			submit_logout () {
				this.$Modal.confirm({
					title: '提示',
					content: '确定退出系统么？',
					loading: true,
					onOk: () => {
						this.logout().then(() => {
							this.$Modal.remove();
						})
					}
				})
			},
			switchShop () {
				this.$Modal.confirm({
					title: '提示',
					content: '确定切换频道么？',
					onOk: () => {
						this.clearChannel();
					}
				})
			},
		}
	}
</script>

<style scoped lang="less">
	@import "../assets/styles/topbar.less";
</style>

<style lang="less">
	// .breadcrumb {
	// 	.el-breadcrumb__item .el-breadcrumb__item__inner {
	// 		color: darken(white, 30%);
	// 	}
	// 	.el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
	// 		color: darken(white, 10%);
	// 	}
	// }
</style>













