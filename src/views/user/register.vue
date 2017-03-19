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
				<iInput v-model="register.captcha" placeholder="请输入短信验证码">
					<iButton slot="append" :disabled="lock_captcha" @click="register_captcha">{{ countdown ? countdown : '获取验证码' }}</iButton>
				</iInput>
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
	import { mapActions } from 'vuex';
	import { REGISTER_RULES } from '../../options/rules'
	import { PHONE_CAPTCHA_EXPIRED } from '../../options'

	export default {
		data () {
			return {
				lock: false,
				register: {},
				rules: REGISTER_RULES,
				interval: null,
				countdown: null,
				lock_captcha: false,
			}
		},
		beforeDestroy () {
			this.clearInterval();
		},
		methods: {
			...mapActions('user/register', {
				getCaptcha: 'REGISTER_CAPTCHA_REQUEST',
				register: 'REGISTER_REQUEST'
			}),
			clearInterval () {
				if (this.clearInterval) {
					clearInterval(this.clearInterval);
					this.clearInterval = null;
					this.countdown     = null;
					this.lock_captcha  = false;
				}
			},
			register_captcha () {
				this.$refs.register.validateField('phone', errors => {
					if (!errors) {
						this.lock_captcha = true;
						this.getCaptcha(this.register).then(() => {
							this.interval = setInterval(() => {
								const countdown = (this.countdown || 60) - 1;
								if (countdown <= 0) {
									this.clearInterval();
								} else {
									this.countdown = countdown;
								}
							}, 1000);
						}).catch(err =>{
							this.lock_captcha = false;
							if (err.data) {
								if (err.data.retCode == -197) {
									this.$Modal.confirm({
										title: '提示',
										content: '该用户已注册，是否立即登录？',
										okText: '登录',
										cancelText: '取消',
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
						this.lock = true;
						this.register(this.register).then(() => {
							this.lock = false;
							this.$router.push({ name: 'register_seccuss' });
						}).catch(() => {
							this.lock = false;
						})
					} else {
						return false;
					}
				})
			},
		}
	}
</script>

