<template>
	<div>
		<div class="body">
			<el-form @submit.native.prevent :rules="rules" label-width="120px" ref="password" :model="password">
				<el-form-item label="原密码：" prop="password">
					<el-input placeholder="请输入原昵称" type="password" v-model="password.password"></el-input>
				</el-form-item>
				<el-form-item label="新密码：" prop="new_password">
					<el-input placeholder="请输入新密码" type="password" v-model="password.new_password"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码：" prop="new_password_confirm">
					<el-input placeholder="确认新密码" type="password" v-model="password.new_password_confirm"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="lock" native-type="submit" type="primary" @click="submit">确认修改</el-button>
					<el-button @click="toIndex">返回控制台</el-button>
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
				} else if (value !== this.password.new_password) {
					callback(new Error('两次输入密码不一致'));
				} else {
					callback();
				}
			};
			return {
				password: {},
				rules: {
					password: [
						{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
					],
					new_password: [
						{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
					],
					new_password_confirm: [
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
					this.$store.dispatch('PASSWORD_REQUEST', this.login);
				} else {
					return false;
				}
			});
				// this.$store.dispatch('UPDATE_USER_REQUEST', this.user);
			},
			toIndex () {
				this.$router.push({ name: 'index' })
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







