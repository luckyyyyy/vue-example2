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
				<el-form-item label="性别：" prop="sex">
					<el-radio-group v-model="user.sex">
						<el-radio v-for="item in sex" :key="item.label" :label="item.label">{{ item.name }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="头像：">
					<upload
						class="avatar"
						:method="option.method"
						:action="option.action"
						:acceptn="option.acceptn"
						@success="avatar_success"
						@queue="avatar_queue"
						@fail="avatar_fail"
						@progress="avatar_progress"
					>
						<div v-show="upload.start" class="avatar__img-shadow">
							<span>{{ upload.progress }}%</span>
						</div>
						<img class="avatar__img" ref="avatar" :src="info.avatar + '/avatar'" height="80" width="80">
					</upload>
				</el-form-item>
				<el-form-item label="个性签名：" prop="description">
					<el-input type="textarea" v-model="user.description" resize="none"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="lock" htmlType="submit" type="primary" @click="submit">确认修改</el-button>
					<el-button type="ghost" @click="backConsole">返回控制台</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions, mapMutations } from 'vuex';
	import { USER_AVATAR } from '@/store/api'
	import upload from '@/components/item/upload'
	import { PROFILE_UPDATE_RULES } from '@/options/rules'

	export default {
		components: {
			upload
		},
		data () {
			return {
				sex: [
					{ label: 1, name: '保密' },
					{ label: 2, name: '男'   },
					{ label: 3, name: '女'   },
				],
				user: {},
				option: USER_AVATAR,
				upload: {
					progress: 0,
					start: false
				},
				rules: PROFILE_UPDATE_RULES,
				lock: false
			}
		},
		computed: {
			...mapState('user', {
				info: state => state.user
			})
		},
		mounted () {
			this.user = Object.assign({}, this.info);
		},
		methods: {
			...mapActions('user', {
				updateUser: 'USER_UPDATE',
			}),
			...mapMutations('user', {
				updateUserAvatar: 'USER_UPDATE_AVATAR'
			}),
			avatar_progress (event) {
				this.upload.progress = Math.floor(event.percent);
			},
			avatar_fail () {
				this.upload.start = false;
				this.$refs.avatar.src = this.info.avatar;
			},
			avatar_success (res) {
				this.updateUserAvatar(res.url);
				this.upload.start = false;
			},
			avatar_queue (files, length) {
				this.upload.start = true;
				this.$refs.avatar.src = files[0].body;
			},
			submit () {
				this.$refs.user.validate(valid => {
					if (valid) {
						this.lock = true;
						this.updateUser(this.user).then(() => {
							this.$message.success('个人资料更新成功');
							this.lock = false;
						}).catch(() => {
							this.lock = false;
						})
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
		.el-button {
			width: 100px;
		}
		.avatar {
			cursor: pointer;
			width: 80px;
			height: 80px;
			position: relative;
			.avatar__img {
				border-radius: 50%;
			}
			.avatar__img-shadow {
				content: "";
				position: absolute;
				border-radius: 50%;
				width: 100%;
				height: 100%;
				z-index: 9999;
				background: rgba(0, 0, 0, .3);
				span {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					color: white;
				}
			}
		}
	}
</style>







