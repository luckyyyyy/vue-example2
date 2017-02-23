<template>
	<div>
		<div class="step">
			<div :class="{ active: active == 1 }" class="tab">1.创建频道</div>
			<div :class="{ active: active == 2 }" class="tab">2.绑定公众号</div>
			<div :class="{ active: active == 3 }" class="tab">3.完成！</div>
		</div>
		<div class="body">
			<template v-if="active == 1">
				<el-form class="form" @submit.native.prevent :rules="rules" label-width="100px" ref="create" :model="create">
					<el-form-item label="频道名称：" prop="name">
						<el-input placeholder="请输入名称" v-model="create.name"></el-input>
					</el-form-item>
					<el-form-item label="直播商品：" prop="commodityCatalog">
						<el-select :disabled="lock_catalogs" placeholder="请选择" v-model="create.commodityCatalog">
							<el-option
								v-for="item in catalogs"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="联系地址：">
						<el-cascader
							class="cascader"
							:options="area"
							v-model="create.area">
						</el-cascader>
					</el-form-item>
					<el-form-item>
						<el-input class="address" placeholder="请填写具体地址" v-model="create.address"></el-input>
					</el-form-item>
					<el-form-item label="公司名称：">
						<el-input placeholder="请输入营业执照上的公司全名" v-model="create.companyName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-checkbox v-model="create.agree">我已阅读并同意 <a>彩虹云直播用户协议</a></el-checkbox>
					</el-form-item>
					<el-form-item>
						<el-button :disabled="!create.agree" :loading="lock" native-type="submit" type="primary" @click="submit">创建频道</el-button>
					</el-form-item>
				</el-form>
			</template>
			<template v-if="active == 2">
				<div class="logo">
					<img src="../../assets/logo2.png" height="28" width="39" alt="彩虹云直播">
					<strong>彩虹云直播</strong>
					<span>基于微信公众号直播 + 电商的全场景化应用解决方案</span>
				</div>
				<div class="button">
					<el-button :disabled="lock_open_button" type="primary" size="large" @click="openWxUrl">绑定微信公众号</el-button>
					<a class="wx" href="">还没有公众号？去申请吧 ></a>
				</div>
				<div class="tips">
					<strong>说明：</strong>
					<p>1. 绑定微信公众号不会对您的公众号造成任何影响，自定义菜单、回复规则及图文素材等将保持原样；</p>
					<p>2.绑定微信公众号只能公众号管理员完成，请确保您是管理员或联系他协助您完成绑定；</p>
				</div>
			</template>
			<template v-if="active == 3">
				<div class="success">
					恭喜，您的频道已创建成功！
					<el-button type="primary" size="large">进入店铺管理后台</el-button>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import { mapState, mapGetters } from 'vuex';
	import area from '../../options/area.json'
	export default {
		data () {
			return {
				rules: {
					email: [
						{ type: 'email', message: '请输入正确的邮箱' }
					],
					name: [
						{ required: true, max: 12, message: '频道名称小于12个字符' }
					],
					commodityCatalog: [
						{ required: true, type: 'number', message: '请选择正确的分类' }
					]
				},
				create: {
					agree: true,
					commodityCatalog: '',
				},
				area: area,
			}
		},
		computed: {
			active () {
				if (this.$route.params.id) {
					this.$store.dispatch('WEXIN_AUTH_URL_REQUEST', { channelID: this.$route.params.id });
					return 2;
				} else {
					this.$store.dispatch('COMMODITY_CATALOGS_REQUEST');
					return 1;
				}
			},
			...mapState({
				lock_catalogs: state => state.catalogs.lock,
				lock: state => state.channel_create.lock,
				lock_open_button: state => state.weixin_auth_url.lock,
				url: state => state.weixin_auth_url.url,
			}),
			catalogs () {
				return this.$store.getters.option;
			}

		},
		methods: {
			submit () {
				this.$refs.create.validate((valid) => {
					if (valid) {
						this.create.province = this.create.area[0];
						this.create.city     = this.create.area[1];
						this.create.county   = this.create.area[2];
						this.$store.dispatch('CHANNEL_CREATE_REQUEST', this.create);
					} else {
						return false;
					}
				});
			},
			openWxUrl () {
				window.open(this.url);
				this.$confirm('请在弹出的页面中完成公众号绑定，如果未弹出请检查浏览器设置。', '提示', {
					confirmButtonText: '已成功绑定',
					cancelButtonText: '绑定失败',
					closeOnPressEscape: false,
					closeOnClickModal: false,
					type: 'warning'
				}).then(() => {
					alert('then 现在什么都没做');
				}).catch(() => {
					alert('catch 现在什么都没做');
				});


			},
			toIndex () {
				this.$router.push({ name: 'index' })
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
				background: #1190BF;
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
			.el-input {
				width: 300px;
			}
			.el-select {
				width: 300px;
			}
			.address, .el-cascader {
				width: 300px;
			}
		}
		.logo {
			display: flex;
			align-items: center;
			flex-direction: column;
			img {
				background: #f2f2f2;
				padding: 15px 10px;
				border-radius: 50%;
			}
			strong {
				margin: 10px;
			}
		}
		.button {
			margin: 60px 0;
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
			.el-button {
				margin: 20px 0;
			}
		}
	}
</style>







