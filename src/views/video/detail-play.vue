<template>
	<div class="view">
		<div class="switch">
			<p>视频回放管理</p>
		</div>
		<div class="body">
			<p class="tips">您可以删除这里的视频，则会释放您的存储空间。</p>
		</div>
	</div>
</template>


<script>

	import { mapState, mapActions } from 'vuex'
	import debounce from 'debounce'

	export default {
		data () {
			return {
				form: {}
			}
		},
		computed: {
		},
		mounted () {
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
