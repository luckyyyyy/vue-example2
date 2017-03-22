<template>
	<div>
		<div class="info-page">
			<div class="body">
				<!--账号概况-->
				<div class="account wrap">
					<div class="head">
						<div class="header">
							<span class="header-title">美女聊点</span>
							<ul class="tag-box">
								<li class="tag service" >标签三</li>
								<li class="tag">标签三</li>
								<li class="tag">标签三</li>
							</ul>
						</div>
						<div class="title">账号概况 <a class="link">了解更多</a></div>
					</div>
					<div class="box">
						<ul class="list">
							<li>当前账户余额：<span class="content"><span>100.00元(赠送)</span><a class="link">充值</a></span></li>
							<!--<li>当前账户版本：<span class="content"><span>基础版</span><a class="link">升级</a></span></li>
							<li>当前流量套餐：<span class="content"><span>无</span><a class="link">购买</a></span></li>-->
							<li class="item">
								<div class="desc d1">剩余充值流量(元)：<span class="content"><span>0.00</span></span></div>
								<Progress :hide-info="true" :stroke-width="18" :percent="70"></Progress>
								<div class="right"><a class="link">充值</a></div>
							</li>
							<li class="item">
								<div class="desc d2">剩余储存空间(GB)：<span class="content"><span>50.00</span></span></div>
								<Progress :hide-info="true" :stroke-width="18" :percent="25"></Progress>
								<div class="right"><span>200.00</span></div>
							</li>
						</ul>
					</div>
				</div>
				<!--频道概况-->
				<!--<div class="info wrap">
					<div class="head">
						<span class="title">频道概况</span>
					</div>
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
				</div>-->
				<!--最近直播-->
				<div class="info wrap">
					<div class="head">
						<div class="title">最近直播</div>
					</div>
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
				<!--所有直播-->
				<div class="info wrap">
					<div class="head">
						<div class="title">所有直播</div>
					</div>
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
				<div class="help wrap">
					<div class="head">
						<span class="title">新手学习</span>
					</div>
					<div class="box">
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
	</div>
</template>
<style lang="less" scoped>
	@import "../assets/styles/views/index";
</style>
