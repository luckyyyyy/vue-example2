<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<el-menu :default-active="status" @select="onStatusChange">
					<li class="title">
						直播列表
					</li>
					<el-menu-item index="private">未发布</el-menu-item>
					<el-menu-item index="public">已发布</el-menu-item>
					<!-- <li class="title"></li> -->
					<el-menu-item index="trash">回收站</el-menu-item>
				</el-menu>
				<div class="button">
    				<el-button @click="openCreateDialog" type="primary" class="menu-btn">
    					新建直播<i class="iconfont icon-add"></i>
    				</el-button>
				</div>
			</div>
		</div>
		<div ref="list" class="commoon-view">
			<el-row class="list" v-if="data.length">
				<el-col v-for="item in data" :key="item.id" class="item" :xs="12" :sm="12" :md="8" :lg="6">
					<div class="box">
						<div class="body">
							<img src="../../assets/test.png">
							<div class="status" :class="{ done: item.streamStatus === 'publish' }">
								{{ item.streamStatus === 'publish' ? '推流中' : '未推流' }}
							</div>
							<div class="active">
								<template v-if="item.trashStatus">
									<em @click="onChangeStatus(item.id, `您确定要恢复直播 ${item.name}`)">恢复</em>
									<em @click="onChangeStatus(item.id, `您确定彻底要删除直播 ${item.name} 吗？一旦删除，将彻底无法恢复。`, true)">彻底删除</em>
								</template>
								<template v-else>
									<template v-if="!item.publicStatus">
										<em @click="onChangePublic(item.id, `您确定要发布直播 ${item.name} 吗？发布后在微信端公开展示给用户。`)">发布</em>
									</template>
									<template v-else>
										<em @click="onChangePublic(item.id, `您确定要撤回直播 ${item.name} 吗？撤回后微信端用户无法查看直播。`)">撤回</em>
									</template>
									<em @click="onChangeStatus(item.id, `您确定要删除直播 ${item.name} 吗？`)">删除</em>
								</template>
							</div>
							<div class="title">
								<span>{{ item.name }}</span>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：
								<template v-if="item.countDownStatus">
									<span class="date">{{ item.liveCountDown.liveBeginTime | date('Y-MM-DD HH:mm') }}</span>
								</template>
								<template v-else>
									<span>未设置</span>
								</template>
							</div>
							<div class="button">
								<template v-if="!item.trashStatus">
									<router-link :to="{ name: 'live_detail', params: { liveid: item.id } }">
										<i class="iconfont icon-paintfill"></i>
										<span>直播装修</span>
									</router-link>
								</template>
								<template v-if="!item.trashStatus">
									<router-link :to="{ name: 'live_detail_image', params: { liveid: item.id } }">
										<i class="iconfont icon-wefill"></i>
										<span>互动设置</span>
									</router-link>
								</template>
								<router-link :to="{ name: 'live_data', params: { liveid: item.id } }">
									<i class="iconfont icon-rankfill"></i>
									<span>直播数据</span>
								</router-link>
								<template v-if="!item.trashStatus">
									<router-link :to="{ name: 'live_control', params: { liveid: item.id } }">
										<i class="iconfont icon-k"></i>
										<span>中控台</span>
									</router-link>
								</template>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<div v-else class="tips" v-loading="loading">
				<template v-if="!data.length && !loading">没有数据啦QAQ</template>
			</div>
		</div>
		<el-dialog title="新建直播" :visible.sync="openDialog" :close-on-click-modal="false" custom-class="live-dialog" @close="onCloseDialog">
			<el-form ref="create" :rules="rules" label-position="left" label-width="85px" :model="create" @submit.native.prevent>
				<el-form-item label="直播标题" prop="name">
					<el-input autofocus v-model="create.name" placeholder="请输入直播标题"></el-input>
				</el-form-item>
				<div class="live-dialog__help">
					说明：彩虹云直播严禁上传包括反动、暴力、色情、违法及侵权内容的文件。
					平台有义务配合有关部门将上传违规文件的用户信息保存，并保留因配合调
					查及冻结账号的权利。
				</div>
				<div style="display: none;">
					<el-button @click="onSubmit" native-type="submit" :disabled="!createAgree">创 建</el-button>
				</div>
			</el-form>
			<div slot="footer" class="live-dialog__footer">
				<el-checkbox v-model="createAgree">我已阅读</el-checkbox>
				<div class="live-dialog__btns">
					<el-button :disabled="lock_create" @click="onCloseDialog">取 消</el-button>
					<el-button :loading="lock_create" @click="onSubmit" type="primary" :disabled="!createAgree">创 建</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { mapState, mapActions } from 'vuex'
	import { LIVE_CREATE_RULES } from '@/options/rules'
	import { date } from '@/utils/util'

	export default {
		data () {
			return {
				create: {
					name: ''
				},
				rules: LIVE_CREATE_RULES,
				openDialog: false,
				createAgree: true,
				status: this.$route.params.status || 'private',
				loading: false,
				lock_create: false,
			}
		},
		computed: {
			...mapState('live', ['data', 'lock']),
		},
		mounted () {
			this.findLiveList(true);
		},
		methods: {
			...mapActions('live', {
				getLiveList: 'LIVE_FIND_REQUEST',
				createLive: 'LIVE_CREATE',
				trashLive: 'LIVE_TRASH',
				deleteLive: 'LIVE_DELETE',
				livePublic: 'LIVE_PUBLIC',
			}),
			onStatusChange (val) {
				this.status = val;
				this.findLiveList(true);
				this.$router.push({ name: this.$route.name, params: { status: this.status } })
			},
			findLiveList (reload) {
				if (!this.lock || reload && !this.loading) {
					this.loading = true;
					this.getLiveList({ reload, status: this.status }).then(() => {
						this.loading = false;
					}).catch(() => {
						this.loading = false;
					})
				}
			},
			openCreateDialog () {
				this.openDialog  = true;
				this.createAgree = true;
			},
			onChangePublic (id, message) {
				this.$confirm(message, '直播', {
					type: 'warning',
					beforeClose: async (action, instance, done) => {
						try {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								await this.livePublic({ id }).then(() => {
									this.findLiveList(true);
								});
							}
							instance.confirmButtonLoading = false;
							done();
						} catch(e) {
							instance.confirmButtonLoading = false;
							done();
						}
					},
				})
			},
			onChangeStatus(id, message, confirmDelete) {
				const api = confirmDelete ? this.deleteLive : this.trashLive;
				this.$confirm(message, '直播', {
					type: 'warning',
					beforeClose: async (action, instance, done) => {
						try {
							if (action === 'confirm') {
								instance.confirmButtonLoading = true;
								await api({ id }).then(() => {
									this.findLiveList(true);
								});
							}
							instance.confirmButtonLoading = false;
							done();
						} catch(e) {
							instance.confirmButtonLoading = false;
							done();
						}
					},
				})
			},
			onSubmit () {
				this.$refs.create.validate(valid => {
					if (valid) {
						this.lock_create = true;
						this.createLive(this.create).then(() => {
							this.onCloseDialog();
							this.status      == 'private' ? this.findLiveList(true) : this.onStatusChange('private');
						}).catch(() => {
							this.lock_create = false;
						})
					} else {
						return false;
					}
				});
			},
			onCloseDialog () {
				this.create.name = '';
				this.openDialog  = false;
				this.lock_create = false;
			}
		},
		filters: {
			date
		},
	}
</script>
<style lang="less" scoped>
	@import "../../assets/styles/views/live/list";
</style>
<style lang="less">
	.live-dialog {
		width: 580px;
		&__help {
			padding: 10px 10px 0;
			font-size: 12px;
			text-align: justify;
		}

		&__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
