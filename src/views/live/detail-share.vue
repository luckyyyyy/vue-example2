<template>
	<div class="view">
		<div class="switch">
			<p>分享设置：</p>
			<iSwitch size="large" @on-change="onChange" v-model="enable">
				<span slot="open">开启</span>
				<span slot="close">关闭</span>
			</iSwitch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">如果关闭，则分享默认是直播间名称和公众号头像。</p>
				<div class="action">
					<iForm label-position="left" ref="form" :model="form" :label-width="100" class="form">
						<FormItem label="分享标题：">
							<iInput @on-change="onDebounce" v-model="form.shareTitle" placeholder="不超过10个字符"></iInput>
						</FormItem>
						<FormItem label="分享文字：">
							<iInput @on-change="onDebounce" v-model="form.shareContent" placeholder="aaaaa"></iInput>
						</FormItem>
						<FormItem label="分享小图：">
							<Album class="upload" @submit="selectAlbum" v-model="openAlbum">
								<iButton type="ghost" @click="openAlbum = true">点击上传图片</iButton>
								<p class="tips">
									<Icon type="android-warning"></Icon> 400 x 400
								</p>
							</Album>
						</FormItem>
					</iForm>
					<div class="iPhone-bg">
						<div class="iPhone-view">
							<h2 class="head">{{ live.name }}</h2>
							<!-- 超级放大镜 -->
							<div class="superMagnifier">
								<h3 class="shareTitle">{{ form.shareTitle }}</h3>
								<p class="shareContent">{{ form.shareContent }}</p>
								<img class="shareImg" :src="live.liveShare.shareImageUrl">
							</div>
							<img src="../../assets/images/live/share.jpeg" height="100%" width="100%" alt="直播分享">
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
