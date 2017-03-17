<template>
	<div :class="{ lock: lock }" class="chatroom">
	 <Spin fix v-if="!init && !lock"></Spin>
		<div class="lock__btn" v-if="lock">
			  <iButton @click="onJoinChatroom" type="text">重新连接聊天室</iButton>
		</div>
		<div class="chat">
			<div class="head">
				<div class="btn" @click="onSwitchPage(1)"><span :class="{ active: active == 1 }">评论用户</span></div>
				<div class="btn" @click="onSwitchPage(2)"><span :class="{ active: active == 2 }">用户管理</span></div>
			</div>
			<div class="list" ref="list" @scroll="onScroll" v-show="active == 1">
				<chatroomList :history="true" :data="history"></chatroomList>
				<chatroomList :data="data"></chatroomList>
			</div>
			<div class="member" v-show="active == 2">
				<chatroomMemberList></chatroomMemberList>
			</div>
			<div v-show="notify" class="tips" @click="onToBottom(true)">😯 有新消息 点击查看</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import chatroomList from './item/chatroomList'
	import chatroomMemberList from './item/chatroomMemberList'
	export default {
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
			...mapState({
				init: state => state.im.init,
				lock: state => state.im.lock,
				user: state => state.user,
				live: state => state.live_query.data
			})
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
	.chatroom {
		flex: 3;
		display: flex;
		flex-direction: column;
		position: relative;
		&.lock {
			position: relative;
		}
		.lock__btn {
			justify-content: center;
			display: flex;
			align-items: center;
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(255, 255, 255, .8);
			z-index: 1;
		}
		.chat {
			font-size: 12px;
			box-sizing: border-box;
			height: 0;
			overflow: auto;
			flex: 1;
			background: #f7f8fa;
			display: flex;
			flex-direction: column;
			margin-bottom: 40px;
			position: relative;
			.head {
				display: flex;
				border-bottom: 1px solid #EBECF0;
				text-align: center;
				.btn {
					flex: 1;
					cursor: pointer;
					span {
						display: inline-block;
						padding: 10px 20px;
						color: #333;
						&.active, &:hover {
							color: #1190BF;
						}
						&.active {
							border-bottom: 2px solid #1190BF;
						}
					}
				}
			}
			.list, .member {
				padding: 0 20px;
				overflow: auto;
				box-sizing: border-box;
				flex: 1;
				position: relative;
			}
			.tips {
				position: absolute;
				background: white;
				color: red;
				box-sizing: border-box;
				width: 100%;
				left: 0;
				bottom: 0;
				padding: 5px;
				text-align: center;
				cursor: pointer;
			}
		}
	}
</style>
