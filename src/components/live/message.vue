<template>
	<div class="message" ref="iScrollWrap">
		<ul class="list" ref="list">
			<li v-for="item of message">
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
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import _L from '../../options/live/message'
	import { date } from '../../utils/util'
	import iScroll from 'iscroll'
	export default {
		computed: {
			message () {
				this.$nextTick(() => {
					const $el = this.$refs.list;
					$el.scrollTop = $el.scrollHeight + $el.offsetHeight;
				});
				return this.$store.state.im.service;
			}
		},
		filters: {
			date,
			L (txt) {
				return _L[txt] || txt;
			}
		},
		watch: {
			message(val){
				if(!this.myScroll){
					this.myScroll = new iScroll(this.$refs.iScrollWrap,{
						scrollbars: true,
						mouseWheel: true,
					});
				}
				this.$nextTick(() => { // 不知道什么BUG
					this.myScroll.refresh();
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/styles/components/live/message";
</style>
<style>
	.iScrollLoneScrollbar{
		width: 10px !important;
		padding-left: 2px;
	}
	.iScrollIndicator{
		border: none !important;
		width: 5px !important;
		opacity: 0.5 !important;
		border-radius: 21px !important;
		background-color: rgba(196, 198, 207, 0.4) !important;
	}
</style>
