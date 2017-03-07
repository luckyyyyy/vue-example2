<template>
	<div class="topbar">
		<div class="logo">
			<img src="../assets/logo2.png" height="28" width="39">
			<span>彩虹云直播商户后台 Build 20170308</span>
		</div>
		<div class="user">
			<menu class="menu">
				<img :src="user.avatar" class="avatar">
				<span class="name">
					{{ user.nickName || user.phone }}
					<i class="el-icon-caret-bottom"></i>
				</span>
				<div class="popper">
					<div class="popper__account">
						<p v-show="user.nickName">{{ user.nickName }}</p>
						<p>{{ user.phone }}</p>
					</div>
					<ul class="popper__menu">
						<li><router-link :to="{ name: 'profile', query: { redirect: $route.fullPath } }">账号设置</router-link></li>
						<li><a @click="switchShop" href="javascript:;">切换频道</a></li>
						<li><a @click="logout" href="javascript:;">退出系统</a></li>
					</ul>
				</div>
			</menu>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			logout () {
				this.$confirm('确定退出系统么?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('LOGOUT_REQUEST');
				})
			},
			switchShop () {
				this.$confirm('确定切换频道么?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.commit('SET_CHANNEL');
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.topbar {
		position: fixed;
		width: 100%;
		height: 50px;
		background: #373d41;
		z-index: 223;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		color: #fff;
		.logo {
			display: flex;
			align-items: center;
			img {
				padding: 0 20px;
			}
		}
		.menu {
			margin: 0;
			padding: 0 20px;
			height: 50px;
			z-index: 1;
			cursor: pointer;
			display: flex;
			align-items: center;
			position: relative;
			width: 150px;
			transition: all .3s ease-in-out;
			&:hover {
				background: darken(#373d41, 10%);
				.popper {
					visibility: visible;
					opacity: 1;
				}
			}
			.avatar {
				height: 30px;
				width: 30px;
				border-radius: 50%;
			}
			.name {
				padding-left: 20px;
				display: inline-block;
				text-align: center;
				flex: 1;
			}
			.popper {
				visibility: hidden;
				opacity: 0;
				cursor: default;
				position: absolute;
				right: 0;
				top: 50px;
				background: darken(#373d41, 10%);;
				width: 100%;
				transition: visibility .3s, opacity .3s;
				.popper__account {
					text-align: center;
				}
				.popper__menu {
					li {
						transition: background .3s ease-in-out;
						text-align: center;
						a {
							display: inline-block;
							width: 100%;
							padding: 10px 0;
							color: white;
						}
						&:hover {
							background: #373d41;
						}
					}
				}
			}
		}
	}
</style>















