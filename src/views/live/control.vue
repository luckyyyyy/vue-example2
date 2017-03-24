<template>
	<div class="control">
		<div class="top">
			<div class="button-action">
				<div class="line">
					<Poptip placement="bottom" :width="200" trigger="click">
						<template slot="content">
							<p>扫码下载手机直播工具</p>
							<div class="qrcode"></div>
							<p>支持Android、iOS 下载</p>
						</template>
						<button class="btn">下载直播工具</button>
					</Poptip>
					<Poptip placement="bottom" width="200" trigger="click"  class="stream-url-popper" :width="240">
						<template slot="content">
							<div class="tips">
								<h3>方式一：使用APP扫码推流</h3>
								<div class="qrcode" ref="qrcode"></div>
							</div>
							<div class="tips">
								<h3>方式二：使用OBS等软件推流</h3>
								<div class="stream">
									<clipboardInput :text="live.liveStream.url">复制地址</clipboardInput>
									<clipboardInput :text="live.liveStream.streamKey">复制秘钥</clipboardInput>
								</div>
							</div>
						</template>
						<button class="btn" type="ghost">推流地址</button>
					</Poptip>
					<qrcodePopover text="假的">
						<p slot="tips">微信扫码观看直播</p>
						<button class="btn" slot="reference">观看地址</button>
					</qrcodePopover>
					<button class="btn release" @click="openNotice">发布公告</button>
				</div>
			</div>
		</div>
		<div class="body">
			<message></message>
			<prismVideo v-model="play" :live="live"></prismVideo>
			<chatroom @connect="onJoinChatroom" :live="live"></chatroom>
			<div class="action">
				<div class="live-info">
					<ul class="live-info-stat">
						<li>观看人数<span class="count">12345</span></li>
						<li>在线人数<span class="count">12345</span></li>
					</ul>
					<div class="live-info-status">
						<div class="time">直播用时<span class="timeWrapper">00:00:00</span></div>
						<Tooltip placement="top">
							<div slot="content">
								<p v-if="!live.publicStatus">只有至于【发布中】状态的直播才能结束。</p>
								<p v-if="play">请先【停止推流】再结束直播。</p>
								<p>本场直播结束将彻底不可恢复，请慎重考虑。</p>
							</div>
							<iButton :disabled="!live.publicStatus || play" @click="onFinish"type="error">结束直播</iButton>
						</Tooltip>
					</div>
				</div>
				<iForm class="chat-input" @submit.native.prevent :model="chatroom">
					<iInput size="small"  v-model="chatroom.text" placeholder="请输入内容"></iInput>
					<iButton :disabled="chatroom_lock || !chatroom_init" :loading="chatroom_send" @click="chatroomSend" htmlType="submit" type="primary">发送</iButton>
				</iForm>
			</div>
		</div>

		<Modal
			:width="550"
			title="公告"
			v-model="noticeDialog"
			:maskClosable="false"
		>
			<iForm ref="notice" :rules="rules" label-position="left" :label-width="85" :model="notice" @submit.native.prevent>
				<FormItem label="公告内容" prop="text">
					<iInput :autofocus="true" v-model="notice.text" placeholder="请输入公告内容"></iInput>
				</FormItem>
				<div style="display: none;">
					<iButton @click="onNoticeSubmit" :loading="lock" htmlType="submit" type="primary">发 送</iButton>
				</div>
			</iForm>
			<div slot="footer">
				<iButton @click="onNoticeSubmit" :loading="lock" type="primary">发 送</iButton>
			</div>
		</Modal>
	</div>
</template>
<script>
	import qrcodePopover from '../../components/item/qrcodePopover'
	import chatroom from '../../components/live/chatroom'
	import prismVideo from '../../components/live/video'
	import message from '../../components/live/message'
	import clipboardInput from '../../components/item/clipboardInput'
	import qrcodejs from 'qrcodejs2'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import { trim } from '../../utils/util'
	import { LIVE_NOTICE_RULES } from '../../options/rules'

	export default {
		components: {
			clipboardInput,
			qrcodePopover, chatroom, prismVideo, message
		},
		data () {
			return {
				chatroom: {
					text: ''
				},
				notice: {
					text: ''
				},
				play: false, // im更新
				noticeDialog: false,
				rules: LIVE_NOTICE_RULES,
				lock: false,
			}
		},
		computed: {
			...mapState('live', [ 'live' ]),
			...mapState('im', {
				chatroom_send: state => state.send,
				chatroom_lock: state => state.lock,
				chatroom_init: state => state.init,
			}),
		},
		mounted () {
			this.onJoinChatroom();
			if (this.qrcode) {
				this.qrcode.makeCode(this.text);
			} else {
				this.qrcode = new qrcodejs(this.$refs.qrcode, {
					text: this.live.liveStream.pushStreamUrl,
					width: 240,
					height: 240,
					// colorDark : "#000000",
					// colorLight : "#ffffff",
				});
			}
		},
		beforeDestroy () {
			this.imDisconnect();
		},
		methods: {
			...mapActions('im', {
				imDisconnect: 'IM_DISCONNECT',
				imInit: 'IM_INIT_REQUEST',
				imSend: 'IM_CHATROOM_MSG_REQUEST'
			}),
			...mapMutations('im', {
				imOnDisconnect: 'IM_CHATROOM_INIT_LOCK'
			}),
			...mapMutations('live', {
				updateLiveInfo: 'LIVE_QUERY',
			}),
			// ...mapActions('live/public', {
			// 	livePublic: 'LIVE_PUBLIC_REQUEST'
			// }),
			...mapActions('live/finish', {
				liveFinish: 'LIVE_FINISH_REQUEST'
			}),
			onJoinChatroom () {
				// const chatroomId         = 7853177; // 暂时
				const chatroomId         = this.live.liveChatRoom.roomid;
				const oncustomsysmsg     = this.onCustomSysMsg;
				const onCustomServiceMsg = this.onCustomServiceMsg;
				const ondisconnect       = this.onDisconnect;
				const im                 = this.live.liveImInfo;
				this.imInit( { chatroomId, im, oncustomsysmsg, onCustomServiceMsg, ondisconnect }).then(() => {
					// join success
				}).catch(err => {
					if (this.$route.name == 'live_control') {
						this.$Modal.error({
							title: '聊天室',
							content: '初始化聊天室失败，请尝试刷新重新加入，初始化失败将会影响中控台部分功能的使用。'
						});
					}
				})
			},
			onDisconnect (error) {
				if (error) {
					this.imOnDisconnect();
					let msg = error.message;
					if (!msg) {
						switch (error.code) {
							// 账号或者密码错误, 请跳转到登录页面并提示错误
							case 302:
								msg = '账号或者密码错误。';
								break;
							// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
							case 417:
								msg = '您的账号已在其他终端登录。';
								break;
							// 被踢, 请提示错误后跳转到登录页面
							case 'kicked':
								msg = '您的账号被系统强制下线。';
								break;
							default:
								break;
						}
					}
					if (error.code != 'logout') {
						this.$Modal.error({
							title: '聊天室',
							content: msg || '聊天连接丢失，请尝试重新连接。'
						})
					}
				}
			},
			onSwitchLiveAction (action) {
				this.play = action;
			},
			onCustomServiceMsg (data) { // chatroom callback
				switch (data.type) {
					case 'LIVE_STREAM_STATUS':
						this.onSwitchLiveAction(data.content.action == 'publish');
						break;
					default:
						// statements_def
						break;
				}
			},
			onCustomSysMsg (msg) { // im callback
				// console.log(msg)
			},
			chatroomSend () {
				const text = trim(this.chatroom.text);
				if (text) {
					this.imSend(text).then(() => {
						this.chatroom.text = '';
					}).catch(error => {
						this.$Message.error(error.message);
					})
				}
			},
			openNotice () {
				this.noticeDialog = true
				this.notice.text = '';
			},
			// onPublish () {
			// 	this.$Modal.confirm({
			// 		title: '直播',
			// 		content: '确定要修改直播状态么？',
			// 		loading: true,
			// 		onOk: () => {
			// 			this.livePublic(this.live).then(res => {
			// 				this.updateLiveInfo(res);
			// 				this.$Modal.remove();
			// 			}).catch(() => {
			// 				this.$Modal.remove();
			// 			})
			// 		}
			// 	})
			// },
			onFinish () {
				this.$Modal.confirm({
					title: '确定要结束直播吗？',
					content: '点击确定将彻底关闭直播，变更为回放状态，并且不可恢复。',
					loading: true,
					onOk: () => {
						this.liveFinish(this.live).then(() => {
							this.$Modal.remove();
							this.$router.push({ name: 'live_list' })
						}).catch(() => {
							this.$Modal.remove();
						})
					}
				})
			},
			onNoticeSubmit () {
				this.$refs.notice.validate((valid) => {
					if (valid) {
						// this.$store.dispatch('LIVE_CREATE_REQUEST', this.create).then(() => {
						// 	this.create.name = '';
						// 	this.openDialog = false;
						// })
					} else {
						return false;
					}
				});
			}
		}
	}
</script>
<style scoped lang="less">
	@import "../../assets/styles/views/live/control";
</style>
<style  lang="less">
	.action{
		.ivu-input{
			width: 100% !important;
			height: 32px !important;
			border-radius: 4px !important;
			background-color: #343647 !important;
			text-indent: 6px !important;
			color: #ccc !important;
			border: none !important;
			outline: none !important;
			box-shadow: none !important;
		}
	}
	.stream-url-popper {
		.tips {
			padding: 5px;
			h3 {
				text-align: center;
				font-size: 14px;
				// background: #eee;
			}
			.qrcode {
				display: flex;
				justify-content: center;
				padding: 5px;
				img {
					width: 120px;
					height: 120px;
				}
			}
		}
	}
</style>
