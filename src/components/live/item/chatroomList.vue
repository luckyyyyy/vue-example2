<template>
	<div>
		<p v-for="item in data" :class="item.type" :title="item.time | date">
			<!-- http://dev.netease.im/docs?doc=web&#聊天室消息 -->
			<template v-if="item.type == 'text'">
				<chatroomTag :account="item.from"></chatroomTag>
				<chatroomName :account="item.from" :nickname="item.fromNick" :me="item.flow == 'out'">：</chatroomName>
				<span>{{ item.text }}</span>
			</template>
			<template v-if="item.type == 'notification'">
				<chatroomNotification :item="item"></chatroomNotification>
			</template>
		</p>
		<div v-show="history && data.length" class="history"></div>
	</div>
</template>
<script>
	import { date } from '../../../utils/util'
	import chatroomName from './chatroomName'
	import chatroomTag from './chatroomTag'
	import chatroomNotification from './chatroomNotification'
	export default {
		components: {
			chatroomName, chatroomTag, chatroomNotification
		},
		props: {
			data: Array,
			history: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			members () {
				return this.$store.getters.chatroom_members;
			}
		},
		filters: {
			date
		},
	}
</script>
<style lang="less" scoped>
	.history {
		text-align: center;
		color: #ccc;
		position: relative;
		border-top: 1px solid #eee;
		margin: 20px 0;
		&:after {
			content: "以上是历史信息";
			position: absolute;
			width: 100px;
			margin-left: -50px;
			left: 50%;
			top: -10px;
			background: #f7f8fa;
		}
	}
	p {
		padding: 2px 0;
		margin: 0;
		word-break: break-all;
		word-wrap: break-word;
		font-size: 0; // 去空格
		span {
			font-size: 12px;
		}
	}
</style>
