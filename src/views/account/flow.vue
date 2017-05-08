<template>
	<div><!-- 这里必须多套一层，否则高度不够的情况下背景有BUG -->
		<div class="container">
			<!-- 流量管理 -->
			<ra-card>
				<p slot="title">流量管理</p>
				<p class="content">
					<div class='message'>
						<p class="label">流量余额：</p>
						<span>¥ 0.00</span>
					</div>
				</p>
			</ra-card>
			<!-- 充值 -->
			<ra-card>
				<p slot="title" class="commoon-card__title">一元起充</p>
				<!-- 支付方式 -->
				<div class="content">
					<el-tabs id="pay-tabs" v-model="form.type" type="card">
						<el-tab-pane label="线上支付" name="1">
							<div class="common-tabs__content">
								<div class='message'>
									<p class="label">充值金额：</p>
									<p class="input">
										<el-input-number v-model="form.money" :step="1" size="small" :min="1"></el-input-number>
										<span>元</span>
									</p>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="线下支付" name="2">
							<div class="common-tabs__content">
								<div class="offline-logo"><img src="../../assets/images/account/offlineLogo.png" height="30" width="103"></div>
								<div class='message'>
									<p class="label">开户名称：</p>：
									<span>杭州艾草科技有限公司</span>
								</div>
								<div class='message'>
									<p class="label">开户银行：</p>：
									<span>上海浦东发展银行杭州钱塘支行</span>
								</div>
								<div class='message'>
									<p class="label">银行账号：</p>：
									<span class="focus">9509 0154 8000 04952</span>
								</div>
								<div class='message'>
									<p class="label">联系电话：</p>：
									<span>0571-22222222</span>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="余额支付" name="3">
							<div class="common-tabs__content">
								<div class='message balance'>
									<p class="label">余额：</p>
									<span class="focus">￥{{ form.money }}元</span>
									<span class="err"> <i class="el-icon-information"></i> 余额不足</span>
								</div>
								<div class='message'>
									<p class="label">充值金额：</p>
									<p class="input">
										<el-input-number v-model="form.money" :step="1" size="small" :min="1"></el-input-number>
										<span>元</span>
									</p>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
					<p class="tips">
						<span>有效期：1年（2017-02-10 至 2018-02-10）</span>
						<span>注：若当前版本未到期，剩余版本余额可抵用升级版本相应金额（如，专业版剩余3个月，则可抵扣1/4*4990=1247.5元。）；有效期于升级日期起计算。</span>
						<span>发票：订单对应可开发票的类型和抬头为您在用户中心-发票信息管理中设置的信息</span>
						<span class="tips-box">
							<el-checkbox v-model="isAgree"><a href="#">《 彩虹云直播平台服务条款 》</a></el-checkbox>
						</span>
					</p>
					<el-button @click='onSubmit' type="danger" class="submit" :disabled="!isAgree">立即购买</el-button>
				</div>
			</ra-card>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				isAgree: true,
				form: {
					money: 1,
					type: '1'
				},
				req_lock: true,
			}
		},
		methods: {
			...mapActions ('pay/flow_create',{
				createFlow: 'PAY_CREATE_FLOW'
			}),
			onSubmit () {
				if (this.req_lock) {
					this.req_lock = false;
					this.createFlow(this.form).then(res => {
						if (typeof res == 'string') {
							window.open(res);
							// 支付宝充值
							this.$confirm('在新窗口为您打开充值界面，请按提示进行操作', '提示信息', {
								confirmButtonText: '支付成功',
								type: 'info',
								closeOnClickModal: false,
							}).then(() => {
								this.$router.push({ path: 'overview' });
							}).catch(() => {
								this.$message.warning('已取消充值');
							});
						} else {
							// 非支付宝充值
							this.$alert('账户余额支付成功', '提示信息', {
								type: 'success',
							}).then(() => {
								this.$router.push({ path: 'overview' });
							})
						}
						this.req_lock = true;
					}).catch(err => {
						this.req_lock = true;
					})
				}
			},
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/views/account/flow.less";
</style>
