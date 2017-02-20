<template>
	<div>
		<div class="body">
		<!-- :rules="rules" -->
			<el-form @submit.native.prevent label-width="100px" ref="password" :model="password">
				<el-form-item label="原密码：">
					<el-input placeholder="请输入原昵称" type="password" v-model="password.nickName"></el-input>
				</el-form-item>
				<el-form-item label="新密码：">
					<el-input placeholder="请输入新密码" type="password" v-model="password.nickName"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码：">
					<el-input placeholder="确认新密码" type="password" v-model="password.nickName"></el-input>
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
			return {
				password: {},
				rules: {
					phone: [
						{ required: true, max: 20, message: '请填写正确的用户名' }
					],
					password: [
						{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
					],
				}
			}
		},
		computed: {
			...mapState({
				lock: state => state.update_user.lock
			})
		},
		mounted () {
		},
		methods: {
			submit () {
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







