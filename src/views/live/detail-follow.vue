<template>
	<div class="view">
		<div class="switch">
			<p>关注观看：</p>
			<iSwitch size="large" @on-change="switchChange" v-model="enable">
				<span slot="open">开启</span>
				<span slot="close">关闭</span>
			</iSwitch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">如果关闭，则分享默认是直播间名称和公众号头像</p>
				<div class="action">
					<div class="form">
					TODO：这里好像还有个选项我忘了 等看设计稿
						<Album class="upload" @submit="selectAlbum" v-model="album">
							<iButton type="primary" @click="openAlbum">点击上传图片</iButton>
							<p class="tips">
								<Icon type="android-warning"></Icon> 订阅号需要您手动上传关注二维码
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
				<p class="tips">开启后，可设置分享标题、文字和图片。若不开启，则分享默认是直播间名称和公众号头像</p>
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
	@import url('../../assets/styles/live/detail.less');
</style>