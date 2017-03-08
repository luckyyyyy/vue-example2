<template>
	<div :class="{ lock: lock }" class="chatroom" v-loading="!init" element-loading-text="正在进入聊天室">
		<div class="lock__btn" v-if="lock">
			  <el-button @click="onJoinChatroom" type="text">重新连接聊天室</el-button>
		</div>
		<div class="chat">
			<div class="head">
				<div class="btn"><a class="active">评论用户</a></div>
				<div class="btn"><a class="disabled">禁言用户</a></div>
			</div>
			<div class="list" ref="list" @scroll="onScroll">
				<chatroomList :history="true" :data="history"></chatroomList>
				<chatroomList :data="data"></chatroomList>
			</div>
			<div v-show="notify" class="tips" @click="onToBottom">😯 有新消息 点击查看</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import chatroomList from './item/chatroomList'
	import store from '../../store/'
	import chatroom from '../../store/modules/netease/chatroom'
	store.registerModule('chatroom', chatroom);

	export default {
		components: {
			chatroomList
		},
		data () {
			return {
				notify: false,
			}
		},
		computed: {
			history () {
				this.$nextTick(() => {
					this.onToBottom();
				})
				return this.$store.state.chatroom.history;
			},
			data () {
				this.$nextTick(() => {
					const $el = this.$refs.list;
					if (($el.scrollHeight - $el.scrollTop) < $el.offsetHeight + 50) {
						this.onToBottom();
					} else {
						this.notify = true;
					}
				})
				return this.$store.state.chatroom.data;
			},
			...mapState({
				init: state => state.chatroom.init,
				lock: state => state.chatroom.lock,
			})
		},
		mounted () {
			this.onJoinChatroom();
		},
		beforeDestroy () {
			this.$store.dispatch('CHATROOM_DISCONNECT_REQUEST');
		},
		methods: {
			onScroll () {
				const $el = this.$refs.list;
				if (($el.scrollHeight - $el.scrollTop) <= $el.offsetHeight) {
					this.notify = false;
				}
			},
			onToBottom () {
				const $el = this.$refs.list;
				$el.scrollTop = $el.scrollHeight + $el.offsetHeight;
			},
			onJoinChatroom () {
				if (Math.random() * 10 > 5) {
					const init = {
						account: '5',
						chatroomId: 7703671,
						chatroomAddresses: [ 'wlnimsc6.netease.im:8080' ],
						token: '76c56b5f651c53f161683a2b3205fb32'
					}
					this.$store.dispatch('CHATROOM_INIT_REQUEST', init);
				} else {
					const init = {
						account: '1',
						chatroomId: 7703671,
						chatroomAddresses: [ 'wlnimsc6.netease.im:8080' ],
						token: '64007702fd2360204c68fde21f70929e'
					}
					this.$store.dispatch('CHATROOM_INIT_REQUEST', init);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.chatroom {
		flex: 3;
		display: flex;
		flex-direction: column;
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
					a {
						display: inline-block;
						padding: 10px 20px;
						color: #1190BF;
						&.active {
							border-bottom: 2px solid #1190BF;
						}
						&.disabled {
							color: #ccc;
							cursor: not-allowed;
						}
					}
				}
			}
			.list {
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
