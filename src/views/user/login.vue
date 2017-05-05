<template>
	<div>
		<div class="view">
			<el-form
				:model="login"
				@submit.native.prevent
				:rules="rules"
				label-width="50px"
				ref="login"
				class="form"
			>
				<h1 class="title">登录／Login</h1>
				<el-form-item label="账号" prop="phone">
					<el-input v-model="login.phone" placeholder="请输手机号码"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="login.password" placeholder="请输入您的账户密码"></el-input>
				</el-form-item>
				<div class="button">
					<el-button :loading="lock" size="large" htmlType="submit" type="primary" @click="submit_login">登录</el-button>
				</div>
				<div class="line">
					<router-link class="resetpwd" :to="{ name: 'resetpwd' }">找回密码</router-link>
				</div>
			</el-form>
		</div>
		<ul class="tab">
			<li><span>登录</span></li>
			<li><router-link class="register" :to="{ name: 'register' }">注册</router-link></li>
		</ul>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { LOGIN_RULES } from '@/options/rules'

	export default {
		data () {
			return {
				login: {},
				lock: false,
				rules: LOGIN_RULES
			}
		},
		methods: {
			...mapActions('user', {
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


