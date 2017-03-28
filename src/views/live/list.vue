<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<Menu :activeName="status" @on-select="onStatusChange" width="135px">
					<li class="title">
						直播列表
					</li>
					<MenuItem name="private">未发布</MenuItem>
					<MenuItem name="public">已发布</MenuItem>
					<li class="title"></li>
					<MenuItem name="trash">回收站</MenuItem>
				</Menu>
				<div class="button">
    				<iButton @click="openCreateDialog" type="primary" class="commoon-menu-btn">新建直播<i class="iconfont icon-add"></i></iButton>
				</div>
			</div>
		</div>
		<div ref="list" class="commoon-view">
			<!-- <Spin fix v-if="loading"></Spin> -->
			<Row class="list" v-show="data.length">
				<Col v-for="item in data" :key="item.id" className="item" :xs="12" :sm="12" :md="8" :lg="6">
					<div class="box">
						<div class="body">
							<div class="top">
								<div class="status">
									<em :class="item.streamStatus">
										{{ item.streamStatus == 'publish' ? '推流中' : '未推流' }}
									</em>
								</div>
								<div class="active">
									<template v-if="item.trashStatus">
										<em @click="onChangeStatus(item.id, `您确定要恢复直播【${item.name}】`)">恢复</em>
										<em @click="onChangeStatus(item.id, `您确定彻底要删除直播【${item.name}】<br>一旦删除，将彻底无法恢复。`, true)">彻底删除</em>
									</template>
									<template v-else>
										<template v-if="!item.publicStatus">
											<em @click="onChangePublic(item.id, `您确定要发布直播【${item.name}】<br>发布后在微信端公开展示给用户。`)">发布</em>
										</template>
										<template v-else>
											<em @click="onChangePublic(item.id, `您确定要撤回直播【${item.name}】<br>撤回后微信端用户无法查看直播。`)">撤回</em>
										</template>
										<em @click="onChangeStatus(item.id, `您确定要删除直播【${item.name}】`)">删除</em>
									</template>

								</div>
							</div>
							<div class="title">
								<span>{{ item.name }}</span>
							</div>
						</div>
						<div class="buttom">
							<div class="time">直播开始时间：<span>未设置</span></div>
							<div class="button">
								<router-link :to="{ name: 'live_detail', params: { liveid: item.id } }">
									<i class="iconfont icon-paintfill"></i>
									<span>直播装修</span>
								</router-link>

								<router-link :to="{ name: 'live_detail_image', params: { liveid: item.id } }">
									<i class="iconfont icon-wefill"></i>
									<span>互动设置</span>
								</router-link>

								<router-link :to="{ name: 'live_data', params: { liveid: item.id } }">
									<i class="iconfont icon-rankfill"></i>
									<span>直播数据</span>
								</router-link>

								<router-link :to="{ name: 'live_control', params: { liveid: item.id } }">
									<i class="iconfont icon-k"></i>
									<span>中控台</span>
								</router-link>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<div v-show="!loading && !data.length" class="tips">
				没有数据啦QAQ
			</div>
		</div>

		<Modal
			:width="550"
			title="新建直播"
			v-model="openDialog"
			:maskClosable="false"
			className="createDialog"
		>
			<iForm ref="create" :rules="rules" label-position="left" :label-width="85" :model="create" @submit.native.prevent>
				<FormItem label="直播标题" prop="name">
					<iInput :autofocus="true" v-model="create.name" placeholder="请输入直播标题"></iInput>
				</FormItem>
				<div class="help">
					<p>
						说明：彩虹云直播严禁上传包括反动、暴力、色情、违法及侵权内容的文件。
						平台有义务配合有关部门将上传违规文件的用户信息保存，并保留因配合调
						查及冻结账号的权利。
					</p>
				</div>
				<div style="display: none;">
					<iButton :loading="lock_create" @click="onSubmit" htmlType="submit" type="primary" :disabled="!createAgree">创 建</iButton>
				</div>
			</iForm>
			<div slot="footer" class="footer">
				<Checkbox v-model="createAgree">我已阅读</Checkbox>
				<iButton :loading="lock_create" @click="onSubmit" type="primary" :disabled="!createAgree">创 建</iButton>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { LIVE_CREATE_RULES } from '../../options/rules'
	import iscroll from 'iscroll'
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
			...mapState('live/find', ['data', 'lock']),
		},
		mounted () {
			this.findLiveList(true);
		},
		methods: {
			...mapActions('live/find', {
				getLiveList: 'LIVE_FIND_REQUEST'
			}),
			...mapActions('live/create', {
				createLive: 'LIVE_CREATE_REQUEST'
			}),
			...mapActions('live/trash', {
				trashLive: 'LIVE_TRASH_REQUEST'
			}),
			...mapActions('live/delete', {
				deleteLive: 'LIVE_DELETE_REQUEST'
			}),
			...mapActions('live/public', {
				livePublic: 'LIVE_PUBLIC_REQUEST'
			}),
			onStatusChange (val) {
				this.status = val;
				this.findLiveList(true);
				this.$router.push({ name: this.$route.name, params: { status: this.status } })
			},
			findLiveList (reload) {
				if (!this.lock || reload) {
					const msg = this.$Message.loading('正在加载中...', 0);
					this.loading = true;
					this.getLiveList({ reload, status: this.status }).then(() => {
						this.loading = false;
						msg();
						if (!this.listScroll) {
							this.listScroll = new iscroll(this.$refs.list, {
								mouseWheel: true,
								// preventDefault: false,
								scrollbars: true,
								fadeScrollbars: true,
								interactiveScrollbars: true,
								shrinkScrollbars: 'clip',
							})
							this.listScroll.on('scrollStart', () => {
								this.findLiveList();
							});
						}
						this.$nextTick(() => {
							if (reload) {
								this.listScroll.scrollTo(0, 0);
							}
							this.listScroll.refresh();
						})
					}).catch(() => {
						this.loading = false;
						msg();
					});
				}
			},
			openCreateDialog () {
				this.openDialog  = true;
				this.createAgree = true;
			},
			onChangePublic (id, content) {
				this.$Modal.confirm({
					title: '直播',
					content,
					loading: true,
					onOk: () => {
						this.livePublic({ id }).then(() => {
							this.$Modal.remove();
							this.findLiveList(true);
						}).catch(() => {
							this.$Modal.remove();
						})
					}
				})
			},
			onChangeStatus(id, content, confirmDelete) {
				const api = confirmDelete ? this.deleteLive : this.trashLive;
				this.$Modal.confirm({
					title: '直播',
					content,
					loading: true,
					onOk: () => {
						api({ id }).then(() => {
							this.$Modal.remove();
							this.findLiveList(true);
						}).catch(() => {
							this.$Modal.remove();
						})
					}
				})
			},
			onSubmit () {
				this.$refs.create.validate(valid => {
					if (valid) {
						this.lock_create = true;
						this.createLive(this.create).then(() => {
							this.create.name = '';
							this.openDialog  = false;
							this.lock_create = false;
							this.status      == 'private' ? this.findLiveList(true) : this.onStatusChange('private');
						}).catch(() => {
							this.lock_create = false;
						})
					} else {
						return false;
					}
				});
			}
		}
	}
</script>


<style lang="less" scoped>
	@import "../../assets/styles/views/live/list";
</style>
