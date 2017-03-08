<template>
	<div class="form">
		<div class="title">登录</div>
		<el-form @submit.native.prevent :rules="rules" ref="login" label-position="top" :model="login">
			<el-form-item label="账号登录" prop="phone">
				<el-input v-model="login.phone" placeholder="请输手机号码"></el-input>
			</el-form-item>
			<el-form-item label="登录密码" prop="password">
				<el-input type="password" v-model="login.password" placeholder="请输入您的账户密码"></el-input>
			</el-form-item>
			<div class="bottom">
				<router-link class="resetpwd" :to="{ name: 'resetpwd' }">忘记密码?</router-link>
				<router-link class="register" :to="{ name: 'register' }">立即注册?</router-link>
			</div>
			<div class="bottom-center">
				<el-button :loading="lock" native-type="submit" type="primary" @click="submit_login">登录</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>

	import { mapState } from 'vuex';
	import { LOGIN_RULES } from '../../options/rules'
	import login from '../../store/modules/user/login'
	import store from '../../store'
	store.registerModule('login', login);
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


