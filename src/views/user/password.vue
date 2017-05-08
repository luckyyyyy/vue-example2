<template>
	<div>
		<div class="body">
			<el-form @submit.native.prevent :rules="rules" ref="password" :model="password" label-width="120px">
				<el-form-item label="原密码：" prop="oldPassword">
					<el-input placeholder="请输入原密码" type="password" v-model="password.oldPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码：" prop="newPassword">
					<el-input placeholder="请输入新密码" type="password" v-model="password.newPassword"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码：" prop="newPassword_confirm">
					<el-input placeholder="确认新密码" type="password" v-model="password.newPassword_confirm"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="lock" native-type="submit" type="primary" @click="submit">确认修改</el-button>
					<el-button type="ghost" @click="backConsole">返回控制台</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex';
	import { UPDATE_PASSWORD_RULES } from '@/options/rules'

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
				lock: false,
				password: {},
				rules: Object.assign(UPDATE_PASSWORD_RULES, {
					newPassword_confirm: [
						{ required: true, validator: checkPassword }
					]
				})
			}
		},
		methods: {
			...mapActions('user', {
				setPassword: 'USER_PASSWORD'
			}),
			submit () {
				this.$refs.password.validate((valid) => {
					if (valid) {
						this.lock = true;
						this.setPassword(this.password).then(() => {
							this.$message.success('用户密码修改成功');
							this.lock = false;
							this.password = {};
						}).catch(() => {
							this.lock = false;
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
	}
</style>







