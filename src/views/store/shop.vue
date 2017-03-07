<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-radio-group v-model="select">
					<el-radio-button label="a">出售中</el-radio-button>
					<el-radio-button label="已售罄"></el-radio-button>
					<el-radio-button label="仓库中"></el-radio-button>
				</el-radio-group>
			</div>
		</div>
		<div class="commoon-view">
			<div class="button">
				<div class="left">
					<el-button type="primary" @click="create">新建商品</el-button>
					<el-button :plain="true" type="danger">删除</el-button>
					<el-button>下架</el-button>
				</div>
				<div class="right">
					<el-input placeholder="搜索" icon="search"></el-input>
				</div>
			</div>
			<el-table :data="tableData3" border style="width: 100%">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="商品">
					<template scope="scope">{{ scope.row.date }}</template>
				</el-table-column>
				<el-table-column label="价格" width="120">
					<template scope="scope">￥12323.00</template>
				</el-table-column>
				<el-table-column label="访问量" width="80">
					<template scope="scope"><p>PV：<span>3</span></p><p>UV：<span>4</span></p></template>
				</el-table-column>
				<el-table-column label="库存" width="80">
					<template scope="scope">33333</template>
				</el-table-column>
				<el-table-column label="总销量" width="80">
					<template scope="scope">33333</template>
				</el-table-column>
				<el-table-column label="创建时间" width="180">
					<template scope="scope">2013-01-01 15:15:15</template>
				</el-table-column>
				<el-table-column label="序号" width="70">
					<template scope="scope">01</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<el-button type="text">编辑</el-button>
						<el-button type="text">复制</el-button>
						<el-button type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

	</div>
</template>

<script>
	import Affix from '../../components/item/affix.vue'
	export default {
		components: {
			Affix
		},
		data () {
			return {
				select: 'a',
		        tableData3: [{
		          date: '2016-05-03',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-04',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-01',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-08',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-06',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-04',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-01',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-08',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-06',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-02',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-04',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-01',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-08',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-06',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }, {
		          date: '2016-05-07',
		          name: '王小虎',
		          address: '上海市普陀区金沙江路 1518 弄'
		        }],
			}
		},
		methods: {
			create () {
				this.$router.push({ name: 'store_shop_create' })
			}
		}
	}
</script>


<style scoped lang="less">
	.commoon-view {
		.button {
			margin: 10px 0;
			justify-content: space-between;
			display: flex;

		}
	}

</style>


