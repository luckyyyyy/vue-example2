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
				<div class="smscode">
					<iInput v-model="reset_password.captcha" placeholder="请输入短信验证码"></iInput>
					<iButton :disabled="countdown && true" @click="reset_password_captcha">{{ interval ? countdown : '获取验证码' }}</iButton>
				</div>
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

	import { mapState } from 'vuex';
	import { RESET_PASSWORD_RULES } from '../../options/rules'
	export default {
		data () {
			return {
				reset_password: {},
				rules: RESET_PASSWORD_RULES
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
			submit_reset_password () {
				this.$refs.reset_password.validate((valid) => {
					if (valid) {
						this.$store.dispatch('RESETPWD_REQUEST', this.reset_password).then(() => {
							this.$Modal.success({
								title: '提示',
								content: '密码重置成功',
								okText: '登录',
								onOk: action => {
									this.$router.push({ name: 'login' })
								}
							})
						})
					} else {
						return false;
					}
				});
			}
		}
	}
</script>
