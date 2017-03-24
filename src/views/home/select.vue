<template>
	<div>
		<header class="header">
			<div class="left">
				<img class="avatar" :src="user.avatar">
				<div class="info">
					<span class="name">您好：{{ user.nickName }}</span>
					<div class="account">
						<span class="text">账号：{{ user.phone }}</span>
						<router-link :to="{ name: 'profile' }">设置</router-link>
					</div>
				</div>
			</div>
			<div class="create">
				<router-link :to="{ name: 'create_channel' }">
					<iButton type="primary">创建新频道</iButton>
				</router-link>
			</div>
		</header>
		<div class="body">
			<Spin size="large" fix v-if="lock"></Spin>
			<template v-if="!lock">
				<div class="channel" v-if="total">
					<Row class="list">
						<iCol span="8" v-for="item in data" class="item" :key="item.channelId">
							<div class="border" @click="select(item.channelId)">
								<div class="head">
									<span>{{ item.name }}</span>
									<Icon @click.native.stop="onDelete(item)" :size="20" type="android-delete"></Icon>
								</div>
								<div class="info">
									<div class="logo">
										<img witdh="50" height="50" :src="item.wxAvatarUrl">
									</div>
									<div class="wechat">
										<template v-if="item.status == 2">{{ item.wxAppName }}</template>
										<template v-else><span class="unbind">未绑定公众号</span></template>
									</div>
								</div>
							</div>
						</iCol>
					</Row>
					<Page
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
	.header {
		background: #F2F3F7;
		height: 90px;
		display: flex;
		padding: 0 30px;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #d3dce6;
		border-radius: 8px 8px 0 0;
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
	}
	.body {
		position: relative;
		height: 430px;
		.channel {
			display: flex;
			flex-direction: column;
			.list {
				height: 380px;
				padding: 10px;
				.item {
					padding: 5px;
					.border {
						height: 110px;
						display: flex;
						flex-direction: column;
						position: relative;
						cursor: pointer;
						transition: border .1s ease-in-out;
						border-radius: 6px;
						&:hover {
							.head .ivu-icon {
								visibility: visible;
							}
						}
						.head {
							background: #4E546C;
							box-shadow: 0 2px 6px 2px rgba(0,0,0,0.16);
							border-radius: 6px 6px 0 0;
							line-height: 40px;
							height: 40px;
							color: #fff;
							position: relative;
							padding: 0 10px;
							span {
								display: inline-block;
								text-indent: 15px;
							}
							.ivu-icon {
								position: absolute;
								right: 10px;
								bottom: 0;
								top: 50%;
								margin-top: -10px;
								visibility: hidden;
							}
							&:after {
								position: absolute;
								content: "";
								left: 10px;
								top: 50%;
								margin-top: -5px;
								background: #31BEDB;
								width: 10px;
								height: 10px;
								border-radius: 50%;
							}
						}
						.info {
							background: #f2f3f7;
							border-radius: 6px;
							padding-left: 10px;
							display: flex;
							align-items: center;
							flex: 1;
							.logo {
								width: 50px;
								height: 50px;
								background: #ccc;
								margin-right: 10px;
							}
							.unbind {
								color: #ff5520;
							}
						}
					}
				}
			}
			.ivu-page {
				display: flex;
				justify-content: center;
				position: absolute;
				bottom: 20px;
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
