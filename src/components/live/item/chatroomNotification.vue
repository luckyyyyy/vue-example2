<template>
	<span v-if="item.attach.type == 'memberEnter'" :class="item.attach.type"> 欢迎 <em>{{ item.attach.fromNick }}</em> 进入了聊天室。</span>
	<span v-else-if="item.attach.type == 'memberExit'" :class="item.attach.type"><em>👌 {{ item.attach.fromNick }}</em> 离开了聊天室。</span>
	<span v-else-if="item.attach.type == 'gagMember'" :class="item.attach.type">
		<em>😓 {{ item.attach.fromNick }}</em> 将 <em> {{ item.attach.toNick.join('，') }}</em> 禁言
	</span>
	<span v-else-if="item.attach.type == 'ungagMember'" :class="item.attach.type">
		<em>😯 {{ item.attach.fromNick }}</em> 将 <em> {{ item.attach.toNick.join('，') }}</em> 解除禁言
	</span>
	<span v-else-if="item.attach.type == 'addCommon'" :class="item.attach.type">
		<em>✅ {{ item.attach.fromNick }}</em> 将 <em> {{ item.attach.toNick.join('，') }}</em> 设置为会员
	</span>
	<span v-else-if="item.attach.type == 'removeCommon'" :class="item.attach.type">
		<em>❌ {{ item.attach.fromNick }}</em> 将 <em> {{ item.attach.toNick.join('，') }}</em> 移除会员
	</span>
	<span v-else-if="item.attach.type == 'addManager'" :class="item.attach.type">
		<em>🐈 {{ item.attach.fromNick }}</em> 将 <em> {{ item.attach.toNick.join('，') }}</em> 加入管理员
	</span>
	<span v-else-if="item.attach.type == 'removeManager'" :class="item.attach.type">
		<em>🐩 {{ item.attach.fromNick }}</em> 将 <em> {{ item.attach.toNick.join('，') }}</em> 移除管理员
	</span>
</template>

<script>
	export default {
		props: {
			item: Object,
		},
		computed: {
			members () {
				return this.$store.getters.chatroom_members;
			}
		},
	}
</script>
<style scoped>
	em {
		font-weight: bold;
		font-style: normal;
		color: #fff;
	}
	span {
		font-size: 12px;
		color: #999999;
	}
</style>
