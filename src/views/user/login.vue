<template>
	<div class="form">
		<div class="logo">
			<img src="../../assets/toplogo.png" height="40" width="196">
		</div>
		<div class="title">Sign in to Rainbow Live</div>
		<iForm
			:model="login"
			@submit.native.prevent
			:rules="rules"
			:label-width="75"
			ref="login"
		>
			<FormItem label="账号登录" prop="phone">
				<iInput v-model="login.phone" placeholder="请输手机号码"></iInput>
			</FormItem>
			<FormItem label="登录密码" prop="password">
				<iInput type="password" v-model="login.password" placeholder="请输入您的账户密码"></iInput>
			</FormItem>
			<div class="button">
				<iButton :loading="lock" size="large" htmlType="submit" type="primary" @click="submit_login">登录</iButton>
			</div>
		</iForm>
		<div class="line">
			<router-link class="resetpwd" :to="{ name: 'resetpwd' }">忘记彩虹云直播管理后台密码？</router-link>
			<router-link class="register" :to="{ name: 'register' }">没有账号，立即注册？</router-link>
		</div>
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


