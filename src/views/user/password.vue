<template>
	<div>
		<div class="body">
			<iForm @submit.native.prevent :rules="rules" ref="password" :model="password" :label-width="120">
				<FormItem label="原密码：" prop="oldPassword">
					<iInput placeholder="请输入原密码" type="password" v-model="password.oldPassword"></iInput>
				</FormItem>
				<FormItem label="新密码：" prop="newPassword">
					<iInput placeholder="请输入新密码" type="password" v-model="password.newPassword"></iInput>
				</FormItem>
				<FormItem label="确认新密码：" prop="newPassword_confirm">
					<iInput placeholder="确认新密码" type="password" v-model="password.newPassword_confirm"></iInput>
				</FormItem>
				<FormItem>
					<iButton :loading="lock" htmlType="submit" type="primary" @click="submit">确认修改</iButton>
					<iButton type="ghost" @click="backConsole">返回控制台</iButton>
				</FormItem>
			</iForm>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex';
	import { UPDATE_PASSWORD_RULES } from '../../options/rules'

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
			...mapActions('user/password', {
				setPassword: 'PASSWORD_REQUEST'
			}),
			submit () {
				this.$refs.password.validate((valid) => {
					if (valid) {
						this.lock = true;
						this.setPassword(this.password).then(() => {
							this.$Message.success('用户密码修改成功');
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
		.ivu-input-wrapper {
			width: 240px;
		}
		.ivu-btn {
			width: 100px;
		}
	}
</style>







