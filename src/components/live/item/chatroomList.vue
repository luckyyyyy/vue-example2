<template>
	<div>
		<p v-for="item in data" :class="item.type">
			<!-- http://dev.netease.im/docs?doc=web&#聊天室消息 -->
			<template v-if="item.type == 'text'">
				<em :class="item.flow">{{ item.fromNick }}：</em><span>{{ item.text }}</span>
			</template>
			<template v-if="item.type == 'notification'">
				<template v-if="item.attach.type == 'memberEnter'">
					<span :class="item.attach.type">💡 欢迎 <em>{{ item.attach.fromNick }}</em> 进入了聊天室。</span>
				</template>
				<template v-if="item.attach.type == 'memberExit'">
					<span :class="item.attach.type"><em>👌 {{ item.attach.fromNick }}</em> 离开了聊天室。</span>
				</template>
			</template>
		</p>
		<p v-show="history" class="history"></p>
	</div>
</template>
<script>
	export default {
		props: {
			data: Array,
			history: {
				type: Boolean,
				default: false,
			},
		}
	}
</script>
<style lang="less" scoped>
	.history {
		text-align: center;
		color: #ccc;
		position: relative;
		border-top: 1px solid #eee;
		margin: 20px;
		&:after {
			content: "以上是历史信息";
			position: absolute;
			width: 100px;
			margin-left: -50px;
			left: 50%;
			top: -10px;
			background: #f7f8fa
		}
	}
	p {
		padding: 2px 0;
		margin: 0;
		em {
			font-style: normal;
			&.in {
				color: #0076FF;
			}
			&.out {
				color: red;
			}
		}
	}
</style>
