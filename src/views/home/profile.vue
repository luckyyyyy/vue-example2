<template>
	<div>
		<div class="body">
			<iForm @submit.native.prevent :rules="rules" :label-width="100" ref="user" :model="user">
				<FormItem label="账号：">
					<span>{{ info.phone }} <router-link :to="{ name: 'password', query: { redirect: $route.query.redirect } }">修改密码</router-link></span>
				</FormItem>
				<FormItem label="昵称：" prop="nickName">
					<iInput placeholder="请输入昵称" v-model="user.nickName"></iInput>
				</FormItem>
				<FormItem label="邮箱：" prop="email">
					<iInput placeholder="请输入邮箱" v-model="user.email"></iInput>
				</FormItem>
				<FormItem label="性别：" prop="sex">
					<RadioGroup v-model="user.sex">
						<Radio v-for="item in sex" :key="item.label" :label="item.label">{{ item.name }}</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="头像：">
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
						<img class="avatar__img" ref="avatar" :src="info.avatar" height="80" width="80">
					</upload>
				</FormItem>
				<FormItem label="个性签名：" prop="description">
					<iInput type="textarea" v-model="user.description" resize="none"></iInput>
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
	import { mapState } from 'vuex';
	import { USER_AVATAR } from '../../store/api'
	import upload from '../../components/item/upload'
	import { PROFILE_UPDATE_RULES } from '../../options/rules'

	export default {
		components: {
			upload
		},
		data () {
			return {
				sex: [
					{ label: 0, name: '保密' },
					{ label: 1, name: '男'   },
					{ label: 2, name: '女'   },
				],
				user: {},
				option: USER_AVATAR,
				upload: {
					progress: 0,
					start: false
				},
				rules: PROFILE_UPDATE_RULES
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
				this.upload.progress = Math.floor(event.percent);
			},
			avatar_fail () {
				this.upload.start = false;
				this.$refs.avatar.src = this.info.avatar;
			},
			avatar_success (res) {
				this.$store.commit('UPDATE_USER_AVATAR', res.url);
				this.upload.start = false;
			},
			avatar_queue (files, length) {
				this.upload.start = true;
				this.$refs.avatar.src = files[0].body;
			},
			submit () {
				this.$refs.user.validate(valid => {
					if (valid) {
						this.$store.dispatch('UPDATE_USER_REQUEST', this.user).then(() => {
							this.$Message.success('个人资料更新成功');
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
		.ivu-input-wrapper {
			width: 240px;
		}
		.ivu-btn {
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







