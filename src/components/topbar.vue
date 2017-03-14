<template>
	<div class="topbar">
		<div class="logo">
			<img src="../assets/toplogo.png" height="20" width="98" alt="彩虹云直播">
			<div class="breadcrumb">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item
						v-for="item of breadcrumb"
						:key="item.name"
						:to="{ name: item.route, params: $route.params }">
						{{ item.name }}
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="user">
			<menu class="menu">
				<img :src="user.avatar" class="avatar">
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
						<li><router-link :to="{ name: 'profile', query: { redirect: $route.fullPath } }"><i class="iconfont icon-video"></i>账号设置</router-link></li>
						<li><a @click="switchShop" href="javascript:;"><i class="iconfont icon-video"></i>切换频道</a></li>
						<li><a @click="logout" href="javascript:;"><i class="iconfont icon-video"></i>退出系统</a></li>
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
			}),
			breadcrumb () {
				let breadcrumb = [
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
					{ route: this.$route.name, name: '测试面包' },
				];
				if (this.$route.meta.breadcrumb) {
					breadcrumb = this.$route.meta.breadcrumb;
				}
				return breadcrumb
			}
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
			padding: 0;
			height: 50px;
			z-index: 1;
			cursor: pointer;
			display: flex;
			align-items: center;
			position: relative;
			transition: all .3s ease-in-out;
			&:hover {
				background: #00C1DE;
				.popper {
					visibility: visible;
					opacity: 1;
				}
			}
			.avatar {
				text-align: left;
				height: 30px;
				width: 30px;
				padding: 0 10px;
				border-radius: 50%;
			}
			.name {
				width: 150px;
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
				// width: 100%;
				width: 200px;
				transition: visibility .3s, opacity .3s;
				.popper__account {
					text-align: center;
				}
				.popper__menu {
					li {
						transition: background .3s ease-in-out;
						text-align: center;
						// padding-left: 50px;
						box-sizing: border-box;
						a {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 10px 0;
							color: white;
							i {
								width: 50px;
								display: inline-block;
							}
						}
						&:hover {
							background: #00C1DE;
						}
					}
				}
			}
		}
	}
</style>

<style lang="less">
	.breadcrumb {
		.el-breadcrumb__item .el-breadcrumb__item__inner {
			color: darken(white, 30%);
		}
		.el-breadcrumb__item:last-child .el-breadcrumb__item__inner {
			color: darken(white, 10%);
		}
	}
</style>













