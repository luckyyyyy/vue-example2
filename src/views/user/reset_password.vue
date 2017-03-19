<template>
	<div class="form">
		<div class="title">找回密码</div>
		<iForm
			:model="reset_password"
			@submit.native.prevent
			:rules="rules"
			:label-width="85"
			ref="reset_password"
		>
			<FormItem label="手机号码" prop="phone">
				<iInput v-model="reset_password.phone" placeholder="请输手机号码"></iInput>
			</FormItem>
			<FormItem label="短信验证码" prop="captcha">
				<iInput v-model="reset_password.captcha" placeholder="请输入短信验证码">
					<iButton slot="append" :disabled="lock_captcha" @click="reset_password_captcha">{{ countdown ? countdown : '获取验证码' }}</iButton>
				</iInput>
			</FormItem>
			<FormItem label="设置密码" prop="password">
				<iInput type="password" v-model="reset_password.password" placeholder="密码"></iInput>
			</FormItem>
			<div class="button">
				<iButton :loading="lock" htmlType="submit" type="primary" @click="submit_reset_password">确认修改</iButton>
			</div>
		</iForm>
		<div class="line">
			<router-link :to="{ name: 'login' }">已有账号，立即登录！</router-link>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { PHONE_CAPTCHA_EXPIRED } from '../../options'
	import { RESET_PASSWORD_RULES } from '../../options/rules'
	export default {
		data () {
			return {
				reset_password: {},
				rules: RESET_PASSWORD_RULES,
				interval: null,
				countdown: null,
				lock: false,
				lock_captcha: false,
			}
		},
		beforeDestroy () {
			this.clearInterval();
		},
		methods: {
			...mapActions('user/reset_password', {
				getCaptcha: 'RESETPWD_CAPTCHA_REQUEST',
				resetPassword: 'RESETPWD_REQUEST'
			}),
			clearInterval () {
				if (this.clearInterval) {
					clearInterval(this.clearInterval);
					this.clearInterval = null;
					this.countdown     = null;
					this.lock_captcha  = false;
				}
			},
			reset_password_captcha () {
				this.$refs.reset_password.validateField('phone', errors => {
					if (!errors) {
						this.lock_captcha = true;
						this.getCaptcha(this.reset_password).then(() => {
							this.interval = setInterval(() => {
								const countdown = (this.countdown || 60) - 1;
								if (countdown <= 0) {
									this.clearInterval();
								} else {
									this.countdown = countdown;
								}
							}, 1000);
						}).catch(_ => {
							this.lock_captcha = false;
						})
					} else {
						return false;
					}
				});
			},
			submit_reset_password () {
				this.$refs.reset_password.validate((valid) => {
					if (valid) {
						this.lock = true;
						this.resetPassword(this.reset_password).then(() => {
							this.lock = false;
							this.$Modal.success({
								title: '提示',
								content: '密码重置成功',
								okText: '登录',
								onOk: action => {
									this.$router.push({ name: 'login' })
								}
							})
						}).catch(() => {
							this.lock = false;
						})
					} else {
						return false;
					}
				});
			}
		}
	}
</script>
