<template>
	<div class="view">
		<div class="switch">
			<p>分享设置：</p>
			<el-switch :width="60" on-text="开启" off-text="关闭" size="large" @change="onChange" v-model="enable"></el-switch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">如果关闭，则分享默认是直播间名称和公众号头像。</p>
				<div class="action">
					<el-form label-position="left" ref="form" :model="form" label-width="100px" class="form">
						<el-form-item label="分享标题">
							<el-input @change="onDebounce" v-model="form.shareTitle" placeholder="分享标题"></el-input>
						</el-form-item>
						<el-form-item label="分享文字">
							<el-input @change="onDebounce" v-model="form.shareContent" placeholder="分享文字"></el-input>
						</el-form-item>
						<el-form-item label="分享小图">
							<el-button type="ghost" @click="openAlbum">
								<i class="el-icon-upload"></i> 上传图片
							</el-button>
							<p class="tips">
								<i class="el-icon-warning warning"></i> 400 x 400
							</p>
						</el-form-item>
					</el-form>
					<div class="preview">
						<div class="preview-box">
							<h2 class="preview__head">{{ video.name || channel.name }}</h2>
							<!-- 超级放大镜 -->
							<div class="preview__view">
								<div class="superMagnifier">
									<div class="shareTitle">{{ form.shareTitle || channel.name }}</div>
									<p class="shareContent">{{ form.shareContent || video.name }}</p>
									<img class="shareImg" :src="video.liveShare.shareImageUrl">
								</div>
							</div>
							<img class="preview__background" src="../../assets/images/live/share.jpeg" alt="直播分享">
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<p class="tips">开启后，可设置分享标题、文字和图片。若不开启，则分享默认是直播间名称和公众号头像。</p>
			</template>
		</div>
	</div>
</template>


<script>

	import { mapState, mapActions } from 'vuex'
	import debounce from 'debounce'
	import Album from '@/components/item/album'

	export default {
		data () {
			return {
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
		created () {
			this.form = Object.assign({}, this.video.liveShare);
		},
		methods: {
			...mapActions('video', {
				setShare: 'VIDEO_SHARE'
			}),
			openAlbum () {
				Album('2', (select, data) => {
					this.form.shareImageId = select;
					this.onChange()
				});
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
