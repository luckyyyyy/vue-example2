<template>
	<div>
		<div class="info-page">
			<div class="body">
				<ra-card>
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
									<img @click="openQrcodeAlbum" :src="channel.wxAvatarUrl" class="img">
								</el-form-item>
							</template>
							<el-form-item label="频道LOGO：" class="img">
								<img @click="openLogoAlbum" :src="channel.logoImageUrl + '/avatar'" class="img">
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
				</ra-card>
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
		data () {
			return {
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
			openQrcodeAlbum () {
				Album('4', (select, data) => {

				})
			},
			openLogoAlbum () {
				Album('5', (select, data) => {
					this.channel.logoImageId  = select;
					this.channel.logoImageUrl  = data.url
				})
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
