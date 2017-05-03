<template>
	<div>
		<header class="header">
			<div class="left">
				<img class="avatar" :src="user.avatar + '/avatar'">
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
					<iButton type="primary" class="menu-btn">创建新频道</iButton>
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
										<img :src="item.logoImageUrl">
									</div>
									<div class="wechat">
										<template v-if="item.status == 2">
											<em>微信公众号</em>
											<span>{{ item.wxAppName }}</span>
										</template>
										<template v-else>
											<span class="unbind">未绑定公众号</span>
										</template>
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
			...mapState('channel', {
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
			...mapActions('channel', {
				getChannel: 'CHANNEL_FIND_REQUEST',
				selectChannel: 'CHANNEL_SET',
				deleteChannel: 'CHANNEL_DELETE'
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
	@import "../../assets/styles/views/home/select.less";
</style>
