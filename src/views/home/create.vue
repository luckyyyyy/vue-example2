<template>
	<div>
		<div class="step">
			<div :class="{ active: active == 1 }" class="tab">1.创建频道</div>
			<div :class="{ active: active == 2 }" class="tab">2.绑定公众号</div>
			<div :class="{ active: active == 3 }" class="tab">3.完成！</div>
		</div>
		<div class="body">
			<template v-if="active == 1">
				<iForm class="form" @submit.native.prevent :rules="rules" :label-width="100" ref="create" :model="create">
					<FormItem label="频道名称：" prop="name">
						<iInput placeholder="请输入名称" v-model="create.name"></iInput>
					</FormItem>
					<FormItem label="直播商品：" prop="commodityCatalog">
						<iSelect :disabled="option.length == 0" placeholder="请选择" v-model="create.commodityCatalog">
							<iOption
								v-for="item in option"
								:key="item.label"
								:label="item.label"
								:value="item.value">
							</iOption>
						</iSelect>
					</FormItem>
					<FormItem label="联系地址：" prop="area">
						<Cascader
							class="cascader"
							:data="area"
							filterable
							size="large"
							v-model="create.area">
						</Cascader>
					</FormItem>
					<FormItem>
						<iInput class="address" placeholder="请填写具体地址" v-model="create.address"></iInput>
					</FormItem>
					<FormItem label="公司名称：">
						<iInput placeholder="请输入营业执照上的公司全名" v-model="create.companyName"></iInput>
					</FormItem>
					<FormItem>
						<Checkbox v-model="create.agree">我已阅读并同意 <a>彩虹云直播用户协议</a></Checkbox>
					</FormItem>
					<FormItem>
						<iButton :disabled="!create.agree" :loading="lock" htmlType="submit" type="primary" @click="submit">创建频道</iButton>
					</FormItem>
				</iForm>
			</template>
			<template v-if="active == 2">
				<div class="logo">
					<img src="../../assets/logo2.png" height="28" width="39" alt="彩虹云直播">
					<strong>彩虹云直播</strong>
					<span>基于微信公众号直播 + 电商的全场景化应用解决方案</span>
				</div>
				<div class="button">
					<iButton :disabled="!url" type="primary" size="large" @click="openWxUrl">{{ !url ? '正在获取微信授权' : '绑定微信公众号' }}</iButton>
					<a class="wx" target="_blank" href="https://www.baidu.com">还没有公众号？去申请吧 ></a>
				</div>
				<div class="tips">
					<strong>说明：</strong>
					<p>1. 绑定微信公众号不会对您的公众号造成任何影响，自定义菜单、回复规则及图文素材等将保持原样；</p>
					<p>2.绑定微信公众号只能公众号管理员完成，请确保您是管理员或联系他协助您完成绑定；</p>
				</div>
			</template>
			<template v-if="active == 3">
				<div class="success">
					<Icon type="checkmark-circled"></Icon>
					<p>恭喜，您的频道已创建成功！</p>
					<iButton @click="onSelect" type="success" size="large">进入店铺管理后台</iButton>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import area from '../../options/area.json'
	import { CHANNEL_CREATE_RULES } from '../../options/rules'

	export default {
		data () {
			return {
				success: false,
				rules: CHANNEL_CREATE_RULES,
				create: {
					agree: true,
					commodityCatalog: '',
				},
				area: area,
				url: '',
				lock: false,
			}
		},
		computed: {
			active () {
				if (this.success) {
					return 3;
				} else if (this.id) {
					this.getWechatAuthUrl({ channelID: this.id }).then(url => {
						this.url = url;
					}).catch(err =>{
						if (err.data) {
							if (err.data.retCode == -100) {
								this.success = true;
							} else if (err.data.retCode == -101) {
								this.$router.push({ name: 'create_channel' })
							} else {
								this.$Modal.error({
									okText: '重新获取',
									content: err.data.retMsg,
									onOk: () => {
										window.location.reload();
									}
								})
							}
						}
					});
					return 2;
				} else {
					this.getCatalogs();
					return 1;
				}
			},
			...mapGetters('catalogs', ['option']),
			catalogs () {
				return this.$store.getters.option;
			},
			id () {
				return this.$route.params.id;
			}
		},
		methods: {
			...mapActions('weixin_auth', {
				getWechatAuthUrl: 'WEXIN_AUTH_URL_REQUEST'
			}),
			...mapActions('catalogs', {
				getCatalogs: 'COMMODITY_CATALOGS_REQUEST'
			}),
			...mapActions('channel/create', {
				createChannel: 'CHANNEL_CREATE_REQUEST'
			}),
			...mapActions('channel', {
				selectChannel: 'CHANNEL_SELECT',
				queryChannel: 'CHANNEL_QUERY'
			}),
			submit () {
				this.$refs.create.validate(valid => {
					if (valid) {
						this.create.province = this.create.area[0];
						this.create.city     = this.create.area[1];
						this.create.county   = this.create.area[2];
						this.createChannel(this.create).then(data => {
							this.$router.push({ name: 'create_channel', params: { id: data.channel.channelId } })
						})
					} else {
						return false;
					}
				});
			},
			openWxUrl () {
				window.open(this.url);
				this.$Modal.confirm({
					title: '提示',
					content: '请在弹出的页面中完成公众号绑定，如果未弹出请检查浏览器设置。',
					okText: '已成功绑定',
					cancelText: '绑定失败',
					closable: false,
					loading: true,
					onOk: () => {
						this.queryChannel(this.id).then(data => {
							this.$Modal.remove();
							if (data.channel.status == 2) {
								this.success = true;
							} else {
								this.$Message.error('绑定未成功，请尝试重新打开连接绑定，或询问我们的客服。', 5);
								// this.$Modal.error({
								// 	title: '提示',
								// 	content: '绑定未成功，请尝试重新打开连接绑定，或询问我们的客服。',
								// })
							}
						});
					},
					onCancel: () => {
						this.$Message.info('请尝试重新打开连接绑定，或询问我们的客服。', 5);
					}
				});
			},
			onSelect () {
				this.selectChannel(this.id);
			}
		}
	}
</script>

<style lang="less" scoped>
	.step {
		display: flex;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		.tab {
			flex: 1;
			height: 40px;
			line-height: 40px;
			background: #eff2f7;
			border-right: 1px solid #d3dce6;
			border-bottom: 1px solid #d3dce6;
			text-align: center;

			&:last-child {
				border-right: 0;
			}
			&.active {
				background: #3399ff;
				color: white;
			}

		}
	}
	.body {
		height: 100%;
		padding-top: 40px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.form {
			.address {
				width: 300px;
			}
		}
		.logo {
			display: flex;
			align-items: center;
			flex-direction: column;
			img {
				background: #f2f2f2;
				box-sizing: initial;
				padding: 15px 10px;
				border-radius: 50%;
			}
			strong {
				margin: 10px;
			}
		}
		.button {
			margin: 40px 0;
			display: flex;
			flex-direction: column;
			.wx {
				margin: 15px;
			}
		}
		.tips {
			p {
				margin: 0;
			}
		}
		.success {
			display: flex;
			flex-direction: column;
			align-items: center;
			i {
				font-size: 80px;
				color: #00cc66;
			}
			p {
				margin: 20px;
			}
			button {
				margin-bottom: 120px;
			}
		}
	}
</style>







