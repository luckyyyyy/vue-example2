<template>
	<div class="view">
		<div class="switch">
			<p>直播引导图：</p>
			<el-switch :width="60" on-text="开启" off-text="关闭" size="large" @change="onChange" v-model="enable"></el-switch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">此图片显示在进入直播页面之前，用于展示直播相关介绍内容。</p>
				<div class="action">
					<div class="form">
						<el-button type="ghost" @click="openAlbum">
							<i class="el-icon-upload"></i> 上传图片
						</el-button>
						<p class="tips">
							<i class="el-icon-warning warning"></i>
							因手机机型众多，为保证图片正常展示，请严格按照 1080*1740 像素上传图片。图片大小4M以内支持扩展名：.png .jpg .jpeg
						</p>
					</div>
					<div class="preview">
						<div class="preview-box">
							<h2 class="preview__head">{{ live.name }}</h2>
							<div class="preview__view">
								<img class="guide" :src="live.liveGuide.guideImageUrl" alt="直播引导图">
							</div>
							<img class="preview__background" src="../../assets/images/live/liveguide.png">
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
import Vue from 'vue';
	import { mapState, mapActions } from 'vuex'
	import Album from '@/components/item/album'

	export default {
		data () {
			return {
				form: {},
			}
		},
		computed: {
			...mapState('live', ['live']),
			enable: {
				set (val) {
					this.form.guideStatus = val ? 1 : 0;
				},
				get () {
					return this.form.guideStatus == 1;
				}
			}
		},
		created () {
			this.form = Object.assign({}, this.live.liveGuide);
		},
		methods: {
			...mapActions('live', {
				setGuide: 'LIVE_GUIDE'
			}),
			openAlbum () {
				Album('1', (select, data) => {
					this.form.guideImageId = select;
					this.onChange()
				});
			},
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.live.id;
				// data.liveBeginTime = moment(data.liveBeginTime).valueOf()
				this.setGuide(data);
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
