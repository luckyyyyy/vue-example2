<template>
	<div>
		<div class="head">
			<div class="left">
				<img v-if="user.avatar" class="avatar" src="">
				<i v-else class="iconfont icon-morentouxiang"></i>
				<div class="info">
					<span class="name">您好：{{ user.nickName }}</span>
					<div class="account">
						<span class="text">账号：{{ user.phone }}</span>
						<div class="button"></div>
					</div>
				</div>
			</div>
			<div class="create" v-if="list">
				<router-link :to="{ name: 'create_channel' }">创建新频道</router-link>
			</div>
		</div>
		<div class="body">
			<ul class="list" v-if="list">
				<li v-for="item in list" @click="select(item.id)">
					<div class="logo"></div>
					<div class="info">
						<div class="name">{{ item.name }}</div>
						<div class="wechat">公众号：{{ item.alias }}</div>
					</div>
					<div class="button">
						<a href="javascript:;" @click.stop="onDelete(item.id)">删除</a>
					</div>
				</li>
			</ul>
			<div class="empty" v-else>
				<p>您还没有自己的频道</p>
				<el-button type="primary" @click="toCreate">创建频道</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		data () {
			return {
				list: [
					{
						name: '测试',
						alias: '测试',
						id: 123
					}, {
						name: '测试2',
						alias: '测试2',
						id: 444
					}
				]
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			select (id) {
				this.$store.dispatch('SELECT_CHANNEL', id);
			},
			sign_out () {
				this.$store.dispatch('LOGOUT_REQUEST');
			},
			toCreate () {
				this.$router.push({ name: 'create_channel' })
			},
			onDelete (id) {
				console.log(123)
			}
		}
	}
</script>

<style lang="less" scoped>

	.head {
		background: #ebeff5;
		height: 90px;
		display: flex;
		padding: 20px;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
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
</style>
