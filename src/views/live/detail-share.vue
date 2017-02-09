<template>
	<div class="view">
		<div class="left">
			分享设置：<el-switch @change="switchChange" v-model="enable" on-text="开" off-text="关" on-color="#87D068"></el-switch>
			<template v-if="enable">
				<p class="tips">如果关闭，则分享默认是直播间名称和公众号头像</p>
				<el-form label-position="left" ref="form" :model="form" label-width="120px" class="form">
					<el-form-item label="分享标题:" label-width="80px">
						<el-input v-model="form.title" placeholder="10个字符以内"></el-input>
					</el-form-item>
					<el-form-item label="分享文字:" label-width="80px">
						<el-input v-model="form.text" placeholder="20个字符以内"></el-input>
					</el-form-item>
					<div class="upload">
						<el-upload :show-upload-list="false">
							<svg width="100px" height="100px" viewBox="382 348 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<!-- Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch -->
								<desc>Created with Sketch.</desc>
								<defs>
									<rect id="path-1" x="382" y="348" width="100" height="100" rx="4"></rect>
									<mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="100" height="100" fill="white">
										<use xlink:href="#path-1"></use>
									</mask>
								</defs>
								<use id="Rectangle-72-Copy-15" stroke="#D9D9D9" mask="url(#mask-2)" stroke-width="2" stroke-dasharray="4" fill="#FBFBFB" fill-rule="evenodd" xlink:href="#path-1"></use>
								<text id="上传图片" stroke="none" fill="none" font-family="PingFangSC-Regular, PingFang SC" font-size="12" font-weight="normal" line-spacing="18">
									<tspan x="408" y="417" fill="#666666">上传图片</tspan>
								</text>
								<g id="plus" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(418.000000, 368.000000)">
									<path d="M26.6976744,15.1757106 L15.1757106,15.1757106 L15.1757106,26.4082687 C15.1757106,27.1281654 14.5932817,27.7105943 13.873385,27.7105943 L13.873385,27.7105943 C13.1534884,27.7105943 12.5710594,27.1281654 12.5710594,26.4082687 L12.5710594,15.1757106 L1.30232558,15.1757106 C0.582428941,15.1757106 0,14.5932817 0,13.873385 L0,13.873385 C0,13.1534884 0.582428941,12.5710594 1.30232558,12.5710594 L12.5710594,12.5710594 L12.5710594,1.30232558 C12.5710594,0.582428941 13.1534884,0 13.873385,0 L13.873385,0 C14.5932817,0 15.1757106,0.582428941 15.1757106,1.30232558 L15.1757106,12.5710594 L26.6976744,12.5710594 C27.4175711,12.5710594 28,13.1534884 28,13.873385 L28,13.873385 C28,14.5932817 27.4175711,15.1757106 26.6976744,15.1757106 L26.6976744,15.1757106 Z" id="Shape" fill="#999999" transform="translate(14.000000, 13.855297) scale(1, -1) translate(-14.000000, -13.855297) "></path>
								</g>
							</svg>
						</el-upload>
						<p class="tips">大小：400 x 400像素</p>
					</div>
				</el-form>
			</template>
			<template v-else>
				<p class="tips">开启后，可设置分享标题、文字和图片。若不开启，则分享默认是直播间名称和公众号头像</p>
			</template>
		</div>
		<div class="right">
			<template v-if="enable">
				<div class="iPhone-bg">
					<div class="iPhone-view">
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	export default {
		data () {
			return {
				enable: true,
				form: {
					name: '',
					time: moment().add(30, 'm').toDate(),//moment().format(),
					date: moment().toDate()
				},
			}
		},
		mounted () {
		},
		methods: {
			switchChange (enabled) {

			},
		}
	}
</script>

<style scoped lang="less">
	.left {
		width: 510px;
		.tips {
			font-size: 12px;
			color: #999;
		}
		.form {
			margin-top: 30px;
			margin-left: 10px;
			.upload {
				margin-left: 75px;
				.el-upload {
					margin-left: 5px;
					width: 100px;
					display: inline-block;
					cursor: pointer;
				}
			}
		}
	}
	.view {
		display: flex;
		.right {
			margin-left: 30px;
			.iPhone-view {
			}
		}
	}
</style>
