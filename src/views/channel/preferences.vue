<template>
	<div>
		<div class="info-page">
			<div class="body">
				<Card class="commoon-card wrap" :bordered="false" dis-hover>
					<p slot="title" class="commoon-card__title">频道信息</p>
					<div class="box">
						<el-Form class="form" @submit.native.prevent :rules="rules" label-width="100px" ref="channel" :model="channel">
							<el-form-item label="频道名称：" prop="name">
								<el-input placeholder="请输入频道名称" v-model="channel.name"></el-input>
							</el-form-item>
							<el-form-item label="创建时间：">
								<span>{{ channel.createTime | date('Y-MM-DD HH:mm') }}</span>
							</el-form-item>
							<el-form-item label="认证类型：">
								<el-tag type="gray">{{ info.wxAccountType == 2 ? '服务号' : '订阅号' }}</el-tag>
							</el-form-item>
							<template v-if="info.wxAccountType != 2">
								<el-form-item label="频道二维码：">
									<Album @submit="onSelectQrcode" v-model="openQrcodeAlbum" type="4">
										<img @click="openQrcodeAlbum = true" :src="channel.wxAvatarUrl" class="img">
									</Album>
								</el-form-item>
							</template>
							<el-form-item label="频道LOGO：" class="img">
								<Album @submit="onSelectLogo" v-model="openLogoAlbum" type="5">
									<img @click="openLogoAlbum = true" :src="channel.logoImageUrl + '/avatar'" class="img">
								</Album>
							</el-form-item>
							<el-form-item label="频道简介：" prop="description">
								<el-input type="textarea" v-model="channel.description" resize="none"></el-input>
							</el-form-item>
							<el-form-item label="联系人：" prop="contacts">
								<el-input v-model="channel.contacts"></el-input>
							</el-form-item>
							<el-form-item label="手机号：" prop="phone">
								<el-input v-model="channel.phone"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button :loading="lock" native-type="submit" type="primary" @click="onSubmit">确认修改</el-button>
							</el-form-item>
						</el-Form>
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Album from '@/components/item/album'
	import { date } from '@/utils/util'
	import { CHANNEL_PREFERENCES_RULES } from '@/options/rules'

	export default {
		components: {
			Album,
		},
		data () {
			return {
				openQrcodeAlbum: false,
				openLogoAlbum: false,
				lock: false,
				channel: {},
				rules: CHANNEL_PREFERENCES_RULES
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
			...mapActions('channel', {
				updateChannel: 'CHANNEL_UPDATE'
			}),
			onSelectLogo (select, data) {
				this.channel.logoImageId  = select;
				this.channel.logoImageUrl  = data.url
			},
			onSubmit ()  {
				this.$refs.channel.validate((valid) => {
					if (valid) {
						this.lock = true;
						this.updateChannel(this.channel).then(() => {
							this.lock = false;
							this.$message.success('资料更新成功');
						}).catch(() => {
							this.lock = false;
						})
					} else {
						return false;
					}
				});
			}
		},
		filters: {
			date
		}
	}
</script>

<style scoped lang="less">
	@import '../../assets/styles/views/channel/preferences';
</style>
