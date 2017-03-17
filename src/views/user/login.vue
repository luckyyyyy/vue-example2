<template>
	<div class="form">
		<div class="title">登录</div>
		<iForm
			:model="login"
			label-position="top"
			@submit.native.prevent
			:rules="rules"
			ref="login"
		>
			<FormItem label="账号登录" prop="phone">
				<iInput v-model="login.phone" placeholder="请输手机号码"></iInput>
			</FormItem>
			<FormItem label="登录密码" prop="password">
				<iInput type="password" v-model="login.password" placeholder="请输入您的账户密码"></iInput>
			</FormItem>
			<div class="bottom">
				<router-link class="resetpwd" :to="{ name: 'resetpwd' }">忘记密码?</router-link>
				<router-link class="register" :to="{ name: 'register' }">立即注册?</router-link>
			</div>
			<div class="button">
				<iButton :loading="lock" htmlType="submit" type="success" long @click="submit_login">登录</iButton>
			</div>
		</iForm>
	</div>
</template>

<script>

	import { mapState } from 'vuex';
	import { LOGIN_RULES } from '../../options/rules'
	export default {
		data () {
			return {
				login: {},
				rules: LOGIN_RULES
			}
		},
		computed: {
			...mapState({
				lock: state => state.login.lock
			})
		},
		methods: {
			submit_login () {
				this.$refs.login.validate((valid) => {
					if (valid) {
						this.$store.dispatch('LOGIN_REQUEST', this.login)
					} else {
						return false;
					}
				});
			}
		}
	}
</script>


