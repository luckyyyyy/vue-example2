<template>
	<div class="view">
		<div class="switch">
			<p>直播引导图：</p>
			<iSwitch size="large" @on-change="switchChange" v-model="enable">
				<span slot="open">开启</span>
				<span slot="close">关闭</span>
			</iSwitch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">此图片显示在进入直播页面之前，用于展示直播相关介绍内容。</p>
				<div class="action">
					<div class="form">
						<Album class="upload" @submit="selectAlbum" v-model="album" :type="3">
							<iButton type="primary" @click="openAlbum">点击上传图片</iButton>
							<p class="tips">
								<Icon type="android-warning"></Icon> 因手机机型众多，为保证图片正常展示，请严格按照 1080*1740 像素上传图片。图片大小4M以内支持扩展名：.png .jpg .jpeg
							</p>
						</Album>
					</div>
					<div class="iPhone-bg">
						<div class="iPhone-view">
							<!-- TODO IMG -->
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<p class="tips">开启后，可上传图片作为直播开始前的引导图。</p>
			</template>
		</div>
	</div>
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
			selectAlbum (select, data) {
				console.log(data)
			},
			closeAlbum () {
				this.album = false;
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/live/detail.less');
</style>
