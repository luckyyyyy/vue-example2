<template>
	<div class="view">
		<div class="left" :class="{ enable: enable }">
			直播引导图：<el-switch @change="switchChange" v-model="enable" on-text="开" off-text="关" on-color="#87D068"></el-switch>
			<template v-if="enable">
				<el-tabs type="border-card">
					<el-tab-pane label="第一步：选择商品">
						<el-table :data="tableData3" border>
							<el-table-column type="selection" width="55"></el-table-column>
							<el-table-column label="商品信息" show-overflow-tooltip>
								<template scope="scope">{{ scope.row.date }}</template>
							</el-table-column>
							<el-table-column prop="name" label="价格" width="120"></el-table-column>
							<el-table-column prop="address" label="库存" width="120"></el-table-column>
							<el-table-column label="操作" width="240">
								<template scope="scope">
									<el-button size="small" type="primary">参加折扣</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="buttom">
							<el-button size="small">批量参加</el-button>
							<el-pagination :current-page="4" :page-size="100" layout="prev, pager, next, jumper, total" :total="1000"></el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="第二步：设置折扣">
						<el-table :data="tableData3" border class="list">
							<el-table-column type="selection" width="55"></el-table-column>
							<el-table-column label="商品信息">
								<template scope="scope">
									<div class="desc">
										<div class="title">
											商品标题商品标题商品标题商品标题商品标题商商品标题品标题
										</div>
										<div class="price">￥11</div>
										<div class="stock">123</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="折扣设置" width="550px">
								<template scope="scope">
									<div class="action">
										<div class="off">
											<el-input placeholder="1">
												<template slot="prepend">打折</template>
												<template slot="append">折</template>
											</el-input>
											<el-input placeholder="2">
												<template slot="prepend">减价</template>
												<template slot="append">元</template>
											</el-input>
											<el-input placeholder="3">
												<template slot="prepend">折后</template>
												<template slot="append">元</template>
											</el-input>
										</div>
										<el-input placeholder="3">
											<template slot="prepend">数量</template>
											<template slot="append">件</template>
										</el-input>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="120px">
								<template scope="scope">
									<div class="button"><el-button type="primary">取消</el-button></div>
								</template>
							</el-table-column>
						</el-table>
						<div class="buttom">
							<el-button size="small">批量取消</el-button>
						</div>
					</el-tab-pane>
				</el-tabs>
				<div class="save">
					<el-button>取消</el-button>
					<el-button type="primary">保存</el-button>
				</div>
			</template>
			<template v-else>
				<p class="tips">开启后，中控台里会显示上屏的功能，<br>商家可发送宝贝到直播画面中。<br>最多只能选择3件宝贝上屏。</p>
			</template>
		</div>
		<template v-if="!enable">
			<div class="right">
				<div class="iPhone-bg">
					<div class="iPhone-view">
					</div>
				</div>

			</div>
		</template>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		data () {
			return {
				enable: true,
				tableData3: [{
					date: '2016-05-03',
					name: '333.33$',
					address: '1518'
				}],
			}
		},
		mounted () {
		},
		methods: {
			handleRemove (file, fileList) {
				console.log(file, fileList);
			},
			handlePreview (file) {
				console.log(file);
			},
			handleSuccess () {

			},
			handleError () {

			},
			switchChange (enabled) {

			}
		}
	}
</script>

<style scoped lang="less">
	.left {
		width: 510px;
		&.enable {
			width: 100%;
		}
		.el-tabs {
			margin-top: 30px;
		}
		.tips {
			font-size: 12px;
			color: #999;
		}
		.buttom {
			margin: 20px;
			display: flex;
			justify-content: space-between;
		}
		.el-icon-warning {
			color: #FFAA00;
		}
		.save {
			position: fixed;
			bottom: 0;
			width: auto;
			left: 150px;
			right: 15px;
			background: #dbeef5;
			padding: 10px 0;
			text-align: center;
		}
		.list {
			.desc {
				flex: 1;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				padding: 0 10px;
				.price {
					font-family: HelveticaNeue-Medium;
					font-size: 12px;
					color: #E85471;
					line-height: 18px;
					margin: 5px 0;
				}
				.stock {
					font-size: 12px;
					line-height: 18px;
				}
			}
			.action {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				// align-items: center;
				flex: 1;
				.off {
					display: flex;
				}
				.el-input {
					width: 150px;
					margin: 10px;
				}
			}
			.button {
				flex: 1;
				text-align: center;
			}
		}
	}
	.view {
		display: flex;
		.right {
			margin-left: 30px;
			.iPhone-view {
				width: 230px;
				height: 410px;
				padding-left: 112px;
				padding-top: 125px;
				background: url(../../assets/live/liveshop.png) center center no-repeat;
			}
		}
	}
</style>
