<template>
	<div class="commoon-menu-view">
		<div class="commoon-menu">
			<div class="box">
				<Menu :activeName="status" @on-select="onStatusChange" width="135px">
					<li class="title">
						<i class="iconfont icon-video"></i>直播状态
					</li>
					<MenuItem :name="0">未发布</MenuItem>
					<MenuItem :name="1">发布中</MenuItem>
					<li class="title"></li>
					<MenuItem :name="3">回收站</MenuItem>
				</Menu>
				<div class="button">
    				<iButton @click="openCreateDialog" type="primary">新建直播</iButton>
				</div>
			</div>
		</div>
		<div @scroll="onScroll" class="commoon-view">
			<Spin fix v-if="loading"></Spin>
			<ul class="list">
				<li v-for="item in data" :key="item.id" class="item">
					<div class="body">
						<div class="btn">
							<qrcodePopover :text="item.liveId">
								<p slot="tips">微信扫一扫查看</p>
								<em slot="reference">二维码</em>
							</qrcodePopover>
							<confirmPopover
								@ok="onDelete(item.id)">
								<p slot="tips">您确认删除这条内容吗？</p>
								<em slot="reference">删除</em>
							</confirmPopover>
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
				</li>
			</ul>
	<!-- 		<div class="tips" >
				{{ loading ? '正在获取列表' : lock_find ? '所有直播加载完毕' : '下拉可刷新' }}
			</div> -->
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
					<iButton :loading="lock" @click="onSubmit" htmlType="submit" type="primary" :disabled="!createAgree">创 建</iButton>
				</div>
			</iForm>
			<div slot="footer" class="footer">
				<Checkbox v-model="createAgree">我已阅读</Checkbox>
				<iButton :loading="lock" @click="onSubmit" type="primary" :disabled="!createAgree">创 建</iButton>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import qrcodePopover from '../../components/item/qrcodePopover'
	import confirmPopover from '../../components/item/confirmPopover'
	import { LIVE_CREATE_RULES } from '../../options/rules'
	export default {
		components: {
			qrcodePopover, confirmPopover
		},
		data () {
			return {
				create: {
					name: ''
				},
				rules: LIVE_CREATE_RULES,
				openDialog: false,
				createAgree: true,
				status: parseInt(this.$route.params.status) || 0,
			}
		},
		computed: {
			...mapState({
				data: state => state.live_find.data,
				loading: state => state.live_find.request,
				lock: state => state.live_create.lock,
				lock_find: state => state.live_find.lock,
			}),
		},
		mounted () {
			this.getLiveList(true);
		},
		methods: {
			onScroll (e) {
				const el = e.target;
				if (el.scrollHeight - el.scrollTop - el.offsetHeight < 200 && !this.lock_find) {
					this.getLiveList();
				}
			},
			onStatusChange (val) {
				this.status = val;
				this.getLiveList(true);
				this.$router.push({ name: this.$route.name, params: { status: this.status } })
			},
			getLiveList (reload) {
				const msg = this.$Message.loading('正在加载中...', 0);
				this.$store.dispatch('LIVE_FIND_REQUEST', {
					reload,
					status: this.status
				}).then(msg);
			},
			openCreateDialog () {
				this.openDialog  = true;
				this.createAgree = true;
			},
			onDelete(id) {
				// TODO
				console.log(id)
			},
			onSubmit () {
				this.$refs.create.validate((valid) => {
					if (valid) {
						this.$store.dispatch('LIVE_CREATE_REQUEST', this.create).then(() => {
							this.create.name = '';
							this.openDialog = false;
							this.status == 0 ? this.getLiveList(true) : this.status = 0;
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
	.tips {
		text-align: center;
		padding: 10px;
		color: green;
	}
	.load {
		position: relative;
		height: 100%;
		left: 0;
		top: 0;
	}
	.list {
		overflow: auto;
		.item:nth-child(1) {
			.body {
				background-image: linear-gradient(241deg, #1190bf, #e85471);
			}
		}
		> .item {
			width: 240px;
			height: 207px;
			border-radius: 5px;
			margin-right: 25px;
			margin-bottom: 25px;
			margin-top: 0;
			box-shadow: 0 1px 7px 0 rgba(0,43,59,0.20);
			display: inline-block;
			// position: relative;
			z-index: 0;
			.create {
				display: inline-block;
			}
			&:hover {
				box-shadow: 0 1px 20px 0 rgba(0,43,59,0.20);
			}
			.body {
				height: 135px;
				border-radius: 5px 5px 0 0;
				padding: 10px 5px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				color: white;
				z-index: 1;
				background: #1190BF;
				background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.35) 100%);
				&.first {
					background-image: linear-gradient(-225deg, #1190BF 0%, #E85471 100%);
				}
				.btn {
					text-align: right;
					em {
						cursor: pointer;
						font-style: normal;
						margin-left: 10px;
						padding: 5px 10px;
						font-size: 12px;
						background: rgba(0, 0, 0, .3);
						border-radius: 100px;
						z-index: 9999;
					}
				}
				.title {
					line-height: 14px;
					align-self: center;
					span {
						display: inline-block;
						width: 150px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						vertical-align: middle;
						text-align: center;
					}
				}
			}
			.buttom {
				height: 72px;
				border-radius: 0 0 5px 5px;
				background: #F7F8FA;
				display: flex;
				flex-direction: column;
				.time {
					align-self: center;
					margin: 10px;
					font-size: 12px;
					color: #999999;
				}
				.button {
					display: flex;
					justify-content: space-around;
					margin-bottom: 8px;
					a {
						border-right: 1px solid #EBECF0;
						flex: 1;
						cursor: pointer;
						display: flex;
						justify-content: center;
						align-items: center;
						&:last-child {
							border: none;
						}
						span {
							display: none;
							font-size: 12px;
						}
						i {
							vertical-align: middle;
							font-size: 24px;
							color: #999;
							margin-bottom: 5px;
						}
						&:hover {
							span {
								display: inline-block;
								color: #1190BF;
							}
							i {
								display: none;
							}
						}
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.createDialog {
		.help {
			padding: 10px 20px;
			padding-bottom: 0;
			font-size: 12px;
			text-align: justify;
		}
		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
