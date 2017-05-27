<template>
	<div>  <!-- 必须多套一层，不然背景颜色会出现问题 -->
		<div class="wrapper">
			<ra-card>
				<p slot="title">
					账户余额
					<router-link class="link" :to="{ name: 'account_recharge' }">充值</router-link>
					<a class="link" href="#">账户充值记录</a>
				</p>
				<p class="content">当前账户余额：<span class="text-bold">{{ user.wallet.money | moneyFormat }}</span></p>
			</ra-card>
			<ra-card>
				<p slot="title">
					当前频道
					<a class="link" href="#">了解更多</a>
				</p>
				<div class="content">
					<div class="content-head">
						<p>当前频道流量套餐：<span class="text-bold">基础版</span></p>
						<p>有效期至：<span class="text-bold">{{ channel.channelInfo.expireTime | dateFormat('YYYY-MM-DD') }}</span></p>
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
			</ra-card>
			<ra-card>
				<p slot="title">
					频道消费明细
				</p>
				<div class="content">
					<div class="pagination" v-loading="loading">
						<!-- 表格 -->
						<el-table :data="orders" width="100%" border >
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
									<span v-if="!scope.row.status" class="unpaid" @click="openModal(scope.row)">未支付</span>
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
						<el-dialog class="pay-modal" title="继续支付" :visible.sync="payModal">
							<el-menu @select="selectPayMethod" default-active="1" class="pay-menus" theme="dark">
								<el-menu-item index="1">线上支付</el-menu-item>
								<el-menu-item index="2">线下支付</el-menu-item>
								<el-menu-item index="3">余额支付</el-menu-item>
							</el-menu>
							<ul class="modal-body">
								<li class="pay-item" v-if="form.type == 1">
									<div class="pay-logo"><img src="../../assets/images/account/alipay.png" height="43" width="125"></div>
									<div class="message">
										<p class="label">购买项目：</p>
										<span class="focus">{{ form.editionName }}</span>
									</div>
									<div class="message">
										<p class="label">应付金额：</p>
										<span class="focus">{{ form.money | moneyFormat }}</span>
									</div>
								</li>
								<li class="pay-item" v-if="form.type == 2">
									<div class="pay-logo"><img src="../../assets/images/account/offline.png" height="43" width="125"></div>
									<div class="message">
										<p class="label">开户名称：</p>
										<span>杭州艾草科技有限公司</span>
									</div>
									<div class="message">
										<p class="label">开户银行：</p>
										<span>上海浦东发展银行杭州钱塘支行</span>
									</div>
									<div class="message">
										<p class="label">银行账号：</p>
										<span class="focus">9509 0154 8000 04952</span>
									</div>
									<div class="message">
										<p class="label">联系电话：</p>
										<span>0571-22222222</span>
									</div>
								</li>
								<li class="pay-item" v-if="form.type == 3">
									<div class="message">
										<p class="label">余额：</p>
										<span class="focus">{{ user.wallet.money | moneyFormat }}</span>
									</div>
									<div class="message">
										<p class="label">购买项目：</p>
										<span class="focus">{{ form.name }}</span>
									</div>
									<div class="message">
										<p class="label">应付金额：</p>
										<span class="focus">{{ form.money | moneyFormat }}</span>
									</div>
								</li>
							</ul>
							<div class="modal-foot">
								<el-button @click="onSubmit" type="primary" v-show="form.type != 2">确认支付</el-button>
							</div>
						</el-dialog>
					</div>
				</div>
			</ra-card>
			<ra-card>
				<p slot="title">
					发票管理
				</p>
				<p class="content">发票管理暂时由人工管理   发票服务电话：<a href="tel:0571-81959767">0571-81959767</a></p>
			</ra-card>
			<ra-card>
				<p slot="title">
					优惠券
				</p>
				<p class="content">暂无优惠券信息</p>
			</ra-card>
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
				loading: false,
				form: {
					editionName: '',
					sn: '',
					type: 1,
					money: 0,
					model: 0,
				},
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
			...mapState('order/find', [ 'orders', 'total' ]),
			...mapState('user',[ 'user' ]),
			...mapState('channel', [ 'channel' ]),
		},
		methods: {
			...mapActions('order/find',{
				orderFind: 'ORDER_FIND_REQUEST'
			}),
			...mapActions('pay/order',{
				payOrder: 'PAY_ORDER'
			}),
			...mapActions('user',{
				getUser: 'USER_GET'
			}),
			...mapActions('channel',{
				getChannel: 'CHANNEL_GET'
			}),
			updateInfo () {
				this.getUser();
				this.getChannel(this.channel.channelId);
			},
			selectPage (page) {
				this.loading = true;
				this.orderFind(page).then(() => {
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				})
			},
			selectPayMethod (index) {
				this.$set(this.form,'type',index);
			},
			openModal ({sn, money, editionName,model}) {
				this.form.sn = sn;
				this.form.editionName = editionName;
				this.form.money = money;
				this.form.model = model
				this.payModal = true;
			},
			onSubmit () {
				this.payOrder(this.form).then(res => {
					if(typeof res == 'string'){
						// 支付宝充值
						this.$confirm('在新窗口为您打开充值界面，请按提示进行操作', '提示信息', {
							confirmButtonText: '支付成功',
							type: 'info',
							closeOnClickModal: false,
						}).then(() => {
							this.payModal = false;
							this.selectPage();
							this.updateInfo();
						}).catch(() => {
							this.$message.warning('已取消支付');
							this.updateInfo();
						});
						window.open(res);
					} else {
						// 非支付宝充值
						this.$alert('账户余额支付成功', '提示信息', {
							type: 'success',
						}).then(() => {
							this.payModal = false;
							this.selectPage();
							this.updateInfo();
						})
					}
				}).catch(err => {

				})
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

