<template>
	<div class="container">
		<Card class="commoon-card" :bordered="false" dis-hover>
			<p slot="title" class="commoon-card__title">一元起充</p>
			<div class="content content-info">
				<div class="info">
					<h4>升级版本</h4>
					<p>{{ editionName }}</p>
				</div>
				<div class="info">
					<h4>购买年限</h4>
					<p>{{ $route.params.quantity }}年</p>
				</div>
				<div class="info">
					<h4>折扣</h4>
					<p>无</p>
				</div>
				<div class="info">
					<h4>资费</h4>
					<p>{{ totalPrice }}元</p>
				</div>
			</div>
			<!-- 支付方式 -->
			<Paymethod :form='form'></Paymethod>
			<!-- tips -->
			<p class="tips">
				<span>有效期：1年（2017-02-10 至 2018-02-10）</span>
				<span>注：若当前版本未到期，剩余版本余额可抵用升级版本相应金额（如，专业版剩余3个月，则可抵扣1/4*4990=1247.5元。）；有效期于升级日期起计算。</span>
				<span>发票：订单对应可开发票的类型和抬头为您在用户中心-发票信息管理中设置的信息</span>
				<span class="tips-box">
					<Checkbox v-model="form.isAgree"><a href="#">《 彩虹云直播平台服务条款 》</a></Checkbox>
				</span>
			</p>
			<!-- 支付按钮 -->
			<div class="content">
				<Button type="error" class="pay-btn">确认支付</Button>
			</div>
		</Card>
	</div>
</template>

<script>
	import Paymethod from '../../components/item/paymethod.vue'
	import moment from 'moment'
	export default {
		data () {
			return {
				form: {
					payMethod: 1,
					isAgree: false,
				}
			}
		},
		mounted () {
			console.log(this.$route.params);
			this.checkedParams();
		},
		methods: {
			checkedParams () {
				if((this.$route.params.edition !== 2 || this.$route.params.edition !== 3) && this.$route.params.quantity === undefined){
					this.$router.push ({ name: 'account_package' }); // 如果参数错误 则跳转回购买页面
				}
			}
		},
		computed: {
			editionName () {
				return this.$route.params.edition === 2 ? '普通版' : '高级版';
			},
			totalPrice () {
				return (this.$route.params.edition === 2 ? 4990 : 12990) * this.$route.params.quantity;
			}
		},
		components: {
			Paymethod,
		}
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/packageorder.less";
</style>

