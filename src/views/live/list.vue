<template>
	<div class="commoon-menu-view">
		<Affix>
			<div class="commoon-menu">
				<div class="box">
					<el-radio-group v-model="select">
						<el-radio-button label="a">未开始</el-radio-button>
						<el-radio-button label="直播中"></el-radio-button>
						<el-radio-button label="已结束"></el-radio-button>
						<div class="line"></div>
						<el-radio-button label="回收站"></el-radio-button>
					</el-radio-group>
				</div>
			</div>
		</Affix>
		<div class="commoon-view">
			<ul class="list">
				<li class="creat-live-box" @click="openCreateDialog">
					<div class="line-box">
						<span class="across-line"></span>
						<span class="vertical-line"></span>
					</div>
					<p>新建直播</p>
				</li>
				<li v-for='index in 10' class="item">
					<div class="body">
						<div class="btn">
							<qrcodePopover text="123">
								<p slot="tips">微信扫一扫查看</p>
								<em slot="reference">二维码</em>
							</qrcodePopover>
							<el-popover popper-class="delete_popper" placement="top" width="160">
								<p>删除后将无法恢复，确定删除吗？</p>
								<div class="deletee_btn">
									<el-button size="mini" type="text" @click="handleConfirm(index)">取消</el-button>
							    	<el-button type="primary" size="mini" @click="handleConfirm(index, live)">确定</el-button>
								</div>
								<em :ref="`delete_${index}`" slot="reference">删除</em>
							</el-popover>
						</div>
						<div class="title">
							<span>这是一个厂标题我耳机我其二级Oprah破壳我靠谱12323</span>
							<i class="iconfont icon-video"></i>
						</div>
					</div>
					<div class="buttom">
						<div class="time">直播开始时间：<span>未设置</span></div>
						<div class="button">
							<router-link :to="{ name: 'live_detail', params: { id: index } }">
								<i class="iconfont icon-paintfill"></i>
								<span>直播装修</span>
							</router-link>

							<router-link :to="{ name: 'live_detail_image', params: { id: index } }">
								<i class="iconfont icon-wefill"></i>
								<span>互动设置</span>
							</router-link>

							<router-link :to="{ name: 'live_control', params: { id: index } }">
								<i class="iconfont icon-rankfill"></i>
								<span>直播数据</span>
							</router-link>

							<router-link :to="{ name: 'live_detail', params: { id: index } }">
								<i class="iconfont icon-k"></i>
								<span>中控台</span>
							</router-link>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<el-dialog
			custom-class="createDialog"
			title="新建直播"
			v-model="openDialog"
			:close-on-click-modal="!lock"
			:close-on-press-escape="!lock"
			:show-close="!lock"
		>
			<el-form ref="create" :rules="rules" label-position="left" label-width="85px" :model="create" @submit.native.prevent>
				<el-form-item label="直播标题" prop="name">
					<el-input :autofocus="true" v-model="create.name" placeholder="请输入直播标题"></el-input>
				</el-form-item>
				<div class="help">
					<p>
						说明：彩虹云直播严禁上传包括反动、暴力、色情、违法及侵权内容的文件。
						平台有义务配合有关部门将上传违规文件的用户信息保存，并保留因配合调
						查及冻结账号的权利。
					</p>
					<el-checkbox v-model="createAgree">我已阅读</el-checkbox>
				</div>
				<div class="footer">
					<el-button @click="onSubmit" :loading="lock" native-type="submit" :disabled="!createAgree" type="primary">创 建</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import Affix from '../../components/item/affix'
	import qrcodePopover from '../../components/item/qrcodePopover'
	import { LIVE_CREATE_RULES } from '../../options/rules'
	export default {
		components: {
			Affix, qrcodePopover
		},
		data () {
			return {
				create: {
					name: ''
				},
				rules: LIVE_CREATE_RULES,
				openDialog: false,
				createAgree: true,
				select: 'a',
			}
		},
		computed: {
			...mapState({
				lock: state => state.live_create.lock,
			})
		},
		methods: {
			simulateClick (index) {
				const el = this.$refs[`delete_${index}`][0];
				el.click();
			},
			openCreateDialog () {
				this.openDialog  = true;
				this.create.name = '';
				this.createAgree = true;
			},
			handleConfirm(index, live) {
				this.simulateClick(index);
				if (live) {
					// commit
				}
			},
			onSubmit () {
				this.$refs.create.validate((valid) => {
					if (valid) {
						this.$store.dispatch('LIVE_CREATE_REQUEST', this.create).then(() => {
							this.openDialog = false;
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
	.list {
		display: flex;
		flex-wrap: wrap;
		li:nth-child(2) {
			.body {
				background-image: linear-gradient(241deg, #1190bf, #e85471);
			}
		}
		> li {
			width: 240px;
			height: 207px;
			border-radius: 5px;
			margin: 25px;
			box-shadow: 0 1px 7px 0 rgba(0,43,59,0.20);
			.create {
				display: inline-block;
			}
			&.creat-live-box {
				height: 203px;
				/*width: 100%;*/
				border: dashed 2px #dcdee3;
				position: relative;
				cursor: pointer;
				user-select: none;
				.line-box {
					position: absolute;
					top: 45%;
					left: 50%;
					transform: translate(-50%, -50%);
					.across-line {
						position: absolute;
						width: 32px;
						height: 2px;
						background-color: #c4c6cf;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
					.vertical-line {
						position: absolute;
						width: 2px;
						height: 32px;
						background-color: #c4c6cf;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
				p {
					color: #c4c6cf;
					position: absolute;
					top: 55%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 16px;
				}
			}
			&:hover {
				box-shadow: 0 1px 20px 0 rgba(0,43,59,0.20);
			}

			.body {
				height: 135px;
				box-sizing: border-box;
				border-radius: 5px 5px 0 0;
				background: #1190BF;
				padding: 10px 5px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				color: white;
				position: relative;
				z-index: 1;
				&.first {
					background-image: linear-gradient(-225deg, #1190BF 0%, #E85471 100%);
				}
				&:after {
					content: "";
					display: block;
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 32px;
					z-index: -1;
					background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.35) 100%);
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
						position: relative;
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
					}
					.iconfont {
						font-size: 14px;
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
	.delete_popper {
		.deletee_btn {
			text-align: right;
		}
	}
</style>
<style lang="less">
	.createDialog {
		width: 550px;
		.help {
			font-size: 12px;
			text-align: justify;
		}
		.footer {
			text-align: right;
		}
	}
</style>
