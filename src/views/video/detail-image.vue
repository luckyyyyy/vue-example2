<template>
	<div class="view">
		<div class="switch">
			<p>直播引导图：</p>
			<iSwitch size="large" @on-change="onChange" v-model="enable">
				<span slot="open">开启</span>
				<span slot="close">关闭</span>
			</iSwitch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">此图片显示在进入直播页面之前，用于展示直播相关介绍内容。</p>
				<div class="action">
					<div class="form">
						<Album class="upload" @submit="selectAlbum" v-model="openAlbum" :type="1">
							<iButton type="ghost" @click="openAlbum = true">
								<Icon type="ios-upload-outline" class="icon"></Icon> 上传图片
							</iButton>
							<p class="tips">
								<Icon type="android-warning" class="warning"></Icon> 因手机机型众多，为保证图片正常展示，请严格按照 1080*1740 像素上传图片。图片大小4M以内支持扩展名：.png .jpg .jpeg
							</p>
						</Album>
					</div>
					<div class="iPhone-bg">
						<div class="iPhone-view">
							<h2 class="head">{{video.name}}</h2>
							<div class="view">
								<img :src="video.liveGuide.guideImageUrl" height="100%" width="100%" alt="直播引导图">
							</div>
							<img class="bgImg" src="../../assets/images/live/liveguide.png"></img>
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
	import { mapState, mapActions } from 'vuex'
	import Album from '@/components/item/album'

	export default {
		components: {
			Album
		},
		data () {
			return {
				form: {},
				openAlbum: false,
			}
		},
		computed: {
			...mapState('video', ['video']),
			enable: {
				set (val) {
					this.form.guideStatus = val ? 1 : 0;
				},
				get () {
					return this.form.guideStatus == 1;
				}
			}
		},
		mounted () {
			this.form = Object.assign({}, this.video.liveGuide);
		},
		methods: {
			...mapActions('video', {
				setGuide: 'VIDEO_GUIDE'
			}),
			selectAlbum (select, data) {
				this.form.guideImageId = select;
				this.onChange()
			},
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.video.id;
				// data.videoBeginTime = moment(data.videoBeginTime).valueOf()
				this.setGuide(data);
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
