<template>
	<div>
		<div class="body">
			<el-form @submit.native.prevent :rules="rules" label-width="100px" ref="user" :model="user">
				<el-form-item label="账号：">
					<span>{{ info.phone }} <router-link :to="{ name: 'password', query: { redirect: $route.query.redirect } }">修改密码</router-link></span>
				</el-form-item>
				<el-form-item label="昵称：" prop="nickName">
					<el-input placeholder="请输入昵称" v-model="user.nickName"></el-input>
				</el-form-item>
				<el-form-item label="邮箱：" prop="email">
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
					<el-progress v-show="upload.start" class="progress" :percentage="upload.progress"></el-progress>
					<upload
						v-show="!upload.start"
						class="avatar"
						:method="option.method"
						:action="option.action"
						:acceptn="option.acceptn"
						@success="avatar_success"
						@fail="avatar_fail"
						@progress="avatar_progress"
					>
						<img :src="info.avatar" height="80" width="80">
					</upload>
				</el-form-item>
				<el-form-item label="个性签名：">
					<el-input type="textarea" v-model="user.description"></el-input>
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
	import { USER_AVATAR } from '../../store/api'
	import upload from '../../components/item/upload'
	export default {
		components: {
			upload
		},
		data () {
			return {
				user: {},
				option: USER_AVATAR,
				upload: {
					progress: 0,
					start: false
				},
				rules: {
					email: [
						{ type: 'email', message: '请输入正确的邮箱' }
					],
					nickName: [
						{ max: 20, message: '昵称请小于20个字符' }
					],
				}
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
			avatar_progress (event) {
				this.upload.start = true;
				this.upload.progress = Math.floor(event.percent);
			},
			avatar_fail (res) {
				this.upload.start = false;
			},
			avatar_success (res) {
				this.$store.commit('UPDATE_USER_AVATAR', res.data.url);
				this.upload.start = false;
			},
			submit () {
				this.$refs.user.validate(valid => {
					if (valid) {
						this.$store.dispatch('UPDATE_USER_REQUEST', this.user);
					} else {
						return false;
					}
				})
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
		.progress {
			height: 40px;
			display: flex;
			align-items: center;
		}
		.avatar {
			cursor: pointer;
			width: 80px;
			height: 80px;
			img {
				border-radius: 50%;
			}
		}
	}
</style>







