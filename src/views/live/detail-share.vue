<template>
	<div class="view">
		<div class="switch">
			<p>分享设置：</p>
			<iSwitch size="large" @on-change="switchChange" v-model="enable">
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
							<iInput v-model="form.name" placeholder="不超过10个字符"></iInput>
						</FormItem>
						<FormItem label="分享文字：">
							<iInput v-model="form.name" placeholder="aaaaa"></iInput>
						</FormItem>
						<FormItem label="分享小图：">
							<Album class="upload" @submit="selectAlbum" v-model="album">
								<iButton type="primary" @click="openAlbum">点击上传图片</iButton>
								<p class="tips">
									<Icon type="android-warning"></Icon> 400 x 400
								</p>
							</Album>
						</FormItem>
					</iForm>
					<div class="iPhone-bg">
						<div class="iPhone-view">
							<!-- TODO IMG -->
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
	import moment from 'moment'
	export default {
		data () {
			return {
				enable: true,
				form: {
					name: '',
					time: moment().add(30, 'm').toDate(),//moment().format(),
					date: moment().toDate()
				},
			}
		},
		mounted () {
		},
		methods: {
			switchChange (enabled) {

			},
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/live/detail.less');
</style>
