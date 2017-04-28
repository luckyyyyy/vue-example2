<template>
	<div>
		<div class="container">
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					账户版本
				</p>
				<div class="content">
					<div class="content-head">
						<p>当前账户版本：<span class="focus">免费版</span></p>
						<p>有效期至：<span class="focus">2017-03-31  23:59:59</span></p>
					</div>
				</div>
			</Card>
			<Card class="commoon-card" :bordered="false" dis-hover>
				<p slot="title" class="commoon-card__title">
					升级版本选择
				</p>
				<div class="content">
					<div class="select-box">
						<div @click="selectConsume(lowGrade)" class="version-wrap low-grade" :class="{ active: form.edition === 2 }">
							<p class="title">普通版 <span>4990元/年</span></p>
							<ul class="main">
								<li>+ 10W分钟流量</li>
								<li>+ 流量单价0.05</li>
								<li>+ 媒体库200GB</li>
								<li>+ 频道创建不限</li>
								<li>+ 直播间模版</li>
								<li>+ 付费观看</li>
								<li>+ 关注观看</li>
							</ul>
							<p class="footer">(包含免费版所有功能)</p>
						</div>
						<div @click="selectConsume(highGrade)" class="version-wrap high-grade" :class="{ active: form.edition === 3 }">
							<p class="title">高级版 <span>12990元/年</span></p>
							<ul class="main">
								<li>+ 30W分钟流量</li>
								<li>+ 流量单价0.04</li>
								<li>+ 媒体库200GB</li>
								<li>+ 频道创建不限</li>
								<li>+ 直播间模版</li>
								<li>+ 付费观看</li>
								<li>+ 关注观看</li>
							</ul>
							<p class="footer">(包含免费版所有功能)</p>
						</div>
					</div>
					<div class="form">
						<div class='message'>
							<p class="label">收费标准：</p>
							<span class="focus">{{ form.price }}</span>
							<p>元/年  (专业版)</p>
						</div>
						<div class='message'>
							<p class="label">购买年限：</p>
							<p class="form-contrl">
								<Input-number @on-change='changeQuantity' style="width:64px" v-model="form.quantity" :max="99" :min="1" :step="1"></Input-number>
							</p>
							<p>年  （有效期限：{{ time }} 至 {{ fTime }}）</p>
						</div>
						<div class='message'>
							<p class="label">总价：</p>
							<span class="focus">￥ {{ (form.quantity * form.price).toFixed(2) }}</span>
						</div>
						<Paymethod style="width: 100%;" @select="selectPayMethod" :defaultPayMethod="form.type"></Paymethod>
						<!-- tips -->
						<p class="tips">
							<span>有效期：1年（2017-02-10 至 2018-02-10）</span>
							<span>注：若当前版本未到期，剩余版本余额可抵用升级版本相应金额（如，专业版剩余3个月，则可抵扣1/4*4990=1247.5元。）；有效期于升级日期起计算。</span>
							<span>发票：订单对应可开发票的类型和抬头为您在用户中心-发票信息管理中设置的信息</span>
							<span class="tips-box">
								<Checkbox v-model="isAgree"><a href="#">《 彩虹云直播平台服务条款 》</a></Checkbox>
							</span>
						</p>
						<Button @click="onSubmit" type="error" :disabled="!isAgree">立即购买</Button>
					</div>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import Paymethod from '../../components/item/paymethod.vue'
	import moment from 'moment'
	export default {
		components: {
			Paymethod,
		},
		data () {
			return {
				lowGrade:{
					name: '普通版',
					edition: 2,
					price: 4990,
				},
				highGrade:{
					name: '高级版',
					edition: 3,
					price: 12990,
				},
				form:{
					edition: 2,
					quantity: 1,
					price: 4990,
					type: 1,
				},
				req_lock: true,
				time: 0,	// 测试用
				fTime: 0,	// 测试用
				isAgree: false,
			}
		},
		mounted () {
			this.time=moment().format('YYYY-MM-DD HH:mm:ss');
			this.fTime=moment(this.time).add(this.form.quantity, 'years').format('YYYY-MM-DD HH:mm:ss');
		},
		methods: {
			...mapActions('pay/consume_create', {
				createConsume: 'PAY_CREATE_CONSUME'
			}),
			selectConsume (version) {
				for(let key in version){
					this.form[key] = version[key];
				}
			},
			changeQuantity () {
				this.form.quantity = Math.round(this.form.quantity); //	确保数量是整数
				this.fTime = moment(this.time).add(this.form.quantity, 'years').format('YYYY-MM-DD HH:mm:ss');
			},
			onSubmit () {
				if(this.req_lock){
					this.createConsume(this.form).then(() => {

					}).catch(() => {

					})
				}
			},
			selectPayMethod (result){
				this.form.type = result;
			},
		},
		watch: {
		},
		computed: {
		},
	}
</script>

<style scoped lang='less'>
	@import "../../assets/styles/views/account/consume.less";
</style>

