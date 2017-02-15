<template>
	<div class="form">
		<div class="title">找回密码</div>
		<el-form :rules="rules" ref="resetpwd" label-width="100px" :model="resetpwd" v-loading.body="lock" element-loading-text="拼命加载中">
			<el-form-item label="手机号码" prop="username">
				<el-input v-model="resetpwd.username" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item class="smscode" label="短信验证码" prop="smscode">
				<el-input v-model="resetpwd.smscode" placeholder="请输入短信验证码"></el-input>
				<el-button :disabled="countdown && true" @click="resetpwd_smscode">{{ interval ? countdown : '获取验证码' }}</el-button>
			</el-form-item>
			<el-form-item label="新密码" prop="new_password">
				<el-input v-model="resetpwd.new_password" type="password" placeholder="请输入密码"></el-input>
			</el-form-item>
			<div class="bottom-center">
				<el-button type="primary" @click="submit_resetpwd">确认修改</el-button>
				<el-button type="text" @click="to_login">登录</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>

export default {
	data () {
		return {
			resetpwd: {},
			rules: {
				username: [
					{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
				],
				smscode: [
					{ required: true, min: 4, max: 6, message: '请输入正确的短信验证码' }
				],
				new_password: [
					{ required: true, min: 6, max: 16, message: '请输入6-16位密码' }
				]
			}
		}
	},
	computed: {
		interval () { return this.$store.state.resetpwd.interval; },
		countdown () { return this.$store.state.resetpwd.countdown; },
		lock () { return this.$store.state.resetpwd.lock; },
	},


	methods: {
		resetpwd_smscode () {
			this.$refs.resetpwd.validateField('username', errors => {
				if (!errors) {
					const phone = this.resetpwd.username;
					this.$store.dispatch('RESETPWD_SMSCODE_REQUEST', { phone }).then( res => {
						const interval = setInterval(() => {
							const countdown = this.$store.state.resetpwd.countdown - 1;
							this.$store.commit('RESETPWD_SMSCODE_COUNTDOWN', countdown);
						}, 1000)
						this.$store.commit('RESETPWD_SMSCODE_SUCCESS', interval);
					}).catch( err => {
						this.$store.commit('RESETPWD_SMSCODE_FAILURE', err);
					});
				} else {
					return false;
				}
			});
		},
		to_login () {
			this.$router.push({ name: 'login' });
		},
		submit_resetpwd () {
			this.$refs.resetpwd.validate((valid) => {
				if (valid) {
					this.$store.dispatch('RESETPWD_REQUEST', this.resetpwd).then( res => {
						this.$store.commit('RESETPWD_SUCCESS', res.data);
						this.$alert('密码重置成功', '提示', {
							type: 'success',
							confirmButtonText: '登录',
							callback: action => {
								this.$router.push({ name: 'login' })
							}
						})
					}).catch( err => {
						this.$store.commit('RESETPWD_FAILURE', err);
					})
				} else {
					return false;
				}
			});
		}
	}
}
</script>
