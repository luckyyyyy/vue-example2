<template>
<!-- 	<div class="view">
		<div class="left">
			直播引导图：<el-switch @change="switchChange" v-model="enable" on-text="开" off-text="关" on-color="#87D068"></el-switch>
			<template v-if="enable">
				<p class="tips">此图片显示在进入直播页面之前，用于展示直播相关介绍内容。</p>
				<Album class="upload" @submit="selectAlbum" v-model="album">
					<el-button @click="openAlbum">点击上传图片</el-button>
					<p><i class="el-icon-warning"></i> 因手机机型众多，为保证图片正常展示，请严格按照 1080*1740 像素上传图片。图片大小4M以内支持扩展名：.png .jpg .jpeg</p>
				</Album>
			</template>
			<template v-else>
				<p class="tips">开启后，可上传图片作为直播开始前的引导图。</p>
			</template>
		</div>
		<div class="right">
			<template v-if="enable">
				<div class="iPhone-bg">
					<div class="iPhone-view">
					<!-- todo img -->
					</div>
				</div>
			</template>
		</div>
	</div> -->
</template>

<script>
	import Album from '../../components/item/album'
	export default {
		components: {
			Album
		},
		data () {
			return {
				enable: true,
				album: false,
			}
		},
		mounted () {
		},
		methods: {
			openAlbum () {
				this.album = true;
			},
			switchChange (enabled) {

			},
			selectAlbum () {

			},
			closeAlbum () {
				this.album = false;
			}
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
		}
		.el-icon-warning {
			color: #FFAA00;
		}
		.upload {
			.el-button {
				margin: 10px 0;
			}
		}
	}
	.view {
		display: flex;
		.right {
			margin-left: 30px;

		}
	}
</style>
