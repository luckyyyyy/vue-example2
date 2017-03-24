<template>
	<div>
		<div class="info-page">
			<div class="body">
				<div class="info wrap">
					<div class="head">
						<span class="title">频道信息</span>
					</div>
					<div class="box">
						<iForm class="form" @submit.native.prevent :rules="rules" :label-width="100" ref="user" :model="channel">
							<FormItem label="频道名称：" prop="nickName">
								<iInput placeholder="请输入频道名称" v-model="channel.name"></iInput>
							</FormItem>
							<FormItem label="创建时间：">
								<span>没给我</span>
							</FormItem>
							<FormItem label="认证类型：">
								<span>{{ info.wxAccountType == 2 ? '服务号' : '订阅号' }}</span>
							</FormItem>
							<template v-if="info.wxAccountType != 2">
								<FormItem label="频道二维码：">
									<Album v-model="openQrcodeAlbum" :type="4">
										<img @click="openQrcodeAlbum = true" :src="channel.wxAvatarUrl" class="img">
									</Album>
								</FormItem>
							</template>
							<FormItem label="频道LOGO：" class="img">
								<Album v-model="openLogoAlbum" :type="5">
									<img @click="openLogoAlbum = true" :src="channel.wxAvatarUrl" class="img">
								</Album>
							</FormItem>
							<FormItem label="频道简介：" prop="description">
								<iInput type="textarea" v-model="channel.description" resize="none"></iInput>
							</FormItem>
							<FormItem label="联系人：" prop="email">
								<iInput placeholder="请输入邮箱" v-model="channel.email"></iInput>
							</FormItem>
							<FormItem label="手机号：" prop="email">
								<iInput placeholder="请输入邮箱" v-model="channel.email"></iInput>
							</FormItem>
							<FormItem>
								<iButton :loading="lock" htmlType="submit" type="primary" @click="onSubmit">确认修改</iButton>
							</FormItem>
						</iForm>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Album from '../../components/item/album'
	export default {
		components: {
			Album,
		},
		data () {
			return {
				openQrcodeAlbum: false,
				openLogoAlbum: false,
				lock: false,
				channel: {

				},
				rules: {}
			}
		},
		computed: {
			...mapState('channel', {
				info: state => state.channel
			})
		},
		mounted () {
			this.channel = Object.assign({}, this.info);
		},
		methods: {
			onSubmit ()  {

			}
		}


	}
</script>

<style scoped lang="less">
	@import '../../assets/styles/views/channel/preferences';
</style>
