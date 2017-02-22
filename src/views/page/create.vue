<template>
	<div>
		<div class="step">
			<div :class="{ active: active == 1 }" class="tab">1.创建频道</div>
			<div :class="{ active: active == 2 }" class="tab">2.绑定公众号</div>
			<div :class="{ active: active == 3 }" class="tab">3.完成！</div>
		</div>
		<div class="body">
			<template v-if="active == 1">
				<el-form class="form" @submit.native.prevent :rules="rules" label-width="100px" ref="user" :model="create">
					<el-form-item label="频道名称：" prop="name">
						<el-input placeholder="请输入名称" v-model="create.name"></el-input>
					</el-form-item>
					<el-form-item label="直播商品：" prop="commodityCatalog">
						<el-select placeholder="请选择" v-model="create.commodityCatalog">
							<el-option
								v-for="item in options"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="联系地址：">
						<el-cascader
							:options="options2"
							v-model="create.city">
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
					<el-button type="primary" size="large" @click="openWxUrl">绑定微信公众号</el-button>
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
					commodityCatalog: ''
				},
options2: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
				options: [{
				  value: 0,
				  label: '黄金糕'
				}, {
				  value: 1,
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
			active () {
				if (this.$route.params.id) {
					return 2;
				} else {
					return 1;
				}
			}
		},
		mounted () {
		},
		methods: {
			submit () {
				// this.$store.dispatch('UPDATE_USER_REQUEST', this.user);
			},
			openWxUrl () {

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







