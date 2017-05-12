<template>
	<div class="view">
		<div class="switch">
			<p>视频回放管理</p>
		</div>
		<div class="body">
			<p class="tips">您可以删除这里的视频，则会释放您的存储空间。</p>
		</div>
		<div>
			<h1>测试</h1>
			<video  controls="controls" width="720" height="480">
				<source :src="video.medias[0].hdPlayList[0].file">
				您的浏览器不支持 video 标签。
			</video>
		</div>
	</div>
</template>


<script>

	import { mapState, mapActions } from 'vuex'
	import debounce from 'debounce'

	export default {
		data () {
			return {
				form: {},
				url: '',
			}
		},
		computed: {
			...mapState('video', ['video']),
		},
		mounted () {
			this.form = Object.assign({}, this.video.medias);
			console.log(this.form[0].hdPlayList[0].file)
			// this.url = this.form[0].hdPlayList[0].file
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
