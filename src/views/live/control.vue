<template>
	<div class="control">
		<div class="top">
			<div class="button-action">
				<el-popover ref="download-popover" placement="bottom-start" width="200" trigger="click">
					<p>扫码下载手机直播工具</p>
					<div class="qrcode"></div>
					<p>支持Android、iOS 下载</p>
				</el-popover>
				<el-button v-popover:download-popover>下载直播工具</el-button>
				<qrcodePopover text="rtmp://video-center.alivecdn.com/rainbowlive/rainbowlive?vhost=live.rainbowlive.shop&auth_key=1788718603-0-0-2422e449c400af9c836c05a1ae3f2637">
					<p slot="tips">扫码开启直播</p>
					<el-button slot="reference">推流地址</el-button>
				</qrcodePopover>
				<qrcodePopover text="rtmp://pub.mudu.tv/watch/f4aj52">
					<p slot="tips">微信扫码观看直播</p>
					<el-button slot="reference">观看地址</el-button>
				</qrcodePopover>
				<el-dropdown trigger="click">
					<el-button type="primary">
						直播功能<i class="el-icon-caret-bottom el-icon--right"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<el-button type="primary" @click="notice_dialog_visible = true">发布公告</el-button>
							<el-button type="primary" @click="screen_dialog_visible = true">宝贝上屏</el-button>
							<el-button type="primary">抽奖</el-button>
							<el-button type="primary" @click="product_dialog_visible = true">边看边买</el-button>
							<el-button type="primary">红包</el-button>
							<el-button type="danger" @click="endLive">结束直播</el-button>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="body">
			<div class="left">
				<ul class="live-info">
					<li>观看人数<span>12345</span></li>
					<li>在线人数<span>12345</span></li>
					<li>总评论数<span>1111万</span></li>
				</ul>
				<ul class="message">
					<li v-for="n in 30">
						<em>11:11:11</em>
						<p><span>系统消息：</span>你没钱了忘记为今晚我饥饿哦我去见覅偶。</p>
						<div class="item">
							<img src="">
							<div class="desc">
								<div class="title">名字我怕我卡欧派我靠谱的恐怕</div>
								<div class="info">
									<div class="price">￥<span>233</span></div>
									<div class="stock">库存：<span>3333</span></div>
								</div>
							</div>
						</div>
						<div class="btn">
							<el-button type="primary">充值</el-button>
						</div>
					</li>
				</ul>
			</div>
			<div class="right">
				<div class="video">
					<div class="video-view">
						<div id='video' class='prism-player'></div>
					</div>
				</div>
				<div class="chat">
					<div class="head">
						<div class="btn"><a class="active">评论用户</a></div>
						<div class="btn"><a class="disabled">禁言用户</a></div>
					</div>
					<div class="list">
						<p v-for="n in 100">
							<em>我我:</em><span>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</span>
						</p>
					</div>
					<div class="chat-input">
						<el-input v-model="input" placeholder="请输入内容"></el-input>
						<el-button type="primary">发送</el-button>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="公告" v-model="notice_dialog_visible" size="tiny">
			<div class="notice-box">
				<span>公告内容：</span>
				<el-input v-model="input" placeholder="请输入内容"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="notice_dialog_visible = false">取 消</el-button>
				<el-button type="primary" @click="notice_dialog_visible = false">发 送</el-button>
			</span>
		</el-dialog>
		<el-dialog title="宝贝上屏" v-model="screen_dialog_visible" size="tiny">
			<el-table :data="product_data" style="width: 100%">
				<el-table-column label="商品">
					<template scope="scope">
						<span style="margin-left: 10px">苹果🍎</span>
					</template>
				</el-table-column>
				<el-table-column label="价格（元）">
					<template scope="scope">
						<span style="margin-left: 10px">61.5</span>
					</template>
				</el-table-column>
				<el-table-column label="数量/库存">
					<template scope="scope">
						<span style="margin-left: 10px">120/2345</span>
					</template>
				</el-table-column>
				<el-table-column label="编号">
					<template scope="scope">
						<span style="margin-left: 10px">01</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="primary" size="small" @click="handleEdit()">发 送</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog title="边看边买" v-model="product_dialog_visible" size="tiny">
			<el-table :data="product_data" style="width: 100%">
				<el-table-column label="商品">
					<template scope="scope">
						<span style="margin-left: 10px">苹果🍎</span>
					</template>
				</el-table-column>
				<el-table-column label="价格（元）">
					<template scope="scope">
						<span style="margin-left: 10px">61.5</span>
					</template>
				</el-table-column>
				<el-table-column label="数量/库存">
					<template scope="scope">
						<span style="margin-left: 10px">120/2345</span>
					</template>
				</el-table-column>
				<el-table-column label="编号">
					<template scope="scope">
						<span style="margin-left: 10px">01</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button type="text" size="small" @click="handleEdit()">删 除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
	import qrcodePopover from '../../components/item/qrcodePopover'
	import '../../assets/prism/index-min.css'
	import '../../assets/prism/prism-min.js'
	export default {
		components: {
			qrcodePopover
		},
		data() {
			return {
				select: this.$route.name,
				input: '',
				notice_dialog_visible: false,
				product_dialog_visible: false,
				screen_dialog_visible: false,
				product_data: [{

				}, {

				}, {

				}, {

				}]
			}
		},
		computed: {},

		mounted () {
			const player = new prismplayer({
				id       : 'video',
				// source   : 'rtmp://live.rainbowlive.shop/rainbowlive/rainbowlive?auth_key=1488744307-0-0-71e15d8b356594cc3f435df77cacd3af',
				// source   : 'http://live.rainbowlive.shop/rainbowlive/rainbowlive.flv?auth_key=1488740149-0-0-53bd4779beb04209d57a65617ce53ece',
				source      : 'http://live.rainbowlive.shop/rainbowlive/rainbowlive.m3u8?auth_key=1488744307-0-0-66fd0dd4a5e83348c20aba3e34fbc2b1',
				autoplay : true,
				preload  : true,
				isLive   : true,
				width    : '100%',
				// height   : 'auto',
			});
			player.on('liveStreamStop', () => {
				console.log(123);
			})
		},
		methods: {
			endLive () {
				this.$confirm('确定要结束直播吗？点击确定将彻底关闭直播。', '结束直播', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>
<style scoped lang="less">
	.control {
		display: flex;
		padding: 10px 20px;
		flex-direction: column;
		.top {
			display: flex;
			justify-content: center;
			.button-action {
				margin: 5px 0;
				.el-button {
					width: 120px;
					margin: 5px;
				}
			}
		}
		.body {
			flex: 1;
			height: 100%;
			display: flex;
		}
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 10px;
			padding-bottom: 0;
			align-items: center;
			// min-width: 600px;
			.video {
				// min-width: 600px;
				// min-height: 400px;
				// flex: 1;
				width: 100%;
				display: flex;
				.video-view {
					flex: 1;
					background: #333;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.time {
						em {
							font-style: normal;
							font-size: 12px;
							color: #FFFFFF;
						}
						display: flex;
						justify-content: space-between;
						background: rgba(0, 0, 0, .35);
						height: 40px;
						line-height: 40px;
						padding: 10px;
					}
				}
			}
			.chat {
				width: 100%;
				box-sizing: border-box;
				height: 0;
				overflow: auto;
				flex: 1;
				background: #f7f8fa;
				display: flex;
				flex-direction: column;
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
					margin-top: 10px;
					overflow: auto;
					box-sizing: border-box;
					flex: 1;
					p {
						padding: 5px 0;
						margin: 0;
						em {
							color: #0076FF;
							font-style: normal;
						}
					}
				}
				.chat-input {
					box-sizing: border-box;
					width: 100%;
					display: flex;
					padding: 10px;
					.el-button {
						margin-left: 10px;
					}
				}
			}

		}
		.left {
			.live-info {
				background: #f7f8fa;
				display: flex;
				width: 100%;
				padding: 10px;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				li {
					align-items: center;
					display: flex;
					flex-direction: column;
					flex: 1;
				}
			}
			// flex: 1;
			width: 400px;
			display: flex;
			flex-direction: column;
			.message {
				height: 0; // ?
				overflow: auto;
				flex: 1;
				background: #F7F8FA;
				li {
					margin: 20px;
					padding: 10px;
					background: #eaebed;
					display: flex;
					flex-direction: column;
					em {
						font-style: normal;
						font-family: HelveticaNeue;
					}
					p {
						color: #333;
						span {
							color: #666;
						}
					}
					.item {
						display: flex;
						// display: none;
						.info {
							display: flex;
							.price {
								margin-right: 20px;
							}
							.stock {
								color: #999;
							}
						}
					}
					.btn {
						align-self: flex-end;
					}
				}
			}
		}
	}

	.el-dialog {
		.notice-box {
			display: flex;
			align-items: center;
			padding-left: 20px;
			.el-input {
				width: 250px;
				margin-left: 15px;
			}
		}
	}
</style>
