<template>
	<div class="container">
		<el-steps  :active="1" center align-center>
		  <el-step title="买家下单" description="2017-09-23 13:23:45"></el-step>
		  <el-step title="买家付款" description="2017-09-23 13:36:21"></el-step>
		  <el-step title="商家发货" description="2017-09-23 15:34:51"></el-step>
		  <el-step title="交易完成" description="2017-09-23 15:56:51"></el-step>
		</el-steps>
		<div class="order-info-wrapper">
			<ul class="base-info-box">
				<li><span class="title">订单信息</span></li>
				<li><span class="title">直播名称</span>：<span class="content">{{order.name}}</span></li>
				<li><span class="title">订单编号</span>：<span class="content">{{order.serial_num}}</span></li>
				<li><span class="title">买家</span>：<span class="content">{{order.buyer}}</span></li>
				<li><span class="title">收货信息</span>：<span class="content">{{order.address}}</span></li>
				<li><span class="title">买家留言</span>：<span class="content">{{order.note}}</span></li>
			</ul>
			<ul>
				<li><span class="status">当前订单状态：已发货</span></li>
				<div class="buttons-box">
					<el-button type="primary" @click="deliver_dialog_visible = true">发货</el-button>
					<el-button @click="close">关闭</el-button>
					<el-button @click="alter_dialog_visible = true">改价</el-button>
				</div>
			</ul>
		</div>
		<el-table :data="product_data"  style="width: 100%">
	      	<el-table-column prop="name" label="商品信息"></el-table-column>
	      	<el-table-column prop="amount" label="小计（元）"></el-table-column>
	      	<el-table-column prop="should_paid" label="应付金额（元）"></el-table-column>
	      	<el-table-column prop="discount" label="优惠（元）"></el-table-column>
	      	<el-table-column prop="actually_paid" label="实付款（元）"></el-table-column>
	      	<el-table-column prop="carriage" label="运费"></el-table-column>
    	</el-table>
    	<el-dialog class="alter-dialog" title="改价" v-model="alter_dialog_visible" size="small">
			<el-table :data="product_data" style="width: 100%">
				<el-table-column label="商品信息" width="180">
				  	<template scope="scope">
				    	<span style="margin-left: 10px">{{ scope.row.name }}</span>
				  	</template>
				</el-table-column>
				<el-table-column label="小计（元）">
				  	<template scope="scope">
				    	<span style="margin-left: 10px">{{ scope.row.amount }}</span>
				  	</template>
				</el-table-column>
				<el-table-column label="应付金额（元）">
				  	<template scope="scope">
				    	<span style="margin-left: 10px">{{ scope.row.should_paid }}</span>
				  	</template>
				</el-table-column>
				<el-table-column label="优惠（元）">
				  	<template scope="scope">
				    	<span style="margin-left: 10px">{{ scope.row.discount }}</span>
				  	</template>
				</el-table-column>
				<el-table-column label="实付款（元）">
				  	<template scope="scope">
				  		<el-input v-model="scope.row.actually_paid" placeholder="请输入实付款"></el-input>
				  	</template>
				</el-table-column>
				<el-table-column label="运费">
				  	<template scope="scope">
				  		<el-input v-model="scope.row.carriage" placeholder="请输入运费"></el-input>
				  	</template>
				</el-table-column>
			</el-table>
			<p class="total">总计 245</p>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="alter_dialog_visible = false">取 消</el-button>
    			<el-button type="primary" @click="alter_dialog_visible = false">确 定</el-button>
  			</span>
		</el-dialog>
    	<el-dialog class="deliver-dialog" title="发货" v-model="deliver_dialog_visible" size="tiny">
    		<p><span>订单编号：64986439047601834 </span><span class="time">下单时间：2016-08-05 14:33:04</span></p>
    		<p>收货信息：地址地址信息</p>
    		<div class="method-box">
    			<span>发货方式：</span>
				<el-radio class="radio" v-model="radio" label="1">物流信息</el-radio>
				<el-radio class="radio" v-model="radio" label="2">物流信息</el-radio>
    		</div>
    		<div class="express-company-box">
    			<span>快递公司：</span>
    			<el-select v-model="express" placeholder="请选择物流公司">
    				<el-option
    					v-for="express_company in express_companys"
    					:key="express_company"
    					:label="express_company"
    					:value="express_company">
    				</el-option>
				</el-select>
    		</div>
    		<div class="numbers-box">
    			<span>快递单号：</span>
    			<el-input v-model="input" placeholder="请输入单号"></el-input>
    		</div>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="deliver_dialog_visible = false">取 消</el-button>
    			<el-button type="primary" @click="deliver_dialog_visible = false">确 定</el-button>
  			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				input: "12",
				radio: "1",
				express: "1",
				alter_dialog_visible: false,
				deliver_dialog_visible: false,
				order: {
					name: "名称",
					serial_num: "E20150830061612057713294",
					buyer: "13113394703",
					address: "辽宁省 阜新市 阜新蒙古族自治县 四方楼",
					note: "尽快发货"
				},
				product_data: [{
					status: 0,
					name: "某某某商品啥快递卢卡斯较好",
					amount: 245.00,
					should_paid: 245.00,
					discount: 10,
					actually_paid: 235.00,
					carriage: 10
				}],
				express_companys: ["圆通","顺丰"]
			}
		},
		mounted () {
		},
		methods: {
			close() {
				this.$confirm('关闭将取消该订单，确定关闭吗？', '提示', {
		          confirmButtonText: '关闭',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '关闭成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消关闭'
		          });
		        });
			},
			changePrice() {

			}
		}
	}
</script>

<style scoped lang='less'>
.container {
	padding: 30px;
}

.el-steps {
	margin-top: 10px;
	margin-left: 100px;
}
.order-info-wrapper {
	display: flex;
	border: solid 1px #ebecf0;
	width: 100%;
	margin-top: 20px;
	ul {
		flex: 1 1 0;
		margin: 30px 0;
		padding: 0 30px;
		li {
			list-style-type: none;
			margin-bottom: 20px;
			.title {
				text-align: right;
				width: 60px;
				display: inline-block;
			}
			.content {
				color: #333;
			}
			.title, .status {
				color: #797979;
			}
		}
	}
	.base-info-box {
		border-right: solid 1px #ebecf0;
	}
	.buttons-box {
		display: flex;
	}
}
.el-table {
	margin-top: 20px;
}
.alter-dialog {
	.total {
		text-align: right;
		height: 35px;
		border-bottom: 1px solid #dfe6ec;
	}
}
.deliver-dialog {
	.time {
		margin-left: 30px;
	}
	.method-box {
		margin-top: 50px;
	}
	.express-company-box {
		margin-top: 30px;
	}
	.numbers-box {
		margin-top: 30px;
	}
	.el-input {
		width: 195px;
	}
}
</style>
