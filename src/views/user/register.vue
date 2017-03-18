<template>
	<div class="form">
		<div class="title">注册</div>
		<iForm
			:model="register"
			@submit.native.prevent
			:rules="rules"
			:label-width="85"
			ref="register"
		>
			<FormItem label="手机号码" prop="phone">
				<iInput v-model="register.phone" placeholder="请输手机号码"></iInput>
			</FormItem>
			<FormItem label="短信验证码" prop="captcha">
				<div class="smscode">
					<iInput v-model="register.captcha" placeholder="请输入短信验证码"></iInput>
					<iButton :disabled="countdown && true" @click="register_captcha">{{ interval ? countdown : '获取验证码' }}</iButton>
				</div>
			</FormItem>
			<FormItem label="设置密码" prop="password">
				<iInput type="password" v-model="register.password" placeholder="密码"></iInput>
			</FormItem>
			<FormItem label="邮箱" prop="email">
				<iInput v-model="register.email" placeholder="邮箱"></iInput>
			</FormItem>
			<FormItem label="个人昵称" prop="nickName">
				<iInput v-model="register.nickName" placeholder="输入个人昵称"></iInput>
			</FormItem>
			<div class="button">
				<iButton :loading="lock" htmlType="submit" type="primary" @click="submit_register">注册</iButton>
			</div>
		</iForm>
		<div class="line">
			<router-link :to="{ name: 'login' }">已有账号，立即登录！</router-link>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	import { REGISTER_RULES } from '../../options/rules'
	export default {
		data () {
			return {
				register: {},
				rules: REGISTER_RULES
			}
		},
		computed: {
			...mapState({
				interval:  state => state.register.interval,
				countdown: state => state.register.countdown,
				lock:      state => state.register.lock,
			})
		},
		// 13028914409
		methods: {
			register_captcha () {
				this.$refs.register.validateField('phone', errors => {
					if (!errors) {
						const phone = this.register.phone;
						this.$store.dispatch('REGISTER_CAPTCHA_REQUEST', { phone }).catch(err =>{
							if (err.data) {
								if (err.data.retCode == -197) {
									this.$Modal.confirm({
										title: '提示',
										content: '该用户已注册，是否立即登录？',
										okText: '登录',
										cancelText: '取消',
										type: 'warning',
										onOk: () => {
											this.$router.push({ name: 'login' })
										}
									})
								} else {
									this.$Modal.error({
										content: err.data.retMsg,
										title: '错误'
									})
								}
							}
						});
					} else {
						return false;
					}
				});
			},
			submit_register () {
				this.$refs.register.validate(valid => {
					if (valid) {
						this.$store.dispatch('REGISTER_REQUEST', this.register).then(() => {
							this.$router.push({ name: 'register_seccuss' });
						})
					} else {
						return false;
					}
				})
			},
		}
	}
</script>

