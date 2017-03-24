<template>
	<div class="view">
		<div class="switch">
			<p>直播间设置</p>
		</div>
		<div class="body">
			<div class="action">
				<iForm label-position="left" ref="form" :model="form" :label-width="100" class="form">
					<FormItem label="直播间名字">
						<iInput @on-change="onDebounce" v-model="form.shareTitle" placeholder="不超过10个字符"></iInput>
					</FormItem>
					<FormItem label="主播名字">
						<iInput @on-change="onDebounce" v-model="form.shareContent" placeholder="aaaaa"></iInput>
					</FormItem>
					<FormItem label="主播头像">
						<Album class="upload" @submit="selectAlbum" v-model="openAlbum" :type="3">
							<iButton type="primary" @click="openAlbum = true">点击上传图片</iButton>
							<p class="tips">
								<Icon type="android-warning"></Icon> 400 x 400
							</p>
						</Album>
					</FormItem>
				</iForm>
				<div class="iPhone-bg">
					<div class="iPhone-view">
						<!-- TODO IMG -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Album from '../../components/item/album'
	import { mapState, mapActions } from 'vuex'
	import debounce from 'debounce'
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
			...mapState('live', ['live']),
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
			this.form = Object.assign({}, this.live.liveShare);
			this.onDebounce = debounce(this.onChange, 200)
		},
		methods: {
			...mapActions('live/detail', {
				setShare: 'LIVE_DETAIL_SHARE'
			}),
			selectAlbum (select, data) {
				this.form.shareImageId = select;
				this.onChange()
			},
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.live.id;
				// this.setShare(data);
			},
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
