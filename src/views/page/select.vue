<template>
	<div>
		<div class="head">
			<div class="left">
				<img class="avatar" :src="user.avatar">
				<div class="info">
					<span class="name">您好：{{ user.nickName }}</span>
					<div class="account">
						<span class="text">账号：{{ user.phone }}</span>
						<div class="button"></div>
					</div>
				</div>
			</div>
			<div class="create">
				<router-link :to="{ name: 'create_channel' }">创建新频道</router-link>
			</div>
		</div>
		<div class="body" v-loading="lock" element-loading-text="正在获取频道列表">
			<template v-if="!lock">
				<div class="channel" v-if="total">
					<ul class="list">
						<li v-for="item in data" @click="select(item.channel.channelId)">
							<div class="logo">
								<img witdh="50" height="50" :src="item.wxAvatarUrl">
							</div>
							<div class="info">
								<div class="name">{{ item.channel.name }}</div>
								<div class="wechat">公众号：
									<template v-if="item.channel.status == 2">{{ item.wxAppName }}</template>
									<template v-else><span class="unbind">未绑定</span></template>
								</div>
							</div>
							<el-button :loading="lock_del" @click.stop="onDelete(item.channel)" type="text" class="delete">删除</el-button>
						</li>
					</ul>
					<el-pagination v-show="total > limits"
						@current-change="currentChange"
						:current-page="current"
						layout="prev, pager, next"
						:total="total">
					</el-pagination>
				</div>
				<div class="empty" v-else>
					<p>您还没有自己的频道</p>
					<el-button type="primary" @click="toCreate">创建频道</el-button>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		data () {
			return {
				limits: 9,
				current: 1,
			}
		},
		computed: {
			...mapState({
				user: state  => state.user,
				total: state => state.channel_find.total,
				data: state  => state.channel_find.data,
				lock: state  => state.channel_find.lock,
				lock_del: state => state.channel_delete.lock,
			}),

		},
		mounted () {
			this.currentChange();
		},
		methods: {
			currentChange (currentPage) {
				const page   = currentPage || parseInt(this.$route.params.id) || this.current;
				const limits = this.limits;
				this.current = page;
				this.$router.push({ name: this.$route.name, params: { id: page }, query: this.$route.query })
				this.$store.dispatch('CHANNEL_FIND_REQUEST', { limits, page });

			},
			select (id) {
				this.$store.dispatch('SELECT_CHANNEL', id);
			},
			sign_out () {
				this.$store.dispatch('LOGOUT_REQUEST');
			},
			toCreate () {
				this.$router.push({ name: 'create_channel' })
			},
			onDelete (channel) {
				this.$prompt('请输入您的频道名来确认删除操作', '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					inputPattern: eval(`/^${channel.name}$/`),
					inputErrorMessage: '邮箱格式不正确'
				}).then(() => {
					this.$store.dispatch('CHANNEL_DELETE_REQUEST', channel.channelId).then(() => {
						this.currentChange();
					})
				})
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
			align-items: center;
			.icon-morentouxiang {
				font-size: 45px;
				color: #b7b9c4;
			}
			.avatar {
				width: 50px;
				height: 50px;
				border-radius: 50%;
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
		height: 410px;
		.channel {
			display: flex;
			align-items: center;
			// justify-content: space-around;
			flex-direction: column;
			box-sizing: border-box;
			.list {
				display: flex;
				flex-wrap: wrap;
				max-height: 380px;
				// overflow: auto;
				// align-items: center;
				// justify-content: space-around;
				li {
					width: 225px;
					height: 100px;
					border: 1px solid #d3dce6;
					margin: 10px 14px;
					display: flex;
					align-items: center;
					position: relative;
					padding: 16px;
					box-sizing: border-box;
					cursor: pointer;
					transition: border .1s ease-in-out;
					.logo {
						width: 50px;
						height: 50px;
						background: #ccc;
					}
					.unbind {
						color: #ff5520;
					}
					.info {
						font-size: 14px;
						color: #666;
						padding-left: 10px;
						line-height: 25px;
					}
					&:hover {
						border-color: #51bfff;
						.delete {
							visibility: visible;
						}
					}
					.delete {
						position: absolute;
						right: 10px;
						bottom: 0;
						visibility: hidden;
					}
				}
			}
			.el-pagination {
				position: absolute;
				bottom: 8px;
				padding: 10px;
			}
		}
		.empty {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 80px;
			p {
				margin-bottom: 10px;
			}
		}
	}
</style>
