<template>
	<ul>
		<li v-for="item in members">
			<chatroomTag :account="item.account"></chatroomTag>
			<chatroomName :account="item.account" :nickname="item.nick" :me="false"></chatroomName>
		</li>
	</ul>
</template>

<script>
	import chatroomName from './chatroomName'
	import chatroomTag from './chatroomTag'
	export default {
		components: {
			chatroomName, chatroomTag
		},
		computed: {
			members () {
				return this.$store.getters.chatroom_members;
			}
		},
		props: {
			members: Object,
		}
	}
</script>

<style scoped>
	li {
		padding: 2px 0;
		margin: 0;
		word-break: break-all;
		word-wrap: break-word;
		font-size: 0;
	}
</style>
