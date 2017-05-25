<template>
	<div class="control">
		<div class="top">
			<div class="button-action">
				<div class="line">
					<el-popover placement="bottom" :width="200" trigger="click">
						<p>扫码下载手机直播工具</p>
						<div class="qrcode"></div>
						<p>支持Android、iOS 下载</p>
						<button slot="reference" class="btn">下载直播工具</button>
					</el-popover>
					<el-popover placement="bottom" width="200" trigger="click" popper-class="popper-stream" :width="240">
						<dl class="tips">
							<dt>方式一：使用APP扫码推流</dt>
							<dd class="qrcode" ref="qrcode"></dd>
							<dt>方式二：使用OBS等软件推流</dt>
							<dd class="stream">
								<clipboardInput :text="live.liveStream.url">复制地址</clipboardInput>
								<clipboardInput :text="live.liveStream.streamKey">复制秘钥</clipboardInput>
							</dd>
						</dl>
						<button slot="reference" class="btn" type="ghost">推流地址</button>
					</el-popover>
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
						<div class="time">
							<template v-if="play">
								直播用时
								<span class="timeWrapper">
									{{ publishTime.left | secondsFormat }}
								</span>
							</template>
						</div>
						<el-popover trigger="hover" placement="top">
							<p v-if="play">请先【停止推流】再结束直播。</p>
							<p>本场直播结束将彻底不可恢复，请慎重考虑。</p>
							<div slot="reference">
								<el-button :disabled="play" @click="onFinish" type="danger">结束直播</el-button>
							</div>
						</el-popover>
					</div>
				</div>
				<el-form class="chat-input" @submit.native.prevent :model="chatroom">
					<el-input class="chatroom__input" v-model="chatroom.text" placeholder="请输入内容">
						<el-button slot="append" :disabled="chatroom_lock || !chatroom_init" :loading="send" @click="chatroomSend" native-type="submit" type="primary">发送</el-button>
					</el-input>
				</el-form>
			</div>
		</div>

		<el-dialog custom-class="notice-dialog" title="发布公告" v-model="noticeDialog">
			<el-form ref="notice" :rules="rules" label-position="left" label-width="85px" :model="notice" @submit.native.prevent>
				<el-form-item label="公告内容" prop="text">
					<el-input v-model="notice.text" placeholder="请输入公告内容"></el-input>
				</el-form-item>
				<div style="display: none;">
					<el-button @click="onNoticeSubmit" :loading="lock" native-type="submit" type="primary">发 送</el-button>
				</div>
			</el-form >
			<div slot="footer">
				<el-button @click="onNoticeSubmit" :loading="lock" type="primary">发 送</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import qrcodejs from 'qrcodejs2'
	import { mapState, mapActions, mapMutations } from 'vuex'
	import moment from 'moment'
	import qrcodePopover from '@/components/item/qrcodePopover'
	import chatroom from '@/components/live/chatroom'
	import prismVideo from '@/components/live/video'
	import message from '@/components/live/message'
	import clipboardInput from '@/components/item/clipboardInput'
	import { trim } from '@/utils/util'
	import { LIVE_NOTICE_RULES } from '@/options/rules'
	import { secondsFormat } from '@/filter'

	export default {
		filters: {
			secondsFormat,
		},
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
				publishTime: {
					left: 0,
					interval: null,
				},
				play: false, // im更新
				noticeDialog: false,
				rules: LIVE_NOTICE_RULES,
				lock: false,
				send: false,
			}
		},
		computed: {
			...mapState('live', [ 'live', 'bitRateInfo' ]),
			...mapState('im', {
				chatroom_lock: state => state.lock,
				chatroom_init: state => state.init,
			}),
		},
		mounted () {
			this.onJoinChatroom();
			if (this.qrcode) {
				this.qrcode.makeCode(this.live.liveStream.pushStreamUrl);
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
			this.clearInterval();
		},
		methods: {
			...mapActions('im', {
				imDisconnect: 'IM_DISCONNECT',
				imInit: 'IM_INIT_REQUEST',
				imSend: 'IM_CHATROOM_MSG_SEND'
			}),
			...mapMutations('im', {
				imOnDisconnect: 'IM_CHATROOM_INIT_LOCK'
			}),
			...mapActions('live', {
				liveFinish: 'LIVE_FINISH',
				sendNotice: 'LIVE_NOTICE',
				getStreamStatus: 'LIVE_QUERY_STREAM',
			}),
			onJoinChatroom () {
				const chatroomId         = this.live.liveChatRoom.roomid;
				const oncustomsysmsg     = this.onCustomSysMsg;
				const onCustomServiceMsg = this.onCustomServiceMsg;
				const ondisconnect       = this.onDisconnect;
				const im                 = this.live.liveImInfo;
				this.imInit( { chatroomId, im, oncustomsysmsg, onCustomServiceMsg, ondisconnect }).then(() => {
					// join success
					// TODO welcome
				}).catch(err => {
					if (this.$route.name == 'live_control') {
						this.$alert(msg || '初始化聊天室失败，请尝试刷新重新加入，初始化失败将会影响中控台部分功能的使用。', '聊天室', {
							type: 'error',
						});
					}
				})
			},
			onDisconnect (error) {
				if (error) {
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
						this.imOnDisconnect();
					}
					if (error.code != 'logout') {
						this.$alert(msg || '聊天连接丢失，请尝试重新连接。', '聊天室', {
							type: 'error',
						});
					}
				}
			},
			onSwitchLiveAction (action) {
				if (action) {
					this.getStreamStatus(this.live).then(data => {
						this.play = data.status != 0;
					})
				} else {
					this.play = false;
				}
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
					this.send = true;
					this.imSend(text).then(() => {
						this.chatroom.text = '';
						this.send = false;
					}).catch(error => {
						this.$message.error(error.message);
						this.send = false;
					})
				}
			},
			openNotice () {
				this.noticeDialog = true
				this.notice.text = '';
			},
			onFinish () {
				this.$confirm('点击确定将彻底关闭直播，变更为回放状态，并且不可恢复。', '结束直播', {
					type: 'warning',
					beforeClose: async (action, instance, done) => {
						try {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								await this.liveFinish(this.live).then(() => {
									this.$router.push({ name: 'live_list' })
								});
							}
							instance.confirmButtonLoading = false;
							done();
						} catch(e) {
							instance.confirmButtonLoading = false;
							done();
						}
					}
				})
			},
			onNoticeSubmit () {
				this.$refs.notice.validate((valid) => {
					if (valid) {
						const content = this.notice.text;
						const id = this.live.id;
						this.lock = true;
						this.sendNotice({ id, content }).then(() => {
							this.lock = false;
							this.notice.text = '';
							this.noticeDialog = false;
						}).catch(() => {
							this.lock = false;
						})
					} else {
						return false;
					}
				});
			},
			clearInterval () {
				if (this.publishTime.interval) {
					clearInterval(this.publishTime.interval);
					this.publishTime.interval= null;
				}
			}
		},
		watch: {
			play (val) {
				this.clearInterval();
				if (val) {
					this.publishTime.interval = setInterval(() => {
						this.publishTime.left = (moment().format('x') - this.bitRateInfo.publishTime) / 1000;
					}, 1000);
				}
			}
		}
	}
</script>
<style scoped lang="less">
	@import "../../assets/styles/views/live/control";
</style>
<style lang="less">
	.chatroom__input {
		.el-input__inner {
			background-color: #343647;
			border: none;
			color: #fff;
			box-shadow: none;
			&:focus, &:hover {
				background-color: lighten(#343647, 5%);
			}
		}
		.el-input-group__append {
			border: 0;
			background: lighten(#343647, 15%);
			button {
				background: lighten(#343647, 15%);
				border-color: lighten(#343647, 15%);
				color: white;
			}
		}

	}
	.popper-stream {
		.tips {
			// padding: 5px;
			dt {
				text-align: center;
				font-size: 14px;
				font-weight: bold;
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
	.notice-dialog {
		width: 550px
	}
</style>
