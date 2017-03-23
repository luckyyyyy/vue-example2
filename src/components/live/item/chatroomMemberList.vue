<template>
	<ul>
		<li class="form">
			<Form inline @submit.native.prevent>
				<FormItem>
					<Input type="text" v-model="name" placeholder="请输入用户名">
						<span slot="prepend">修改用户名</span>
					</Input>
				</FormItem>
				<FormItem>
					<Button @click="updateMemberInfo" htmlType="submit" type="primary">修改</Button>
				</FormItem>
			</Form>
		</li>
		<li v-for="item in members" class="item">
			<chatroomTag :members="members" :account="item.account"></chatroomTag>
			<chatroomName :im="im" :members="members" :account="item.account" :nickname="item.nick" :me="false"></chatroomName>
		</li>
	</ul>
</template>

<script>
	import chatroomName from './chatroomName'
	import chatroomTag from './chatroomTag'
	import { mapActions, mapState } from 'vuex'
	export default {
		components: {
			chatroomName, chatroomTag
		},
		props: {
			members: Object,
			im: Object
		},
		data () {
			return {
				name: ''
			}
		},
		methods: {
			...mapActions('im', {
				update: 'IM_CHATROOM_UPDATE_MY_INFO'
			}),
			updateMemberInfo () {
				const nick = this.name;
				this.update({ nick });
			},
		}
	}
</script>

<style scoped lang="less">
	.item {
		padding: 2px 0;
		margin: 0;
		word-break: break-all;
		word-wrap: break-word;
		font-size: 0;
	}
	.form {
		padding: 10px 0;
		form {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
