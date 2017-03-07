<template>
	<div>
		<div class="info-page">
			<div class="head">
				<span class="title">美女聊点</span>
				<el-tag type="danger">标签六</el-tag>
				<el-tag type="danger">标签六</el-tag>
				<el-tag type="danger">标签六</el-tag>
			</div>
			<div class="body">
				<div class="account">
					<div class="title">账号概况 <a class="link">了解更多</a></div>
					<div class="box">
						<ul class="list">
							<li>当前账户版本：<span>基础版</span><a class="link">升级</a></li>
							<li>当前账户余额：<span>100.00元(赠送)</span><a class="link">充值</a></li>
							<li>当前流量套餐：<span>无</span><a class="link">购买</a></li>
						</ul>
						<ul class="progress">
							<li>
								<div class="desc d1">剩余充值流量(元)：<span>0.00</span></div>
								<el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
								<div class="right"><span>0.00</span> <a class="link">充值</a></div>
							</li>
							<li>
								<div class="desc d2">剩余储存空间(GB)：<span>50.00</span></div>
								<el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
								<div class="right"><span>200.00</span></div>
							</li>
						</ul>
					</div>
				</div>
				<div class="info">
					<div class="title">频道概况</div>
					<div class="box">
						<ul class="list">
							<li>
								<p class="red">0</p>
								<span>待发货订单</span>
							</li>
							<li>
								<p class="blue">0</p>
								<span>维权订单</span>
							</li>
							<li>
								<p class="blue">0</p>
								<span>昨日订单</span>
							</li>
							<li>
								<p class="blue">0</p>
								<span>昨日交易额</span>
							</li>
							<li>
								<p class="blue">0</p>
								<span>可提现余额</span>
							</li>
						</ul>
					</div>
					<div class="title">最近直播</div>
					<div class="box">
						<ul class="list">
							<li>
								<p>0</p>
								<span>观看总人数</span>
							</li>
							<li>
								<p>54.56</p>
								<span>直播时长</span>
							</li>
							<li>
								<p>0</p>
								<span>新增粉丝数</span>
							</li>
							<li>
								<p>0</p>
								<span>新增订单数</span>
							</li>
							<li>
								<p>¥0.00</p>
								<span>成交金额</span>
							</li>
						</ul>
					</div>
					<div class="title">所有直播</div>
					<div class="box">
						<ul class="list">
							<li>
								<p>0</p>
								<span>观看总人数</span>
							</li>
							<li>
								<p>54.56</p>
								<span>直播时长</span>
							</li>
							<li>
								<p>0</p>
								<span>新增粉丝数</span>
							</li>
							<li>
								<p>0</p>
								<span>新增订单数</span>
							</li>
							<li>
								<p>¥0.00</p>
								<span>成交金额</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="help">
					<div class="title">新手学习</div>
					<ul class="list">
						<li><a>如何创建直播</a></li>
						<li><a>如何装修直播</a></li>
						<li><a>如何设置互动</a></li>
						<li><a>直播设备知识</a></li>
					</ul>
					<ul class="list">
						<li><a>直播现场知识</a></li>
						<li><a>直播策划分享</a></li>
						<li><a>直播案例分享</a></li>
						<li><a>直播商务分享</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="less">
	a {
		font-size: 12px;
		color: #108EE9;
		letter-spacing: 0;
	}
	.info-page {
		color: #666;
		background: #fff;
		padding: 15px 20px;
	}
	.head {
		margin-bottom: 30px;
		.title {
			font-size: 18px;
		}
		.el-tag {
			margin: 0 3px;
		}
	}
	.body {
		margin-top: 15px;
		.title {
			font-size: 14px;
			.link {
				color: #108EE9;
			}
		}
		.box {
			font-size: 14px;
			margin: 10px 0;
			background: #F7F8FA;
		}
		.account {
			.list {
				padding: 25px 15px;
				padding-bottom: 5px;
				li {
					margin-bottom: 15px;
				}
				.link {
					margin-left: 15px;
				}
			}
			.progress {
				padding: 25px 15px;
				padding-top: 0;
				li {
					margin-top: 15px;
				}
				.desc, .el-progress--line, .right {
					display: inline-block
				}
				.desc {
					width: 180px;
					&.d1 {
						letter-spacing: 0.64px;
					}
					&.d2 {
						letter-spacing: 0;
					}
				}
				.el-progress--line {
					width: 350px;
				}
				.right {
					margin-left: 15px;
				}
			}
		}
		.info {
			.list {
				display: flex;
				li {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					height: 50px;
					padding: 10px;
					flex: 1;
					p {
						font-size: 26px;
						line-height: 20px;
						&.red {
							color: #E85471;
						}
						&.blue {
							color: #1190BF;
						}
					}
				}
			}
		}
		.help {
			margin-top: 40px;
			.list {
				display: flex;
				justify-content: space-between;
				li {
					text-align: center;
					flex: 1;
					background: #F7F8FA;
					margin: 10px;
					&:first-child, &:last-child {
						margin: 10px 0;
					}
					a {
						width: 100%;
						padding: 25px 0;
						color: #666;
						display: inline-block;
						font-size: 14px;
						&:hover {
							color: #108EE9;
						}
					}
				}
			}
		}
	}
</style>
