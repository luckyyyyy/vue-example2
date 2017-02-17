<template>
	<div class="form">
		<div class="title">注册</div>
		<el-form :rules="rules" ref="sign_up" label-width="100px" :model="sign_up" v-loading.body="lock" element-loading-text="拼命加载中">
			<el-form-item label="手机号码" prop="phone">
				<el-input v-model="sign_up.phone" placeholder="请输手机号码"></el-input>
			</el-form-item>
			<el-form-item class="smscode" label="短信验证码" prop="authCode">
				<el-input v-model="sign_up.authCode" placeholder="请输入短信验证码"></el-input>
				<el-button :disabled="countdown && true" @click="sign_up_authcode">{{ interval ? countdown : '获取验证码' }}</el-button>
			</el-form-item>
			<el-form-item label="设置密码" prop="password">
				<el-input type="password" v-model="sign_up.password" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email_address">
				<el-input v-model="sign_up.email_address" placeholder="邮箱"></el-input>
			</el-form-item>
			<el-form-item label="个人昵称" prop="nickname">
				<el-input v-model="sign_up.nickname" placeholder="输入个人昵称"></el-input>
			</el-form-item>

			<div class="bottom-center">
				<el-button type="primary" @click="submit_sign_up">注册</el-button>
			</div>
			<div class="bottom-center">
				<router-link class="login" :to="{ name: 'login' }">登录</router-link>
			</div>
		</el-form>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data () {
		return {
			sign_up: {},
			rules: {
				phone: [
					{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
				],
				authCode: [
					{ required: true, min: 6, max: 6, message: '请输入正确的短信验证码' }
				],
				password: [
					{ required: true, min: 6, max: 16, message: '请输入6-16位密码' }
				],
				email_address: [
					{ type: 'email', message: '请输入正确的邮箱' }
				]
			}
		}
	},
	computed: {
		...mapState({
			interval: state  => state.sign_up.interval,
			countdown: state => state.sign_up.countdown,
			lock: state      => state.sign_up.lock,
		})
	},
	// 13028914409
	methods: {
		sign_up_authcode () {
			this.$refs.sign_up.validateField('phone', errors => {
				if (!errors) {
					const phone = this.sign_up.phone;
					this.$store.dispatch('SIGNUP_SMSCODE_REQUEST', { phone }).then( res => {
						const interval = setInterval(() => {
							const countdown = this.countdown - 1;
							this.$store.commit('SIGNUP_SMSCODE_COUNTDOWN', countdown);
						}, 1000)
						this.$store.commit('SIGNUP_SMSCODE_SUCCESS', interval);
					}).catch( err => {
						if (err.data.retCode == 20200) {
							this.$confirm('该用户已注册，是否立即登录？', '提示', {
								confirmButtonText: '登录',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.$router.push({ name: 'login' })
							}).catch(() => {
								console.log('cancel')
							})
						} else {
							this.$alert(err.data.retMsg, '错误', {
								type: 'error'
							})
						}
						this.$store.commit('SIGNUP_SMSCODE_FAILURE', err);
					})
				} else {
					return false;
				}
			});
		},
		submit_sign_up () {
			this.$refs.sign_up.validate((valid) => {
				if (valid) {
					this.$store.dispatch('SIGNUP_REQUEST', this.sign_up).then( res => {
						this.$store.commit('SIGNUP_SUCCESS', res);
						this.$store.commit('SIGNIN_SUCCESS', res);
						this.$router.push({ name: 'register/seccuss' })
					}).catch( err => {
						this.$store.commit('SIGNUP_FAILURE', err);
					})
				} else {
					return false;
				}
			})
		},
	}
}
</script>

