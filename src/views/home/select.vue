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
		<div class="body">
			<Spin size="large" fix v-if="lock"></Spin>
			<template v-if="!lock">
				<div class="channel" v-if="total">
					<Row class="list">
						<iCol span="8" v-for="item in data" class="item" :key="item.channel.channelId">
							<div class="border" @click="select(item.channel.channelId)">
								<div class="logo">
									<img witdh="50" height="50" :src="item.wxAvatarUrl">
								</div>
								<div class="info">
									<div class="name">{{ item.channel.name }}</div>
									<div class="wechat">
										<template v-if="item.channel.status == 2">{{ item.wxAppName }}</template>
										<template v-else><span class="unbind">未绑定公众号</span></template>
									</div>
								</div>
								<iButton @click.stop="onDelete(item.channel)" type="text" class="delete" size="small">删除</iButton>
							</div>
						</iCol>
					</Row>
					<Page v-show="total > limits"
						@on-change="onChange"
						:page-size="limits"
						:current="current"
						:total="total">
					</Page>
				</div>
				<div class="empty" v-else>
					<p>您还没有自己的频道</p>
					<iButton size="large" type="primary" @click="toCreate">创建频道</iButton>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		data () {
			return {
				limits: 9,
				current: 1,
				lock: false,
			}
		},
		computed: {
			...mapState('channel/find', {
				total: state => state.total,
				data: state  => state.data,
			}),
			...mapState('user', [ 'user' ])
		},
		// beforeRouteUpdate (to, from, next) { //待研究
		// 	next();
		// },
		mounted () {
			this.onChange();
		},
		methods: {
			...mapActions('channel/find', {
				getChannel: 'CHANNEL_FIND_REQUEST'
			}),
			...mapActions('channel', {
				selectChannel: 'CHANNEL_SELECT'
			}),
			...mapActions('channel/delete', {
				deleteChannel: 'CHANNEL_DELETE_REQUEST'
			}),
			onChange (currentPage) {
				this.current = currentPage || parseInt(this.$route.params.id) || 1;
				this.$router.push({ name: this.$route.name, params: { id: this.current }, query: this.$route.query })
				const page   = this.current;
				const limits = this.limits;
				this.lock = true;
				this.getChannel({ limits, page }).then(res => {
					this.lock = false;
					if (res.channels.length == 0 && page != 1) {
						this.onChange(1);
					}
				}).catch(() => {
					this.lock = false;
				})
			},
			select (id) {
				this.selectChannel(id);
			},
			toCreate () {
				this.$router.push({ name: 'create_channel' })
			},
			onDelete (channel) {
				this.$Modal.confirm({
					title: '提示',
					content: '您确定删除频道吗？',
					loading: true,
					onOk: () => {
						this.deleteChannel( channel.channelId).then(() => {
							this.onChange();
							this.$Modal.remove();
						})
					}
				});
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
		position: relative;
		height: 410px;
		.channel {
			display: flex;
			// align-items: center;
			// justify-content: space-around;
			flex-direction: column;
			.list {
				display: flex;
				flex-wrap: wrap;
				max-height: 380px;
				padding: 10px;
				.item {
					padding: 5px;
					.border {
						height: 100px;
						padding: 16px;
						border: 1px solid #d3dce6;
						display: flex;
						align-items: center;
						position: relative;
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
							right: 0;
							bottom: 0;
							visibility: hidden;
							color: red;
							&:focus {
								color: darken(red, 10%);
							}
						}
					}
				}
			}
			.ivu-page {
				display: flex;
				justify-content: center;
				position: absolute;
				bottom: 15px;
				padding: 10px;
				width: 100%;
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
