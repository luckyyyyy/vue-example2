<template>
	<div class="form">
		<div class="title">注册</div>
		<el-form @submit.native.prevent :rules="rules" ref="register" label-width="100px" :model="register">
			<el-form-item label="手机号码" prop="phone">
				<el-input v-model="register.phone" placeholder="请输手机号码"></el-input>
			</el-form-item>
			<el-form-item class="smscode" label="短信验证码" prop="captcha">
				<el-input v-model="register.captcha" placeholder="请输入短信验证码"></el-input>
				<el-button :disabled="countdown && true" @click="register_captcha">{{ interval ? countdown : '获取验证码' }}</el-button>
			</el-form-item>
			<el-form-item label="设置密码" prop="password">
				<el-input type="password" v-model="register.password" placeholder="密码"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="register.email" placeholder="邮箱"></el-input>
			</el-form-item>
			<el-form-item label="个人昵称" prop="nickName">
				<el-input v-model="register.nickName" placeholder="输入个人昵称"></el-input>
			</el-form-item>
			<div class="bottom-center">
				<el-button :loading="lock" native-type="submit" type="primary" @click="submit_register">注册</el-button>
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
			register: {},
			rules: {
				phone: [
					{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
				],
				captcha: [
					{ required: true, min: 6, max: 6, message: '请输入正确的短信验证码' }
				],
				nickName: [
					{ max: 20, message: '昵称请小于20个字符' }
				],
				password: [
					{ required: true, min: 6, max: 16, message: '请输入6-16位密码' }
				],
				email: [
					{ type: 'email', message: '请输入正确的邮箱' }
				]
			}
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
								this.$confirm('该用户已注册，是否立即登录？', '提示', {
									confirmButtonText: '登录',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									this.$router.push({ name: 'login' })
								})
							} else {
								this.$alert(err.data.retMsg, '错误', {
									type: 'error'
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

