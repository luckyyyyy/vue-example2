<template>
	<div class="view">
		<div class="switch">
			<p>直播间设置</p>
		</div>
		<div class="body">
			<div class="action">
				<el-form label-position="left" ref="form" :model="form" label-width="100px" class="form">
					<el-form-item label="直播标题：">
						<el-input @change="onDebounce" v-model="form.name" placeholder="不超过10个字符"></el-input>
					</el-form-item>
					<el-form-item label="直播昵称：">
						<el-input @change="onDebounce" v-model="form.nickName" placeholder="不超过10个字符"></el-input>
					</el-form-item>
					<el-form-item label="直播头像：">
						<el-button type="ghost" @click="openAlbum('3', 'avatarImage')">
							<i class="el-icon-upload"></i> 上传图片
						</el-button>
						<p class="tips">
							400 x 400
						</p>
					</el-form-item>
					<el-form-item label="直播封面：">
						<el-button type="ghost" @click="openAlbum('1', 'coverImage')">
							<i class="el-icon-upload"></i> 上传图片
						</el-button>
						<p class="tips">
							注：此图将显示在微信端频道主页
						</p>
						<p class="tips">
							大小：800*500像素
						</p>
						<!-- <el-button @click="onSubmit(1)" class="preview-button" type="primary">点击预览 <i class="el-icon-search"></i></el-button> -->
					</el-form-item>
				</el-form>
				<div class="preview">
					<div class="preview-box">
						<h2 class="preview__head">{{ live.name || channel.name }}</h2>
						<!-- 超级放大镜 -->
						<div class="preview__view">
							<div class="magnifier">
								<h3 class="nickName">{{ form.nickName || channel.name }}</h3>
								<img class="avatar" :src="live.liveInfo.avatarImageUrl" alt="头像">
							</div>
						</div>
						<img class="preview__background" src="../../assets/images/live/setting.png" alt="直播间设置">
					</div>
				</div>
			</div>
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
			...mapState('live', ['live']),
			...mapState('channel', ['channel']),
		},
		created () {
			this.form = Object.assign({}, this.live.liveInfo);
		},
		methods: {
			...mapActions('live', {
				liveUpdate: 'LIVE_UPDATE'
			}),
			openAlbum (type) {
				Album(value, (select, data) => {
					if (type == 'avatarImage') {
						this.form.avatarImageId = select;
					} else if (type === 'coverImage') {
						this.form.coverImageId = select;
					}
					return this.onChange()
				})
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
			},
			onSubmit (id) {
				this.$router.push({ name: 'channel_template', params: { templateID: id } })
			}
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
