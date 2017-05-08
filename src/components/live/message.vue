<template>
	<div class="message" ref="iScrollWrap">
		<ul class="list">
			<li v-for="item of service">
				<div class="head">
					<span>{{ item.type | L }}</span>
					<em>{{ item.date | date('HH:mm:ss') }}</em>
				</div>
				<div class="body">
					<template v-if="item.type == 'DEBUG'">
						<p>{{ item.content }}</p>
					</template>
					<template v-if="item.type == 'LIVE_STREAM_STATUS'">
						<p>{{ item.content.desc }}：{{ item.content.action | L }}</p>
					</template>
					<template v-if="item.type == 'SYSTEM_TIPS'">
						<p>{{ item.content }}</p>
					</template>
					<template v-if="item.type == 'LIVE_NOTICE'">
						<p>{{ item.content.msg }}</p>
					</template>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import iScroll from 'iscroll'
	import { mapState } from 'vuex'
	import _L from '@/options/live/message'
	import { date } from '@/utils/util'

	export default {
		computed: {
			...mapState('im', ['service'])
		},
		filters: {
			date,
			L (txt) {
				return _L[txt] || txt;
			}
		},
		watch: {
			service(val){
				if(!this.scroll){
					this.scroll = new iScroll(this.$refs.iScrollWrap,{
						mouseWheel: true,
							preventDefaultException: {
								tagName: /^(div|P|SPAN)$/
							},
						scrollbars: true,
						fadeScrollbars: true,
						interactiveScrollbars: true,
						shrinkScrollbars: 'clip',
					});
				}
				this.$nextTick(() => {
					this.scroll.refresh();
					this.scroll.scrollTo(0, this.scroll.maxScrollY, 500);
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/components/live/message";
</style>
