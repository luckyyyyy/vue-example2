<template>
	<div>
		<div class="view">
			<iForm
				:model="login"
				@submit.native.prevent
				:rules="rules"
				:label-width="50"
				ref="login"
				class="form"
			>
				<h1 class="title">登录／Login</h1>
				<FormItem label="账号" prop="phone">
					<iInput v-model="login.phone" placeholder="请输手机号码"></iInput>
				</FormItem>
				<FormItem label="密码" prop="password">
					<iInput type="password" v-model="login.password" placeholder="请输入您的账户密码"></iInput>
				</FormItem>
				<div class="button">
					<iButton :loading="lock" size="large" htmlType="submit" type="primary" @click="submit_login">登录</iButton>
				</div>
				<div class="line">
					<router-link class="resetpwd" :to="{ name: 'resetpwd' }">找回密码</router-link>
				</div>

			</iForm>
		</div>
		<ul class="tab">
			<li><span>登录</span></li>
			<li><router-link class="register" :to="{ name: 'register' }">注册</router-link></li>
		</ul>
	</div>
</template>

<script>

	import { LOGIN_RULES } from '../../options/rules'
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				login: {},
				lock: false,
				rules: LOGIN_RULES
			}
		},
		methods: {
			...mapActions('user/login', {
				userLogin: 'USER_LOGIN'
			}),
			submit_login () {
				this.$refs.login.validate((valid) => {
					if (valid) {
						this.lock = true;
						this.userLogin(this.login).then(() => {
							this.lock = false;
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


