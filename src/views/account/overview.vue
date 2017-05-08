<template>
	<div>  <!-- 必须多套一层，不然背景颜色会出现问题 -->
		<div class="wrapper">
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					账户余额
					<router-link class="link" :to="{ name: 'account_recharge' }">充值</router-link>
					<a class="link" href="#">账户充值记录</a>
				</p>
				<p class="content">当前账户余额：<span class="text-bold">¥ 0.00</span></p>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					当前频道
					<a class="link" href="#">了解更多</a>
				</p>
				<div class="content">
					<div class="content-head">
						<p>当前频道流量套餐：<span class="text-bold">基础版</span></p>
						<p>有效期至：<span class="text-bold">2018.04.06</span></p>
						<router-link class="link" :to="{ name: 'account_consume' }">购买</router-link>
					</div>
					<div class="content-body">
						<div class="content-card">
							<h4 class="content-card-title">本月剩余观看时长</h4>
							<div class="content-card-main">
								<div class="data">
									<p>已用 <span>{{ 300000 | numberFormat }}</span> </p>
									<p>剩余 <span>{{ 150000 | numberFormat }}</span> </p>
								</div>
								<dashboard :unit="'MIN'" :max="200000" :value="156550" ></dashboard>
							</div>
						</div>
						<div class="content-card">
							<h4 class="content-card-title">剩余存储空间</h4>
							<div class="content-card-main">
								<div class="data">
									<p>已用 <span>{{ 300000 | numberFormat }}</span> </p>
									<p>剩余 <span>{{ 150000 | numberFormat }}</span> </p>
								</div>
								<dashboard class="board" :unit="'GB'" :max="200000" :value="23567" ></dashboard>
							</div>
						</div>
						<div class="content-card-large">
							<h4 class="content-card-title">免费版套餐详情</h4>
							<ul class="collapse" :class="{ open: isOpen }">
								<li class="item" v-for="item in data">
									<div class="item-title">
										<template v-if='item.titleList'>
											<p>{{ item.titleList.title1 }}</p>
											<span class="line"></span>
											<p>{{ item.titleList.title2 }}</p>
										</template>
										<template v-else>
											<p>{{ item.title }}</p>
										</template>
									</div>
									<div class="item-main">
										<template v-if='item.imgURL'>
											<img :src="item.imgURL">
										</template>
										<template v-else>
											<p>{{ item.main }}</p>
										</template>
									</div>
								</li>
							</ul>
							<div class="collapse-btn" @click="isOpen = !isOpen;" :class="{ open:isOpen }">
								<i class="icon"></i>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					频道消费明细
				</p>
				<div class="content">
					<div class="pagination">
						<!-- 表格 -->
						<el-table :data="orders" width="100%" border>
							<el-table-column label="日期" min-width="200" :resizable="false">
								<template scope="scope">
									<span>{{ scope.row.createTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="editionName" label="购买项目" min-width="140" :resizable="false"></el-table-column>
							<el-table-column prop="sn" label="订单号" min-width="200" :resizable="false"></el-table-column>
							<el-table-column label="金额" min-width="140" :resizable="false">
								<template scope="scope">
									<span>{{ scope.row.money | moneyFormat }}</span>
								</template>
							</el-table-column>
							<el-table-column label="支付状态" min-width="140" :resizable="false">
								<template scope="scope">
									<span v-if="scope.row.status" class="paid">已支付</span>
									<span v-if="!scope.row.status" class="unpaid" @click="openModal(scope.row.sn)">未支付</span>
								</template>
							</el-table-column>
						</el-table>
						<!-- 页码 -->
						<el-pagination
							@current-change="selectPage"
							:page-size="5"
							layout="prev, pager, next, jumper"
							:total="total"
							class="page">
						</el-pagination>
						<!-- 支付模态框 -->
						<el-dialog
							title="继续支付"
							:visible.sync="payModal"
							size="tiny">
							<template>
								<el-menu default-active="2" class="el-menu-vertical-demo" theme="dark">
									<el-submenu index="1">
										<template slot="title">导航一</template>
										<el-menu-item-group title="分组一">
											<el-menu-item index="1-1">选项1</el-menu-item>
											<el-menu-item index="1-2">选项2</el-menu-item>
										</el-menu-item-group>
										<el-menu-item-group title="分组2">
											<el-menu-item index="1-3">选项3</el-menu-item>
										</el-menu-item-group>
										<el-submenu index="1-4">
											<template slot="title">选项4</template>
											<el-menu-item index="1-4-1">选项1</el-menu-item>
										</el-submenu>
									</el-submenu>
									<el-menu-item index="2">导航二</el-menu-item>
									<el-menu-item index="3">导航三</el-menu-item>
								</el-menu>
							</template>
						</el-dialog>
					</div>
				</div>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					发票管理
				</p>
				<p class="content">发票管理暂时由人工管理   发票服务电话：<a href="tel:0571-81959767">0571-81959767</a></p>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					优惠券
				</p>
				<p class="content">暂无优惠券信息</p>
			</Card>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import dashboard from '@/components/item/dashboard.vue'
	import { numberFormat, dateFormat, moneyFormat } from '@/filter'
	import { lowEdition } from '@/options/edition'
	export default {
		data () {
			return {
				isOpen: false,
				data: lowEdition,
				payModal: false,
				dialogVisible: false,
				form: {
					sn: '',
					type: 1,
				}
			}
		},
		mounted () {
			this.selectPage(1);
		},
		filters: {
			numberFormat,
			dateFormat,
			moneyFormat,
		},
		computed: {
			...mapState('order/find', ['orders', 'total']),
		},
		methods: {
			...mapActions('order/find',{
				orderFind: 'ORDER_FIND_REQUEST'
			}),
			selectPage (page) {
				this.orderFind(page).then(() => {

				}).catch(() => {

				})
			},
			openModal (sn) {
				this.form.sn = sn;
				this.payModal = true;
			}
		},
		components: {
			dashboard,
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/account/overview.less";
</style>

