<template>
	<div>
		<div class="view">
			<el-form
				:model="register"
				@submit.native.prevent
				:rules="rules"
				label-width="85px"
				ref="register"
				class="form"
			>
				<h1 class="title">注册／Sign Up</h1>
				<el-form-item label="手机号码" prop="phone">
					<el-input v-model="register.phone" placeholder="请输手机号码"></el-input>
				</el-form-item>
				<el-form-item label="短信验证" prop="captcha">
					<el-input v-model="register.captcha" placeholder="请输入短信验证码">
						<el-button slot="append" :disabled="lock_captcha" @click="register_captcha">{{ countdown ? countdown : '获取验证码' }}</el-button>
					</el-input>
				</el-form-item>
				<el-form-item label="设置密码" prop="password">
					<el-input type="password" v-model="register.password" placeholder="密码"></el-input>
				</el-form-item>
<!-- 				<el-form-item label="邮箱" prop="email">
					<el-input v-model="register.email" placeholder="邮箱"></el-input>
				</el-form-item> -->
				<el-form-item label="确认密码" prop="password_confirm">
					<el-input type="password" v-model="register.password_confirm" placeholder="请确认密码"></el-input>
				</el-form-item>
				<el-form-item label="个人昵称" prop="nickName">
					<el-input v-model="register.nickName" placeholder="输入个人昵称"></el-input>
				</el-form-item>
				<div class="button">
					<el-button :loading="lock" htmlType="submit" type="primary" @click="submit_register">注册</el-button>
				</div>
			</el-form>
		</div>
		<ul class="tab">
			<li><router-link class="register" :to="{ name: 'login' }">登录</router-link></li>
			<li><span>注册</span></li>
		</ul>
	</div>
</template>
<script>
	import { mapActions } from 'vuex';
	import { REGISTER_RULES } from '../../options/rules'
	import { PHONE_CAPTCHA_EXPIRED } from '../../options'

	export default {
		data () {
			const checkPassword = (rule, value, callback) => {
				console.log(value)
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.register.password) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				lock: false,
				register: {},
				rules: Object.assign(REGISTER_RULES, {
					password_confirm: [
						{ required: true, validator: checkPassword }
					]
				}),
				interval: null,
				countdown: null,
				lock_captcha: false,
			}
		},
		beforeDestroy () {
			this.clearInterval();
		},
		methods: {
			...mapActions('user', {
				getCaptcha: 'USER_REGISTER_CAPTCHA',
				registerUser: 'USER_REGISTER'
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
						this.registerUser(this.register).then(() => {
							this.lock = false;
							this.$router.push({ name: 'register_success' });
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

