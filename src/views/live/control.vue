<template>
	<div class="control">
		<div class="top">
			<div class="button-action">
				<div class="line">
					<el-popover placement="bottom-start" width="200" trigger="click">
						<p>扫码下载手机直播工具</p>
						<div class="qrcode"></div>
						<p>支持Android、iOS 下载</p>
						<el-button slot="reference">下载直播工具</el-button>
					</el-popover>
					<el-popover placement="top" width="200" trigger="click"  popper-class="stream-url-popper" :width="240">
						<div class="tips">
							<h3>方式一：使用APP扫码推流</h3>
							<div class="qrcode" ref="qrcode"></div>
						</div>
						<div class="tips">
							<h3>方式二：使用OBS等软件推流</h3>
							<div class="stream">
								<clipboardInput :text="live.liveStream.pushStreamUrl">复制地址</clipboardInput>
								<clipboardInput :text="live.liveStream.pushStreamUrl">复制秘钥</clipboardInput>
							</div>
						</div>
						<el-button slot="reference">推流地址</el-button>
					</el-popover>
		<!-- 			<qrcodePopover :text="live.liveStream.pushStreamUrl">
						<p slot="tips">扫码开启直播</p>
						<el-button slot="reference">推流地址</el-button>
					</qrcodePopover> -->
					<qrcodePopover text="假的">
						<p slot="tips">微信扫码观看直播</p>
						<el-button slot="reference">观看地址</el-button>
					</qrcodePopover>
					<el-button type="primary" @click="openNotice">发布公告</el-button>
				</div>
			</div>
		</div>
		<div class="body">
			<message></message>
			<prismVideo :play="play" :stream="live.liveStream"></prismVideo>
			<chatroom @connect="onJoinChatroom"></chatroom>
			<div class="action">
				<div class="live-info">
					<ul class="live-info-stat">
						<li>观看人数<span>12345</span></li>
						<li>在线人数<span>12345</span></li>
					</ul>
					<div class="live-info-time">
						<div class="time">已经直播xxxxx分钟</div>
						<el-button size="small" type="danger" @click="endLive">结束直播</el-button>
					</div>
				</div>
				<el-form class="chat-input" @submit.native.prevent :model="chatroom">
					<el-input size="small" v-model="chatroom.text" placeholder="请输入内容"></el-input>
					<el-button :disabled="chatroom_lock || !chatroom_init" :loading="chatroom_send" @click="chatroomSend" size="small" native-type="submit" type="primary">发送</el-button>
				</el-form>
			</div>
		</div>
		<el-dialog
			custom-class="noticeDialog"
			title="公告"
			v-model="noticeDialog"
			:close-on-click-modal="false"
			:close-on-press-escape="!lock"
			:show-close="!lock">
			<el-form ref="notice" :rules="rules" label-position="left" label-width="85px" :model="notice" @submit.native.prevent>
				<el-form-item label="公告内容" prop="text">
					<el-input :autofocus="true" v-model="notice.text" placeholder="请输入公告内容"></el-input>
				</el-form-item>
				<div class="footer">
					<el-button @click="onNoticeSubmit" :loading="lock" native-type="submit" type="primary">发 送</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import qrcodePopover from '../../components/item/qrcodePopover'
	import chatroom from '../../components/live/chatroom'
	import prismVideo from '../../components/live/video'
	import message from '../../components/live/message'
	import clipboardInput from '../../components/item/clipboardInput'
	import qrcodejs from 'qrcodejs2'
	import { mapState } from 'vuex'
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
			...mapState ({
				live: state => state.live_query.data,
				chatroom_send: state => state.im.send,
				chatroom_lock: state => state.im.lock,
				chatroom_init: state => state.im.init,
			})
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
			this.$store.dispatch('IM_DISCONNECT');
		},
		methods: {
			onJoinChatroom () {
				const chatroomId         = 7703671; // 暂时
				// const chatroomId      = this.live.liveChatRoom.roomid;
				const oncustomsysmsg     = this.onCustomSysMsg;
				const onCustomServiceMsg = this.onCustomServiceMsg;
				this.$store.dispatch('IM_INIT_REQUEST', { chatroomId, oncustomsysmsg, onCustomServiceMsg });
			},
			onCustomServiceMsg (msg) {
				// onCustomServiceMsg
				// console.log(msg)
			},
			onCustomSysMsg (msg) { // im callback
				// console.log(msg)
			},
			chatroomSend () {
				const text = trim(this.chatroom.text);
				if (text) {
					this.$store.dispatch('IM_CHATROOM_MSG_REQUEST', text).then(() => {
						this.chatroom.text = '';
					}).catch(error => {
						this.$message.error(error.message);
					})
				}
			},
			openNotice () {
				this.noticeDialog = true
				this.notice.text = '';
			},
			endLive () {
				this.$confirm('确定要结束直播吗？点击确定将彻底关闭直播，变更为回放状态。', '结束直播', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

				}).catch(() => {

				});
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
	.control {
		display: flex;
		padding: 10px;
		flex-direction: column;
		.body {
			display: flex;
			flex: 1;
			height: 100%;
			position: relative;
		}
		.action {
			position: absolute;
			z-index: 1;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 40px;
			background: rgba(0, 0, 0, .5);
			display: flex;
			padding: 5px 0;
			line-height: 30px;
			box-sizing: border-box;
			font-size: 12px;
			.live-info {
				width: 70%;
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
				box-sizing: border-box;
				.live-info-stat {
					display: flex;
					color: white;
					li {
						margin-right: 20px;
						span {
							margin-left: 5px;
							color: yellow;
						}
					}
				}
				.live-info-time {
					display: flex;
					.time {
						color: white;
						margin-right: 20px;
					}
				}
			}
			.chat-input {
				width: 30%;
				padding: 0 10px;
				box-sizing: border-box;
				display: flex;
				.el-input {
					flex: 1;
				}
				.el-button {
					margin-left: 10px;
				}
			}
		}
		.button-action {
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			.line {
				text-align: center;
			}
			.el-button {
				width: 120px;
				margin: 10px;
				margin-bottom: 0;
			}
		}
		.top {
			display: flex;
			display: flex;
			justify-content: center;
		}
	}
</style>

<style lang="less">
	.noticeDialog {
		width: 550px;
		.footer {
			text-align: right;
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
		// .head, .body {
		// 	background: #eee;
		// 	display: flex;
		// 	align-items: center;
		// 	padding: 5px;
		// 	justify-content: space-around;
		// }
		// .body {
		// 	background: #fff;
		// 	.qrcode {
		// 		width: 120px;
		// 		height: 120px;
		// 		img {
		// 			width: 120px;
		// 			height: 120px;
		// 		}
		// 	}
		// }
	}
</style>













