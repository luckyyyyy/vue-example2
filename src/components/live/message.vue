<template>
	<div class="message">
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
	}
</script>

<style scoped lang="less">
	.message {
		flex: 3;
		display: flex;
		flex-direction: column;
		padding-bottom: 40px;
		.list {
			height: 0; // ?
			overflow: auto;
			flex: 1;
			background: #F7F8FA;
			font-size: 12px;
			li {
				margin: 10px;
				background: #eaebed;
				display: flex;
				flex-direction: column;
				border-radius: 5px;
				.head {
					border-radius: 5px 5px 0 0;
					padding: 2px 10px;
					display: flex;
					justify-content: space-between;
					background: #fff;
					span {
						font-weight: bold;
					}
					em {
						font-style: normal;
						font-family: HelveticaNeue;
					}
				}
				.body {
					padding: 10px;
				}
			}
		}
	}
</style>
