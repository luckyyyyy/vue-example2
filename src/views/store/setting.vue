<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-radio-group v-model="select">
					<el-radio-button label="a">未开始</el-radio-button>
					<el-radio-button label="直播中"></el-radio-button>
					<el-radio-button label="已结束"></el-radio-button>
					<div class="line"></div>
					<el-radio-button label="回收站"></el-radio-button>
				</el-radio-group>
			</div>
		</div>
		<div class="commoon-view">
			<ul class="list">
				<li>
					<a class="create" href="javascript:;" @click="openCreateDialog">
						<svg width="240px" height="207px" viewBox="312 148 240 207" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<!-- Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch -->
							<desc>Created with Sketch.</desc>
							<defs>
								<rect id="path-1" x="0" y="0" width="240" height="207" rx="5"></rect>
								<mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="240" height="207" fill="white">
									<use xlink:href="#path-1"></use>
								</mask>
							</defs>
							<g id="Group-7" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(312.000000, 148.000000)">
								<use id="Rectangle-5-Copy-3" stroke="#DCDEE3" mask="url(#mask-2)" stroke-width="4" stroke-dasharray="5,5" xlink:href="#path-1"></use>
								<text id="新建直播" font-family="PingFangSC-Regular, PingFang SC" font-size="16" font-weight="normal" fill="#C4C6CF">
									<tspan x="88" y="141">新建直播</tspan>
								</text>
								<path d="M120.761905,97.2380952 L120.761905,82 L119.238095,82 L119.238095,97.2380952 L104,97.2380952 L104,98.7619048 L119.238095,98.7619048 L119.238095,114 L120.761905,114 L120.761905,98.7619048 L136,98.7619048 L136,97.2380952 L120.761905,97.2380952 Z" id="Plus-Copy" fill="#C4C6CF"></path>
							</g>
						</svg>
					</a>
				</li>
				<li>
					<div class="item">
						<div class="body first">
							<div class="btn">
								<em class="qrcode">二维码</em>
								<em class="qrcode">删除</em>
							</div>
							<div class="title">
								<span>这是一个厂标题我耳机我其二级Oprah破壳我靠谱12323</span>
								<i class="iconfont icon-video"></i>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<ul class="button">
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播装修</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>互动设置</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>

							</ul>
						</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="body">
							<div class="btn">
								<em class="qrcode">二维码</em>
								<em class="qrcode">删除</em>
							</div>
							<div class="title">
								<span>这是一个厂标题我耳机我其二级Oprah破壳我靠谱12323</span>
								<i class="iconfont icon-video"></i>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<ul class="button">
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播装修</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>互动设置</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>

							</ul>
						</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="body">
							<div class="btn">
								<em class="qrcode">二维码</em>
								<em class="qrcode">删除</em>
							</div>
							<div class="title">
								<span>这是一个厂标题我耳机我其二级Oprah破壳我靠谱12323</span>
								<i class="iconfont icon-video"></i>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<ul class="button">
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播装修</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>互动设置</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>

							</ul>
						</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="body">
							<div class="btn">
								<em class="qrcode">二维码</em>
								<em class="qrcode">删除</em>
							</div>
							<div class="title">
								<span>这是一个厂标题我耳机我其二级Oprah破壳我靠谱12323</span>
								<i class="iconfont icon-video"></i>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<ul class="button">
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播装修</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>互动设置</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>

							</ul>
						</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="body">
							<div class="btn">
								<em class="qrcode">二维码</em>
								<em class="qrcode">删除</em>
							</div>
							<div class="title">
								<span>这是一个厂标题我耳机我其二级Oprah破壳我靠谱12323</span>
								<i class="iconfont icon-video"></i>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<ul class="button">
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播装修</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>互动设置</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>

							</ul>
						</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="body">
							<div class="btn">
								<em class="qrcode">二维码</em>
								<em class="qrcode">删除</em>
							</div>
							<div class="title">
								<span>这是一个厂标题我耳机我其二级Oprah破壳我靠谱12323</span>
								<i class="iconfont icon-video"></i>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<ul class="button">
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播装修</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>互动设置</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>
								<li>
									<i class="iconfont icon-video"></i>
									<span>直播数据</span>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<el-dialog title="新建直播" v-model="createDialog" size="tiny">
			<div class="dialog">
				<div class="title">
					<span>直播标题：</span>
					<el-input v-model="createName" placeholder="请输入直播标题" :maxlength="16" :minlength="1"></el-input>
				</div>
				<div class="help">
					<p>
					说明：彩虹云直播严禁上传包括反动、暴力、色情、违法及侵权内容的文件。
					平台有义务配合有关部门将上传违规文件的用户信息保存，并保留因配合调
					查及冻结账号的权利。
					</p>
					<el-checkbox v-model="createAgree" checked>我已阅读</el-checkbox>
				</div>
	  		</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="createDialog = false">取 消</el-button>
				<el-button :disabled="!createAgree" type="primary">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				createDialog: false,
				createName: '',
				createAgree: true,
				select: 'a'
			}
		},
		methods: {
			openCreateDialog () {
				this.createName   = '';
				this.createAgree  = true;
				this.createDialog = true;

			}
		}
	}
</script>


<style scoped lang="less">
	// .commoon-view {
		.list {
			display: flex;
			flex-wrap: wrap;
			> li {
				width: 240px;
				height: 207px;
				border-radius: 5px;
				margin: 25px;
				box-shadow: 0 1px 7px 0 rgba(0,43,59,0.20);
				.create {
					display: inline-block;
				}
				&:hover {
					box-shadow: 0 1px 20px 0 rgba(0,43,59,0.20);
				}
				.body {
					height: 135px;
					box-sizing: border-box;
					border-radius: 5px 5px 0 0;
					background: #1190BF;
					padding: 10px 5px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: white;
					position: relative;
					z-index: 1;
					&.first {
						background-image: linear-gradient(-225deg, #1190BF 0%, #E85471 100%);
					}
					&:after {
						content: "";
						display: block;
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 32px;
						z-index: -1;
						background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.35) 100%);
					}
					.btn {
						text-align: right;
						em {
							cursor: pointer;
							font-style: normal;
							margin-left: 10px;
							padding: 5px 10px;
							font-size: 12px;
							background: rgba(0, 0, 0, .3);
							border-radius: 100px;
						}
					}
					.title {
						line-height: 14px;
						align-self: center;
						span {
							display: inline-block;
							width: 150px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							vertical-align: middle;
						}
						.iconfont {
							font-size: 14px;
						}
					}
				}
				.buttom {
					height: 72px;
					border-radius: 0 0 5px 5px;
					background: #F7F8FA;
					display: flex;
					flex-direction: column;
					.time {
						align-self: center;
						margin: 10px;
						font-size: 12px;
						color: #999999;
					}
					.button {
						display: flex;
						justify-content: space-around;
						li {
							border-right: 1px solid #EBECF0;
							flex: 1;
							cursor: pointer;
							text-align: center;
							&:last-child {
								border: none;
							}
							span {
								display: none;
								font-size: 12px;
							}
							&:hover {
								span {
									display: inline-block;
									color: #1190BF;
								}
								i {
									display: none;
								}
							}
						}

					}

				}
			}
		}
	// }
	.dialog {
		.el-input {
			width: 420px;
			display: inline-block;
		}
		.title, .help {
			margin: 20px;
			margin-bottom: 0;
			color: #666666;
		}
		.help {
			font-size: 12px;
			// margin-right: 100px;
			text-align: justify;
		}
	}

</style>


