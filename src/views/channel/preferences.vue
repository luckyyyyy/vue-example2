<template>
	<div>
		<div class="info-page">
			<div class="body">
				<Card class="commoon-card wrap" :bordered="false" dis-hover>
					<p slot="title" class="commoon-card__title">频道信息</p>
					<div class="box">
						<iForm class="form" @submit.native.prevent :rules="rules" :label-width="100" ref="channel" :model="channel">
							<FormItem label="频道名称：" prop="name">
								<iInput placeholder="请输入频道名称" v-model="channel.name"></iInput>
							</FormItem>
							<FormItem label="创建时间：">
								<span>{{ channel.createTime | date('Y-MM-DD HH:mm') }}</span>
							</FormItem>
							<FormItem label="认证类型：">
								<Tag type="dot" color="blue">{{ info.wxAccountType == 2 ? '服务号' : '订阅号' }}</Tag>
							</FormItem>
							<template v-if="info.wxAccountType != 2">
								<FormItem label="频道二维码：">
									<Album @submit="onSelectQrcode" v-model="openQrcodeAlbum" type="4">
										<img @click="openQrcodeAlbum = true" :src="channel.wxAvatarUrl" class="img">
									</Album>
								</FormItem>
							</template>
							<FormItem label="频道LOGO：" class="img">
								<Album @submit="onSelectLogo" v-model="openLogoAlbum" type="5">
									<img @click="openLogoAlbum = true" :src="channel.logoImageUrl + '/avatar'" class="img">
								</Album>
							</FormItem>
							<FormItem label="频道简介：" prop="description">
								<iInput type="textarea" v-model="channel.description" resize="none"></iInput>
							</FormItem>
							<FormItem label="联系人：" prop="contacts">
								<iInput placeholder="联系人：" v-model="channel.contacts"></iInput>
							</FormItem>
							<FormItem label="手机号：" prop="phone">
								<iInput placeholder="手机号：" v-model="channel.phone"></iInput>
							</FormItem>
							<FormItem>
								<iButton :loading="lock" htmlType="submit" type="primary" @click="onSubmit">确认修改</iButton>
							</FormItem>
						</iForm>
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import Album from '../../components/item/album'
	import { date } from '../../utils/util'
	import { CHANNEL_PREFERENCES_RULES } from '../../options/rules'
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
				this.channel.logoImageId  = select;;
				this.channel.logoImageUrl = data.url;
			},
			onSubmit ()  {
				this.$refs.channel.validate((valid) => {
					if (valid) {
						this.lock = true;
						this.updateChannel(this.channel).then(() => {
							this.lock = false;
							this.$Message.success('资料更新成功');
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
