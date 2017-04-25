<template>
	<div class="view">
		<div class="switch">
			<p>关注观看：</p>
			<iSwitch size="large" @on-change="switchChange" v-model="enable">
				<span slot="open">开启</span>
				<span slot="close">关闭</span>
			</iSwitch>
		</div>
		<div class="body">
			<template v-if="enable">
				<p class="tips">如果关闭，这里字也错了。</p>
				<div class="action">
					<div class="form">
						写点介绍给他们。。。。。。。。。。。。。。。。
					</div>
					<div class="iPhone-bg">
						<div class="iPhone-view">
							<!-- TODO IMG -->
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<p class="tips">开启后能干嘛？</p>
			</template>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data () {
			return {
				attentionWatchStatus: 0
			}
		},
		computed: {
			...mapState('live', ['live']),
			enable: {
				set (val) {
					this.attentionWatchStatus = val ? 1 : 0;
				},
				get () {
					return this.attentionWatchStatus == 1;
				}
			}
		},
		mounted () {
			this.attentionWatchStatus = this.live.attentionWatchStatus;
		},
		methods: {
			...mapActions('live/detail', {
				setWatch: 'LIVE_WATCH'
			}),
			switchChange (enabled) {
				this.setWatch({ id: this.live.id, attentionWatchStatus: this.attentionWatchStatus })
			},
		}
	}
</script>

<style scoped lang="less">
	@import url('../../assets/styles/views/live/detail.less');
</style>
