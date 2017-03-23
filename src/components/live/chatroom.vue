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
				<div class="btn" @click="onSwitchPage(1)"><span :class="{ active: active == 1 }">评论用户</span></div>
				<div class="btn" @click="onSwitchPage(2)"><span :class="{ active: active == 2 }">用户管理</span></div>
			</div>
			<div class="list" ref="list" @scroll="onScroll" v-show="active == 1">
				<chatroomList :im="live.liveImInfo" :members="members" :history="true" :data="history"></chatroomList>
				<chatroomList :im="live.liveImInfo" :members="members" :data="data"></chatroomList>
			</div>
			<div class="member" v-show="active == 2">
				<chatroomMemberList :im="live.liveImInfo" :members="members"></chatroomMemberList>
			</div>
			<div v-show="notify" class="tips" @click="onToBottom(true)">😯 有新消息 点击查看</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import chatroomList from './item/chatroomList'
	import chatroomMemberList from './item/chatroomMemberList'
	export default {
		props: {
			live: Object,
		},
		components: {
			chatroomList, chatroomMemberList
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
					this.onToBottom();
				})
				return this.$store.state.im.history;
			},
			data () {
				this.$nextTick(() => {
					if(this.active == 2) {
						this.notify = true;
					} else {
						const $el = this.$refs.list;
						if (($el.scrollHeight - $el.scrollTop) < $el.offsetHeight + 100) {
							this.onToBottom();
						} else {
							this.notify = true;
						}
					}

				})
				return this.$store.state.im.data;
			},
			...mapState('im', ['init', 'lock']),
			...mapGetters('im', ['members'])
		},
		methods: {
			onScroll () {
				const $el = this.$refs.list;
				if (($el.scrollHeight - $el.scrollTop) <= $el.offsetHeight) {
					this.notify = false;
				}
			},
			onToBottom (force) {
				if (force) this.active = 1;
				this.$nextTick(() => {
					const $el = this.$refs.list;
					$el.scrollTop = $el.scrollHeight + $el.offsetHeight;
				})

			},
			onSwitchPage (active) {
				this.active = active;
			},
			onJoinChatroom () {
				this.$emit('connect');
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../assets/styles/components/live/chatroom.less";
</style>
