<template>
	<div>
		<div class="body">
			<el-form @submit.native.prevent :rules="rules" label-width="120px" ref="password" :model="password">
				<el-form-item label="原密码：" prop="oldPassword">
					<el-input placeholder="请输入原密码" type="oldPassword" v-model="password.oldPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码：" prop="newPassword">
					<el-input placeholder="请输入新密码" type="password" v-model="password.newPassword"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码：" prop="new_password_confirm">
					<el-input placeholder="确认新密码" type="password" v-model="password.newPassword_confirm"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="lock" native-type="submit" type="primary" @click="submit">确认修改</el-button>
					<el-button @click="backConsole">返回控制台</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';

	export default {
		data () {
			const checkPassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.password.newPassword) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				password: {},
				rules: {
					oldPassword: [
						{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
					],
					newPassword: [
						{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
					],
					newPassword_confirm: [
						{ validator: checkPassword, required: true, min: 6, max: 16 }
					],
				}
			}
		},
		computed: {
			...mapState({
				lock: state => state.password.lock
			})
		},
		methods: {
			submit () {
				this.$refs.password.validate((valid) => {
					if (valid) {
						this.$store.dispatch('PASSWORD_REQUEST', this.password).then(() => {
							this.$message({
								type: 'success',
								message: '用户密码修改成功'
							})
						})
					} else {
						return false;
					}
				});
			},
			backConsole () {
				if (this.$route.query.redirect) {
					this.$router.push({ path: this.$route.query.redirect })
				} else {
					this.$router.push({ name: 'index' })
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.body {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		.el-input {
			width: 240px;
		}
	}
</style>







