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
	import Album from '@/components/item/album'

	export default {
		components: {
			Album
		},
		data () {
			return {
				openAlbum: false,
				form: {}
			}
		},
		computed: {
			...mapState('channel', ['channel']),
			...mapState('video', ['video']),
			enable: {
				set (val) {
					this.form.shareStatus = val ? 1 : 0;
				},
				get () {
					return this.form.shareStatus == 1;
				}
			}

		},
		mounted () {
			this.form = Object.assign({}, this.video.liveShare);
		},
		methods: {
			...mapActions('video', {
				setShare: 'VIDEO_SHARE'
			}),
			selectAlbum (select, data) {
				this.form.shareImageId = select;
				this.onChange()
			},
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.video.id;
				this.setShare(data);
			},
			onDebounce () {
				if (!this.debounce) {
					this.debounce = debounce(this.onChange, 200);
				}
				this.debounce();
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
