<template>
	<div>
		<div class="view">
			<el-form
				:model="reset_password"
				@submit.native.prevent
				:rules="rules"
				label-width="85px"
				ref="reset_password"
				class="form"
			>
				<h1 class="title">找回密码／Find Your Password</h1>
				<el-form-item label="手机号码" prop="phone">
					<el-input v-model="reset_password.phone" placeholder="请输手机号码"></el-input>
				</el-form-item>
				<el-form-item label="短信验证" prop="captcha">
					<el-input v-model="reset_password.captcha" placeholder="请输入短信验证码">
						<el-button slot="append" :disabled="lock_captcha" @click="reset_password_captcha">{{ countdown ? countdown : '获取验证码' }}</el-button>
					</el-input>
				</el-form-item>
				<el-form-item label="设置密码" prop="password">
					<el-input type="password" v-model="reset_password.password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="password_confirm">
					<el-input type="password" v-model="reset_password.password_confirm" placeholder="请确认密码"></el-input>
				</el-form-item>
				<div class="button">
					<el-button :loading="lock" native-type="submit" type="primary" @click="submit_reset_password">确认修改</el-button>
				</div>
			</el-form>
		</div>
		<ul class="tab">
			<li><router-link class="register" :to="{ name: 'login' }">登录</router-link></li>
			<li><router-link class="register" :to="{ name: 'register' }">注册</router-link></li>
		</ul>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { PHONE_CAPTCHA_EXPIRED } from '../../options'
	import { RESET_PASSWORD_RULES } from '../../options/rules'
	export default {
		data () {
			const checkPassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.reset_password.password) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				reset_password: {},
				rules: Object.assign(RESET_PASSWORD_RULES, {
					password_confirm: [
						{ required: true, validator: checkPassword }
					]
				}),
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
			...mapActions('user', {
				getCaptcha: 'USER_RESETPWD_CAPTCHA',
				resetPassword: 'USER_RESETPWD'
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
							this.$msgbox({
								type: 'success',
								title: '提示',
								message: '密码重置成功',
								confirmButtonText: '登录',
							}).then(() => {
								this.$router.push({ name: 'login' });
							});
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
