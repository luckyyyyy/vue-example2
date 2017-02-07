<template>
	<div v-if="shop" class="main-page">
		<sidebar></sidebar>
		<router-view class="router-view" name="main"></router-view>
	</div>
	<div v-else class="select-page">
		<div class="select">
			<div class="head">
				<div class="left">
					<img v-if="avatar" class="avatar" src="">
					<i v-else class="iconfont icon-morentouxiang"></i>
					<div class="info">
						<span class="name">{{ user.nickname }}</span>
						<div class="account">
							<span class="text">账号：{{ user.username }}</span>
							<div class="button">
								<!-- <router-link :to="{ name: 'login' }">设置</router-link> -->
								<a href="javascript:;" @click="sign_out">退出</a>
							</div>
						</div>
					</div>
				</div>
				<div class="create" v-if="list">
					<router-link :to="{ name: 'login' }">创建新频道</router-link>
				</div>
			</div>
			<div class="body">
				<ul class="list" v-if="list">
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
					<li>
						<div class="logo"></div>
						<div class="info">
							<div class="name">频道名称</div>
							<div class="wechat">公众号：XXX</div>
						</div>
						<div class="button">
							<a href="">修改</a>
							<a href="">删除</a>
						</div>
					</li>
				</ul>
				<div class="empty" v-else>
					<p>您还没有自己的频道</p>
					<el-button type="primary">创建频道</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// TODO iscroll 解决滚动问题
import sidebar from '../sidebar.vue'
import { mapState } from 'vuex';
export default {
	components: {
		sidebar,
	},
	data () {
		return {
			// list: {}
			shop: 1,
		}
	},
	computed: {
		// ...mapState({
		// 	shop: state => state.shop,
		// 	user: state => state.user
		// })
	},
	mounted () {
		console.log(this.user)
	},
	methods: {
		sign_out () {
			this.$store.dispatch('SIGNOUT_REQUEST');
		}
	}
}
</script>

<style lang="less" scoped>
	.router-view {
		padding: 15px;
		right: 0;
		top: 0;
		width: 100%;
		padding-left: 15 + 135px;
		background: #f2f3f7;
		position: absolute;
		min-height: 100%;
		height: auto;
		box-sizing: border-box;
	}
	.main-page {
		min-height: 100%;
	}
	.select-page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.select {
		height: 500px;
		width: 760px;
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
		border: solid 1px #d3dce6;
		.head {
			background: #ebeff5;
			height: 90px;
			display: flex;
			padding: 20px;
			box-sizing: border-box;
			justify-content: space-between;
			border-bottom: solid 1px #d3dce6;
			.left {
				display: flex;
				.icon-morentouxiang {
					font-size: 45px;
					color: #b7b9c4;
				}
				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					// align-content: space-around;
					.name, .account {
						color: #666666;
						padding: 5px 15px;
					}
					.account {
						.text {
							padding-right: 15px;
						}
						.button {
							display: inline-block;
							a {
								padding: 5px;
							}
						}
					}
				}
			}
			.create {
				 align-self: flex-end;
			}
		}
		.body {
			.list {
				padding: 15px 8px;
				display: flex;
				flex-wrap: wrap;
				height: 380px;
				overflow: auto;
				li {
					width: 230px;
					height: 110px;
					border: 1px solid #d3dce6;
					margin: 8px;
					display: flex;
					padding: 16px;
					box-sizing: border-box;
					cursor: pointer;
					position: relative;
					transition: border .1s ease-in-out;
					.logo {
						width: 50px;
						height: 50px;
						background: #ccc;
					}
					.button {
						position: absolute;
						bottom: 16px;
						right: 16px;
						visibility: hidden;
						a {
							padding-left: 10px;
						}
					}
					.info {
						font-size: 14px;
						color: #666;
						padding-left: 10px;
						line-height: 25px;
					}
					&:hover {
						border-color: #51bfff;
						.button {
							visibility: visible;
						}
					}

				}
			}
			.empty {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 80px;
			}
		}

	}
</style>











