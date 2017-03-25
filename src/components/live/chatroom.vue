<template>
	<div :class="{ lock: lock }" class="chatroom">
		<div v-if="!init && !lock" class="lock__btn">
			正在进入聊天室
		</div>
		<div class="lock__btn" v-if="lock">
			<iButton @click="onJoinChatroom" type="text">重新连接聊天室</iButton>
		</div>
		<div class="chat">
			<div class="head">
				<div class="btn" :class="{ active: active == 1 }" @click="onSwitchPage(1)">评论用户</div>
				<div class="btn" :class="{ active: active == 2 }" @click="onSwitchPage(2)">用户管理</div>
			</div>
			<div class="listwrap" ref="list">
				<div class="list" v-show="active == 1">
					<!-- http://dev.netease.im/docs?doc=web&#聊天室消息 -->
					<p v-for="item in history" :class="item.type" :title="item.time | date">
						<template v-if="item.type == 'text'">
							<chatroomTag :members="members" :account="item.from"></chatroomTag>
							<chatroomName :members="members" :im="live.liveImInfo" :account="item.from" :nickname="item.fromNick" :me="item.flow == 'out'">：</chatroomName>
							<span>{{ item.text }}</span>
						</template>
						<template v-if="item.type == 'notification'">
							<chatroomNotification :item="item"></chatroomNotification>
						</template>
					</p>
					<p v-show="history && data.length" class="history"></p>
					<p v-for="item in data" :class="item.type" :title="item.time | date">
						<template v-if="item.type == 'text'">
							<chatroomTag :members="members" :account="item.from"></chatroomTag>
							<chatroomName :members="members" :im="live.liveImInfo" :account="item.from" :nickname="item.fromNick" :me="item.flow == 'out'">：</chatroomName>
							<span>{{ item.text }}</span>
						</template>
						<template v-if="item.type == 'notification'">
							<chatroomNotification :item="item"></chatroomNotification>
						</template>
					</p>

				</div>
				<div class="member" v-show="active == 2">
					<chatroomMemberList :im="live.liveImInfo" :members="members"></chatroomMemberList>
				</div>
			</div>

			<div v-show="notify" class="tips" @click="onSwitchPage(1)">😯 有新消息 点击查看</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import chatroomName from './item/chatroomName'
	import chatroomTag from './item/chatroomTag'
	import chatroomNotification from './item/chatroomNotification'
	import chatroomMemberList from './item/chatroomMemberList'
	import iscroll from 'iscroll'
	import { date } from '../../utils/util'
	export default {
		props: {
			live: Object,
		},
		components: {
			chatroomName, chatroomTag, chatroomNotification, chatroomMemberList
		},
		data () {
			return {
				active: 1,
				notify: false,
			}
		},
		computed: {
			history () {
				this.$nextTick(() => {
					this.onToBottom(0);
				})
				return this.$store.state.im.history;
			},
			members () {
				if (this.scroll) this.scroll.refresh();
				return this.$store.getters['im/members'];
			},

			data () {
				this.$nextTick(() => {
					if(this.active == 2) {
						this.notify = true;
					} else {
						if (this.scroll) {
							if (this.scroll.maxScrollY - this.scroll.y > -50) {
								this.onToBottom();
							} else {
								this.notify = true;
							}
						}
					}
					if (!this.scroll) {
						this.scroll = new iscroll(this.$refs.list, {
							mouseWheel: true,
							preventDefault: false,
							scrollbars: true,
							fadeScrollbars: true,
							interactiveScrollbars: true,
							shrinkScrollbars: 'clip',
						})
					} else {
						this.scroll.refresh();
					}
				})
				return this.$store.state.im.data;
			},
			...mapState('im', ['init', 'lock']),
		},
		methods: {
			onToTop () {
				this.$nextTick(() => {
					if (this.scroll) {
						this.scroll.scrollTo(0, 0, 0);
					}
				})
			},
			onToBottom (delay) {
				this.$nextTick(() => {
					if (this.scroll) {
						this.scroll.scrollTo(0, this.scroll.maxScrollY, delay === undefined ? 500 : delay);
					}
					this.notify = false;
				})
			},
			onSwitchPage (active) {
				this.active = active;
				this.$nextTick(() => {
					this.scroll.refresh();
					if (this.active == 1) {
						this.onToBottom(0);
					} else {
						this.onToTop();
					}
				})
			},
			onJoinChatroom () {
				this.$emit('connect');
			}
		},
		filters: {
			date
		},
	}
</script>

<style lang="less" scoped>
	@import "../../assets/styles/components/live/chatroom.less";
</style>
