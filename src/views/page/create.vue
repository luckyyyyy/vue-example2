<template>
	<div>
		<div class="step">
			<div :class="{ active: active == 1 }" class="tab">1.创建频道</div>
			<div :class="{ active: active == 2 }" class="tab">2.绑定公众号</div>
			<div :class="{ active: active == 3 }" class="tab">3.完成！</div>
		</div>
		<div class="body">
			<template v-if="active == 1">
				<el-form class="form" @submit.native.prevent label-width="100px" ref="user" :model="user">
					<el-form-item label="频道名称：">
						<el-input placeholder="请输入名称" v-model="user.name"></el-input>
					</el-form-item>
					<el-form-item label="直播商品：">
						<el-select placeholder="请选择">
							<el-option
								v-for="item in options"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="联系地址：">
						<el-select placeholder="请选择">
							<el-option
								v-for="item in options"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select placeholder="请选择">
							<el-option
								v-for="item in options"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select placeholder="请选择">
							<el-option
								v-for="item in options"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<div class="address"><el-input placeholder="请填写具体地址" v-model="user.name"></el-input></div>
					</el-form-item>
					<el-form-item label="公司名称：">
						<el-input placeholder="请输入营业执照上的公司全名" v-model="user.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-checkbox v-model="user.agree" checked>我已阅读并同意 <a>彩虹云直播用户协议</a></el-checkbox>
					</el-form-item>
					<el-form-item>
						<el-button :loading="lock" native-type="submit" type="primary" @click="submit">创建</el-button>
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
					<el-button type="primary" size="large">绑定微信公众号</el-button>
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
	import { mapState } from 'vuex';

	export default {
		data () {
			return {
				active: 1,
				user: {},
				options: [{
				  value: '选项1',
				  label: '黄金糕'
				}, {
				  value: '选项2',
				  label: '双皮奶'
				}, {
				  value: '选项3',
				  label: '蚵仔煎'
				}, {
				  value: '选项4',
				  label: '龙须面'
				}, {
				  value: '选项5',
				  label: '北京烤鸭'
				}],
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
				width: 240px;
			}
			.el-select {
				width: 120px;
			}
			.address {
				margin-top: 10px;
				.el-input {
					width: 300px;
				}
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







