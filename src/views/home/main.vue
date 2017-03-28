<template>
	<div class="wrap">
		<div class="page">
			<div class="head">
				<div class="left">
					<h1 title="彩虹云直播">
						<router-link :to="{ name: 'select_channel' }" title="返回首页">
							<img src="../../assets/logo2.png" height="28" width="39" alt="彩虹云直播">
							彩虹云直播
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
			<div class="footer">© rainbowbr.cn</div>
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
				this.$Modal.confirm({
					title: '提示',
					content: '确定退出系统么？',
					loading: true,
					onOk: () => {
						this.logout().then(() => {
							this.$Modal.remove();
						}).catch(() => {
							this.$Modal.remove();
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		position: absolute;
		height: 100%;
		min-height: 650px;
		width: 100%;
		left: 0;
		top: 0;
		background: #4e546c;
	}
	.page {
		position: relative;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 760px;
		.head {
			border-radius: 8px;
			height: 80px;
			padding: 0 20px;
			background: #fff;
			width: 100%;
			margin-bottom: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.router-link-active {
				cursor: pointer;
			}
			.left {
				display: flex;
				line-height: 30px;
				color: #343647;
				align-items: center;
				// display: flex
				img {
					margin-right: 10px;
				}
				h1, h2 {
					font-weight: normal;
				}
				h1 {
					border-right: 1px solid #C7C7C7;
					padding-right: 10px;
					margin-right: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					a {
						color: #333;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
			.right {
				display: flex;
				.text {
					background: #E5E9F2;
					border-radius: 100px;
					padding: 0 10px;
				}
				a {
					margin-left: 5px;
				}
			}
		}
		.box {
			height: 520px;
			width: 100%;
			// box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
			// border: solid 1px #d3dce6;
			position: relative;
			background: #fff;
			border-radius: 8px;
		}
		.footer {
			margin: 10px 0;
			color: #aaa;
		}
	}
</style>
