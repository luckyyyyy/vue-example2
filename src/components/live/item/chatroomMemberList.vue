<template>
	<ul>
		<li v-for="item in members">
			<chatroomTag :members="members" :account="item.account"></chatroomTag>
			<chatroomName :im="im" :members="members" :account="item.account" :nickname="item.nick" :me="false"></chatroomName>
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
		props: {
			members: Object,
			im: Object
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
