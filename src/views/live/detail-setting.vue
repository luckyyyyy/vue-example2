<template>
	<div class="view">
		<div class="switch">
			<p>直播间设置</p>
		</div>
		<div class="body">
			<div class="action">
				<iForm label-position="left" ref="form" :model="form" :label-width="100" class="form">
					<FormItem label="直播间标题">
						<iInput @on-change="onDebounce" v-model="form.name" placeholder="不超过10个字符"></iInput>
					</FormItem>
					<FormItem label="直播昵称">
						<iInput @on-change="onDebounce" v-model="form.nickName" placeholder="不超过10个字符"></iInput>
					</FormItem>
					<FormItem label="直播头像">
						<Album class="upload" @submit="selectAlbum" v-model="openAlbum" :type="3">
							<iButton type="ghost" @click="openAlbum = true">点击上传图片</iButton>
							<p class="tips">
								<Icon type="android-warning"></Icon> 400 x 400
							</p>
						</Album>
					</FormItem>
				</iForm>
				<div class="iPhone-bg">
					<div class="iPhone-view">
						<!-- <h2 class="head">{{ live.name }}</h2> -->
						<!-- 放大镜 -->
						<div class="magnifier">
							<h3 class="nickName">{{ form.nickName }}</h3>
							<img class="avatar" :src="live.liveInfo.avatarImageUrl" alt="头像">
						</div>
						<img class="bgImg" src="../../assets/images/live/setting.png" height="100%" width="100%" alt="直播间设置">
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
		},
		mounted () {
			this.form = Object.assign({}, this.live.liveInfo);
		},
		methods: {
			...mapActions('live/detail', {
				liveUpdate: 'LIVE_DETAIL_UPDATE'
			}),
			selectAlbum (select, data) {
				this.form.avatarImageId = select;
				this.onChange()
			},
			onChange () {
				const data = Object.assign({}, this.form);
				data.id = this.live.id;
				this.liveUpdate(data);
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
