<template>
	<div>
		<div class="info-page">
			<div class="body">
				<!--账号概况-->
				<ra-card class="header">
					<div slot="title">
						频道概况
						<a class="link">了解更多</a>
					</div>
					<div class="tag">
						频道类型：
						<el-tag type="success">标签四</el-tag>
						<el-tag type="warning">标签五</el-tag>
						<el-tag type="danger">标签六</el-tag>
					</div>
					<ul class="info">
						<li>当前账户余额：<span class="content">100.00元(赠送)<a class="link">充值</a></span></li>
						<!--<li>当前账户版本：<span class="content"><span>基础版</span><a class="link">升级</a></span></li>
						<li>当前流量套餐：<span class="content"><span>无</span><a class="link">购买</a></span></li>-->
						<li class="item">
							<div class="desc d1">剩余充值流量(元)：<span class="content">0.00</span></div>
							<el-progress :stroke-width="18" :percentage="70"></el-progress>
							<div class="right"><a class="link">充值</a></div>
						</li>
						<li class="item">
							<div class="desc d2">剩余储存空间(GB)：<span class="content">50.00</span></div>
							<el-progress :stroke-width="18" :percentage="25"></el-progress>
							<div class="right">200.00</div>
						</li>
					</ul>
				</ra-card>
				<!--频道概况-->

				<!--最近直播-->
				<ra-card>
					<div slot="title">最近直播</div>
					<el-row class="list">
						<el-col :span="6">
							<em>0</em>
							<span>观看总人数</span>
						</el-col>
						<el-col :span="6">
							<em>0</em>
							<span>直播时长</span>
						</el-col>
						<el-col :span="6">
							<em>0</em>
							<span>直播峰值</span>
						</el-col>
						<el-col :span="6">
							<em>0</em>
							<span>直播计费</span>
						</el-col>
					</el-row>
				</ra-card>

				<!--所有直播-->
				<ra-card>
					<div slot="title">所有直播</div>
					<el-row class="list">
						<el-col :span="6">
							<em>0</em>
							<span>观看总人数</span>
						</el-col>
						<el-col :span="6">
							<em>0</em>
							<span>直播时长</span>
						</el-col>
						<el-col :span="6">
							<em>0</em>
							<span>直播峰值</span>
						</el-col>
						<el-col :span="6">
							<em>0</em>
							<span>直播计费</span>
						</el-col>
					</el-row>
				</ra-card>

				<ra-card>
					<div slot="title">新手学习</div>
					<el-row class="help">
						<el-col :span="6">
							<a>如何创建直播</a>
						</el-col>
						<el-col :span="6">
							<a>如何装修直播</a>
						</el-col>
						<el-col :span="6">
							<a>如何设置互动</a>
						</el-col>
						<el-col :span="6">
							<a>直播设备知识</a>
						</el-col>
						<el-col :span="6">
							<a>直播现场知识</a>
						</el-col>
						<el-col :span="6">
							<a>直播策划分享</a>
						</el-col>
						<el-col :span="6">
							<a>直播案例分享</a>
						</el-col>
						<el-col :span="6">
							<a>直播商务分享</a>
						</el-col>
					</el-row>
				</ra-card>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'

	export default{
		data() {
			return{

			}
		},
		computed: {
			...mapState('channel', [ 'channel' ]),
		},
		methods: {
			...mapActions('wallet',{
				walletQuery: 'WALLET_QUERY'
			}),
			queryWallet () {
				this.walletQuery(this.channel.userId).then(res => {

				}).catch(err => {

				})
			},
		},
		mounted() {
			this.queryWallet();
		}
	}
</script>

<style lang="less" scoped>
	@import "../assets/styles/views/index";
</style>
