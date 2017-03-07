<template>
	<div class="control">


		<div class="top">
			<div class="button-action">
				<div class="line">
					<el-popover ref="download-popover" placement="bottom-start" width="200" trigger="click">
						<p>扫码下载手机直播工具</p>
						<div class="qrcode"></div>
						<p>支持Android、iOS 下载</p>
					</el-popover>
					<el-button v-popover:download-popover>下载直播工具</el-button>
					<qrcodePopover :text="live.liveStream.pushStreamUrl">
						<p slot="tips">扫码开启直播</p>
						<el-button slot="reference">推流地址</el-button>
					</qrcodePopover>
					<qrcodePopover text="假的">
						<p slot="tips">微信扫码观看直播</p>
						<el-button slot="reference">观看地址</el-button>
					</qrcodePopover>
				<!-- </div> -->
				<!-- <div class="line"> -->
					<el-button type="primary" @click="notice_dialog_visible = true">发布公告</el-button>
					<el-button type="primary" @click="screen_dialog_visible = true">宝贝上屏</el-button>
					<el-button type="primary">抽奖</el-button>
					<el-button type="primary" @click="product_dialog_visible = true">边看边买</el-button>
					<el-button type="primary">红包</el-button>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="left">
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
			<div class="video" ref="video">
				<div id='video' class='prism-player'></div>
			</div>
			<div class="right">
				<div class="chat">
					<div class="head">
						<div class="btn"><a class="active">评论用户</a></div>
						<div class="btn"><a class="disabled">禁言用户</a></div>
					</div>
					<div class="list">
						<p v-for="n in 100">
							<em>我我:</em><span>aaa</span>
						</p>
					</div>
				</div>
			</div>
			<div class="action">
				<div class="live-info">
					<ul class="live-info-stat">
						<li>观看人数<span>12345</span></li>
						<li>在线人数<span>12345</span></li>
						<li>总评论数<span>1111万</span></li>
					</ul>
					<div class="live-info-time">
						<div class="time">已经直播xxxxx分钟</div>
						<el-button size="small" type="danger" @click="endLive">结束直播</el-button>
					</div>
				</div>
				<div class="chat-input">
					<el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
					<el-button size="small" type="primary">发送</el-button>
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
	import store from '../../store'
	import { mapState } from 'vuex'
	export default {
		components: {
			qrcodePopover
		},
		data() {
			return {
				player: {},
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
		computed: {
			...mapState ({
				live: state => state.live_query.data
			})
		},
		beforeRouteEnter (to, from, next) {
			store.dispatch('LIVE_QUERY_REQUEST', { id: to.params.id }).then(res => {
				next();
			}).catch(err => {
				next({ name: 'index' });
			})
		},
		mounted () {
			const source = window.navigator.userAgent.indexOf('iPad') > -1 ?
				this.live.liveStream.playOriginM3uUrl :
				this.live.liveStream.playOriginFlvUrl;
			this.player = new prismplayer({
				id       : 'video',
				source   : source,
				autoplay : true,
				preload  : true,
				isLive   : true,
				showBarTime: '100',
				width    : '100%',
				skinLayout: []
			});
			this.player.on('liveStreamStop', () => {
				console.log(123);
			})
			window.addEventListener('resize', this.autoSetPlayerSize, false);
			this.autoSetPlayerSize();
		},
		beforeDestroy () {
			window.removeEventListener('resize', this.autoSetPlayerSize, false);
		},
		methods: {
			autoSetPlayerSize () {
				const height = this.$refs.video.offsetHeight - 30;
				this.player.setPlayerSize('100%', `${height}px`);
			},
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
		.video {
			flex: 4;
			width: 100%;
			background: #333;
		}
		.right {
			flex: 3;
			display: flex;
			flex-direction: column;
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
			}
		}
		.left {
			flex: 3;
			display: flex;
			flex-direction: column;
			padding-bottom: 40px;
			.message {
				height: 0; // ?
				overflow: auto;
				flex: 1;
				background: #F7F8FA;
				font-size: 12px;
				li {
					margin: 10px;
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
