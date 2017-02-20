<template>
	<div>
		<div class="body">
		<!-- :rules="rules" -->
			<el-form @submit.native.prevent label-width="100px" ref="user" :model="user">
				<el-form-item label="账号：">
					<span>{{ info.phone }} <router-link :to="{ name: 'profile' }">修改密码</router-link></span>
				</el-form-item>
				<el-form-item label="昵称：">
					<el-input placeholder="请输入昵称" v-model="user.nickName"></el-input>
				</el-form-item>
				<el-form-item label="邮箱：">
					<el-input placeholder="请输入邮箱" v-model="user.email"></el-input>
				</el-form-item>
				<el-form-item label="性别：">
					<el-radio-group v-model="user.sex">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="2">女</el-radio>
						<el-radio :label="0">保密</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="头像：">
					<el-upload class="avatar" :show-upload-list="false" :action="upload.action" :headers="upload.headers" :name="upload.name">
						<img src="../../assets/qrcode.png" height="50" width="50" alt="">
					</el-upload>
				</el-form-item>
				<el-form-item label="个性签名：">
					<el-input type="textarea" v-model="user.description"></el-input>
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
	import { USER_AVATAR } from '../../options/upload'

	export default {
		data () {
			return {
				user: {},
				upload: USER_AVATAR
			}
		},
		computed: {
			...mapState({
				info: state => state.user,
				lock: state => state.update_user.lock
			})
		},
		mounted () {
			this.user = Object.assign({}, this.info);
		},
		methods: {
			submit () {
				this.$store.dispatch('UPDATE_USER_REQUEST', this.user);
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
		padding: 30px 0;
		justify-content: center;

		.el-input {
			width: 240px;
		}
		.avatar {
			cursor: pointer;
			width: 50px;
			height: 50px;
		}
	}
</style>







