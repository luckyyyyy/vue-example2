<template>
	<div class="form">
		<div class="title">找回密码</div>
		<el-form @submit.native.prevent :rules="rules" ref="reset_password" label-width="100px" :model="reset_password">
			<el-form-item label="手机号码" prop="phone">
				<el-input v-model="reset_password.phone" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item class="smscode" label="短信验证码" prop="captcha">
				<el-input v-model="reset_password.captcha" placeholder="请输入短信验证码"></el-input>
				<el-button :disabled="countdown && true" @click="reset_password_captcha">{{ interval ? countdown : '获取验证码' }}</el-button>
			</el-form-item>
			<el-form-item label="新密码" prop="password">
				<el-input v-model="reset_password.password" type="password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<div class="bottom-center">
				<el-button :loading="lock" native-type="submit" type="primary" @click="submit_reset_password">确认修改</el-button>
				<el-button type="text" @click="to_login">登录</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data () {
		return {
			reset_password: {},
			rules: {
				phone: [
					{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
				],
				captcha: [
					{ required: true, min: 6, max: 6, message: '请输入正确的短信验证码' }
				],
				password: [
					{ required: true, min: 6, max: 16, message: '请输入6-16位密码' }
				]
			}
		}
	},
	computed: {
		...mapState({
			interval:  state => state.reset_password.interval,
			countdown: state => state.reset_password.countdown,
			lock:      state => state.reset_password.lock,
		})
	},


	methods: {
		reset_password_captcha () {
			this.$refs.reset_password.validateField('phone', errors => {
				if (!errors) {
					const phone = this.reset_password.phone;
					this.$store.dispatch('RESETPWD_CAPTCHA_REQUEST', { phone })
				} else {
					return false;
				}
			});
		},
		to_login () {
			this.$router.push({ name: 'login' });
		},
		submit_reset_password () {
			this.$refs.reset_password.validate((valid) => {
				if (valid) {
					this.$store.dispatch('RESETPWD_REQUEST', this.reset_password);
				} else {
					return false;
				}
			});
		}
	}
}
</script>
