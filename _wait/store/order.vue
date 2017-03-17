<template>
	<div class="commoon-menu-view">
		<el-form :inline="true" class="filter" ref="form" :model="form">
			<el-form-item label="名称">
				<el-select placeholder="请选择">
					<el-option label="全部" value="0"></el-option>
					<el-option label="直播订单" value="1"></el-option>
					<el-option label="普通订单" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="名称">
				<el-select placeholder="请选择">
					<el-option label="全部" value="0"></el-option>
					<el-option label="直播订单" value="1"></el-option>
					<el-option label="普通订单" value="2"></el-option>
				</el-select>
			</el-form-item>
			<div class="line">
				<el-form-item label="筛选">
					<el-input placeholder="请输入内容">
						<el-select class="bugfix" v-model="select" slot="prepend" placeholder="请选择">
							<el-option label="订单号" value="1"></el-option>
							<el-option label="姓名" value="2"></el-option>
							<el-option label="手机号" value="3"></el-option>
						</el-select>
					</el-input>
				</el-form-item>
				<el-form-item label="下单时间">
		    		<el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"></el-date-picker>
				</el-form-item>
				<el-button type="primary">筛选</el-button>
			</div>

		</el-form>
		<div class="order">
				<ul class="thead">
					<li>商品</li>
					<li style="width:120px;">单价/数量</li>
					<li style="width:120px;">买家</li>
					<li style="width:120px;">下单时间</li>
					<li style="width:120px;">全部状态</li>
					<li style="width:120px;">实付金额</li>
				</ul>
				<ul class="list">
					<li>
						<div class="head">
							<div class="desc">
								<p>订单号：<span>12382142412414124213</span></p>
								<p>支付宝流水号：<span>12382142412414124213</span></p>
							</div>
							<div class="button">
								<el-button @click="scanOrderDetail">查看详情</el-button>
							</div>
						</div>
						<div class="body">
							<div class="title">
								<img src="" alt="">
								<span>物品名称</span>
							</div>
							<div class="info" style="width:120px;">
								<p class="price">￥1234.00</p>
								<p class="count">3件</p>
							</div>
							<div class="desc" style="width:120px;">
								<p class="name">我问问</p>
								<p class="phone">18888888888</p>
							</div>
							<div class="time" style="width:120px;">
								2013-33-33 33:33:33
							</div>
							<div class="status" style="width:120px;">
								已发货
							</div>
							<div class="real-price" style="width:120px;">
								￥3333.33
							</div>
						</div>
					</li>
					<li>
						<div class="head">
							<div class="desc">
								<p>订单号：<span>12382142412414124213</span></p>
								<p>支付宝流水号：<span>12382142412414124213</span></p>
							</div>
							<div class="button">
								<el-button>查看详情</el-button>
							</div>
						</div>
						<div class="body">
							<div class="title">
								<img src="" alt="">
								<span>物品名称</span>
							</div>
							<div class="info" style="width:120px;">
								<p class="price">￥1234.00</p>
								<p class="count">3件</p>
							</div>
							<div class="desc" style="width:120px;">
								<p class="name">我问问</p>
								<p class="phone">18888888888</p>
							</div>
							<div class="time" style="width:120px;">
								2013-33-33 33:33:33
							</div>
							<div class="status" style="width:120px;">
								已发货
							</div>
							<div class="real-price" style="width:120px;">
								￥3333.33
							</div>
						</div>
					</li>
					<li>
						<div class="head">
							<div class="desc">
								<p>订单号：<span>12382142412414124213</span></p>
								<p>支付宝流水号：<span>12382142412414124213</span></p>
							</div>
							<div class="button">
								<el-button>查看详情</el-button>
							</div>
						</div>
						<div class="body">
							<div class="title">
								<img src="" alt="">
								<span>物品名称</span>
							</div>
							<div class="info" style="width:120px;">
								<p class="price">￥1234.00</p>
								<p class="count">3件</p>
							</div>
							<div class="desc" style="width:120px;">
								<p class="name">我问问</p>
								<p class="phone">18888888888</p>
							</div>
							<div class="time" style="width:120px;">
								2013-33-33 33:33:33
							</div>
							<div class="status" style="width:120px;">
								已发货
							</div>
							<div class="real-price" style="width:120px;">
								￥3333.33
							</div>
						</div>
					</li>
				</ul>
	    		<el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				form: {},
				value7: '',
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				options: {
					type: [{
						value: '选项1',
						label: '全部'
					}, {
						value: '选项1',
						label: '直播订单'
					}, {
						value: '选项1',
						label: '普通订单'
					}],
				},
				select: '1'
			}
		},
		methods: {
			scanOrderDetail() {
				this.$router.push({name: 'store_order_detail'})
			}
		}
	}
</script>

<style scoped lang="less">
	.commoon-menu-view {
		flex-direction: column;
		padding: 20px 30px;
		.el-input {
			width: 250px;
		}
		.bugfix {
			width: 90px;
		}
		.order {
			display: flex;
			flex-direction: column;
			.el-pagination {
				margin: 20px 0;
				text-align: center;
			}
			.thead {
				padding: 10px 20px;
				box-sizing: border-box;
				display: flex;
				width: 100%;
				background: #e5e9f2;
				li:first-child {
					flex: 1;
				}
			}
			.head {
				border: 1px solid #EBECF0;
				border-bottom: 0;
				margin-top: 10px;
				padding: 5px 20px;
				box-sizing: border-box;
				background: #f2f4f8;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p {
					margin: 5px 0;
				}
			}
			.body {
				box-sizing: border-box;
				padding: 10px 20px;
				border: 1px solid #EBECF0;
				width: 100%;
				display: flex;
				align-items: center;
				.title {
					flex: 1;
				}
				p {
					margin: 0;
				}
			}
		}
	}
</style>


