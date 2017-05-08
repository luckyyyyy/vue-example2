<template>
	<ul>
		<li class="form">
			<el-form inline @submit.native.prevent class="chatroom-edit-form">
				<el-input type="text" v-model="name" placeholder="请输入用户名">
					<span slot="prepend">用户名</span>
					<el-button slot="append" @click="updateMemberInfo" native-type="submit" type="primary">修改</el-button>
				</el-input>
			</el-form>
		</li>
		<li v-for="item in members" class="item">
			<chatroomTag :members="members" :account="item.account"></chatroomTag>
			<chatroomName :im="im" :members="members" :account="item.account" :nickname="item.nick" :me="false"></chatroomName>
		</li>
	</ul>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	import chatroomName from '@/components/live/item/chatroomName'
	import chatroomTag from '@/components/live/item/chatroomTag'

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
	}
</style>

<style lang="less">
	.chatroom-edit-form {
		.el-input__inner {
			background-color: #343647;
			border: none;
			color: #fff;
			box-shadow: none;
			&:focus, &:hover {
				background-color: lighten(#343647, 5%);
			}
		}
		.el-input-group__append, .el-input-group__prepend {
			border: 0;
			background: lighten(#343647, 15%);
			color: white;
			button {
				background: lighten(#343647, 15%);
				border-color: lighten(#343647, 15%);
			}
		}
		.el-input-group__prepend  {
			background-color: lighten(#343647, 5%);
		}
	}
</style>
