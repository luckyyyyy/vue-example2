<template>
	<div class="page">
		<div class="title">
			<router-link tag="div" :to="{ name: 'index' }" title="返回首页">
				<div class="left">
					<img src="../../assets/logo2.png" height="28" width="39" alt="彩虹云直播">
					<h1>彩虹云直播</h1>
					<h2>{{ name }}</h2>
				</div>
			</router-link>
			<div class="right">
				<span class="text">账号：{{ user.nickname || user.phone }}</span>
				<div class="button">
					<router-link :to="{ name: 'profile' }">设置</router-link>
					<a href="javascript:;" @click="sign_out">退出</a>
				</div>
			</div>
		</div>
		<router-view class="box"></router-view>
		<div class="footer">© rainbowbr.cn</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		computed: {
			...mapState({
				user: state => state.user
			}),
			name () {
				return this.$route.meta.name;
			}
		},
		methods: {
			sign_out () {
				this.$store.dispatch('LOGOUT_REQUEST');
			}
		}
	}
</script>

<style lang="less" scoped>
	.page {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		height: 100%;
		width: 760px;

		.title {
			width: 100%;
			margin-bottom: 30px;
			margin-top: 50px;
			display: flex;
			justify-content: space-between;
			.router-link-active {
				cursor: pointer;
			}
			.left {
				display: flex;
				align-items: center;
				line-height: 30px;
				img {
					margin-right: 10px;
				}
				h1 {
					border-right: 1px solid #C7C7C7;
					padding-right: 10px;
					margin-right: 10px;
				}
			}
			.right {
				line-height: 30px;
				display: flex;
				align-items: center;
				a {
					margin-left: 5px;
				}
			}
		}
		.box {
			height: 500px;
			width: 100%;
			box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
			border: solid 1px #d3dce6;
			position: relative;
		}
		.footer {
			margin: 10px 0;
			color: #aaa;
		}
	}
</style>
