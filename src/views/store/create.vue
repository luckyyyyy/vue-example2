<template>
	<div class="view">
		<el-steps :align-center="false" :center="true" :active="active" finish-status="success">
			<el-step title="选择商品类目"></el-step>
			<el-step title="编辑基本信息"></el-step>
			<el-step title="编辑商品详情"></el-step>
		</el-steps>
		<el-form ref="form" label-position="left" label-width="100px">
			<div class="setp setp1" v-show="active == 1">
				<el-radio-group v-model="radio3">
					<el-radio-button label="女人"></el-radio-button>
					<el-radio-button label="男人"></el-radio-button>
					<el-radio-button label="食品"></el-radio-button>
					<el-radio-button label="美妆"></el-radio-button>
					<el-radio-button label="亲子"></el-radio-button>
				</el-radio-group>
			</div>
			<div class="setp setp2" v-show="active == 2">
				<div class="item">
					<div class="left">
						<el-form-item label="基本信息"></el-form-item>
					</div>
					<div class="right">
						<el-form-item label="商品类目">
							食品
						</el-form-item>
						<el-form-item label="商品类型">
							<el-radio-group>
								<el-radio :label="3">实物商品 （物流发货）</el-radio>
								<el-radio :label="6">虚拟商品 （无需物流）</el-radio>
								<el-radio :label="9">电子卡券 （无需物流）</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
				</div>
				<div class="item">
					<div class="left">
						<el-form-item label="库存规格"></el-form-item>
					</div>
					<div class="right">
						<el-form-item label="商品规格">
							TODO
						</el-form-item>
						<el-form-item label="总库存">
							<el-input placeholder="请输入内容"></el-input>
							<el-checkbox v-model="checked" checked>页面不显示商品库存</el-checkbox>
							<div class="tips">
								<p>总库存为 0 时，会上架到『已售罄的商品』列表里</p>
								<p>发布后商品同步更新，以库存数字为准</p>
							</div>
						</el-form-item>
					</div>
				</div>
				<div class="item">
					<div class="left">
						<el-form-item label="商品信息"></el-form-item>
					</div>
					<div class="right">
						<el-form-item label="商品名">
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="价格">
							<el-input></el-input>
							原价：
							<el-input></el-input>
						</el-form-item>
						<el-form-item label="商品图">
							<el-upload
							  action="//jsonplaceholder.typicode.com/posts/"
							  type="drag"
							  :thumbnail-mode="true"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :default-file-list="fileList"
							>
								<div class="el-dragger__text"><em>点击上传</em></div>
							</el-upload>
							<el-upload
							  action="//jsonplaceholder.typicode.com/posts/"
							  type="drag"
							  :thumbnail-mode="true"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :default-file-list="fileList"
							>
								<div class="el-dragger__text"><em>点击上传</em></div>
							</el-upload>
							<el-upload
							  action="//jsonplaceholder.typicode.com/posts/"
							  type="drag"
							  :thumbnail-mode="true"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :default-file-list="fileList"
							>
								<div class="el-dragger__text"><em>点击上传</em></div>
							</el-upload>
							<el-upload
							  action="//jsonplaceholder.typicode.com/posts/"
							  type="drag"
							  :thumbnail-mode="true"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :default-file-list="fileList"
							>
								<div class="el-dragger__text"><em>点击上传</em></div>
							</el-upload>
							<el-upload
							  action="//jsonplaceholder.typicode.com/posts/"
							  type="drag"
							  :thumbnail-mode="true"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :default-file-list="fileList"
							>
								<div class="el-dragger__text"><em>点击上传</em></div>
							</el-upload>
						</el-form-item>
					</div>
				</div>
				<div class="item">
					<div class="left">
						<el-form-item label="物流/其他"></el-form-item>
					</div>
					<div class="right">
						<el-form-item label="运费设置">
							<div class="select">
								<el-radio class="radio" v-model="radio" label="1">统一邮费</el-radio>
								<el-input></el-input>
							</div>
							<div class="select">
								<el-radio class="radio" v-model="radio" label="2">运费模板</el-radio>
								<el-select v-model="value" placeholder="请选择">
									<el-option label="item.label" value="item.value"></el-option>
								</el-select>
							</div>
						</el-form-item>
					</div>
				</div>
			</div>
			<div class="button">
				<el-button v-show="active != 1" @click="prev">上一步</el-button>
				<el-button type="primary" @click="next">下一步</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		data () {
			return {
				input: 80,
				active: 2
			}
		},
		mounted () {
		},
		methods: {
			next () {
				 this.active++;
			},
			prev () {
				this.active--;
			}
		}
	}
</script>

<style lang="less">
	.view {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
		.setp {
			padding: 30px;
			margin: 40px 0;
		}
		.setp1 {
			background: #f7f8fa;
			text-align: center;
			.el-radio-button {
				margin: 10px;
				.el-radio-button__inner {
					width: 164px;
					padding: 20px 15px;
				}
			}
		}
		.setp2 {
			margin: 40px 0;
			.item {
				display: flex;
				.left, .right {
					box-sizing: border-box;
					margin: 10px 0;
					background: #f7f8fa;
					padding: 0 10px;
				}
				.left {
					width: 100px;
				}
				.right {
					margin-left: 10px;
					width: 100%;
					.el-input {
						width: 200px;
					}
					.select {
						margin: 10px 0;
						.el-radio {
							margin-right: 10px;
						}
					}
					.tips {
						margin: 20px 0;
						p {
							font-size: 12px;
							color: #999999;
							margin: 5px;
							line-height: 14px
						}
					}
					.el-upload {
						display: inline-block;
						margin: 5px;
					}
					.el-upload, .el-dragger {
						width: 200px;
						height: 100px;
					}
					.el-dragger__text {
						height: 100%;
						line-height: 100px;
					}
				}
			}
		}
		.button {
			text-align: center;
		}
	}
</style>
