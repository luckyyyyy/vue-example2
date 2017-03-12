<template>
	<el-dropdown
		v-if="
			(!members[account] ||
				members[account] &&
				members[account].type != 'owner' &&
				account != user.accid
			)
			&& getAuth(2)
			"
		trigger="click"
		style="cursor: pointer"
	>
		<em class="name" :class="{ me }">{{ nickname }}<slot></slot></em>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item disabled>{{ nickname }}</el-dropdown-item>
			<template v-if="!members[account]">
				<el-dropdown-item v-show="getAuth(1)" @click.native="setUser('manager', true)">设为管理员</el-dropdown-item>
				<el-dropdown-item v-show="getAuth(2)" @click.native="setUser('common', true)">设为会员</el-dropdown-item>
				<el-dropdown-item v-show="getAuth(2)" @click.native="setUser('gag', true)" divided>禁言</el-dropdown-item>
			</template>
			<template v-else>
				<template v-if="members[account].type != 'manager'">
					<el-dropdown-item v-show="getAuth(1)" @click.native="setUser('manager', true)">设为管理员</el-dropdown-item>
				</template>
				<template v-else-if="members[account].type == 'manager'">
					<el-dropdown-item v-show="getAuth(1)" @click.native="setUser('manager', false)">取消管理员</el-dropdown-item>
				</template>
				<template v-if="members[account].type != 'manager' && members[account].type != 'common'">
					<el-dropdown-item v-show="getAuth(2)" @click.native="setUser('common', true)">设为会员</el-dropdown-item>
				</template>
				<template v-else-if="members[account].type == 'common'">
					<el-dropdown-item v-show="getAuth(2)" @click.native="setUser('common', false)">取消会员</el-dropdown-item>
				</template>
				<template v-if="members[account].type != 'restricted'">
					<el-dropdown-item v-show="getAuth(2)" @click.native="setUser('gag', true)" divided>禁言</el-dropdown-item>
				</template>
				<template v-else-if="members[account].type == 'restricted'">
					<el-dropdown-item v-show="getAuth(2)" @click.native="setUser('gag', false)" divided>解除禁言</el-dropdown-item>
				</template>
			</template>
		</el-dropdown-menu>
	</el-dropdown>
	<em v-else class="name" :class="{ me }">{{ nickname }}<slot></slot></em>
</template>


<script>
	export default {
		props: {
			item: Object,
			account: String,
			nickname: String,
			me: Boolean,
		},
		computed: {
			user () {
				return this.$store.state.user.userImInfo;
			},
			members () {
				return this.$store.getters.chatroom_members;
			}
		},
		methods: {
			getAuth (level) {
				const member = this.members[this.user.accid];
				if (member) {
					switch (level) {
						case 1:
							return ['owner'].includes(member.type);
						case 2:
							return ['owner', 'manager'].includes(member.type);
						default:
							// statements_def
							break;
					}
				}
				return false;
			},
			setUser (command, isAdd) {
				const account = this.account;
				switch (command) {
					case 'manager':
						this.$store.dispatch('IM_CHATROOM_MANAGER', { account, isAdd })
						break;
					case 'common':
						this.$store.dispatch('IM_CHATROOM_COMMON', { account, isAdd, level: 1 })
						break;
					case 'gag':
						this.$store.dispatch('IM_CHATROOM_GAG', { account, isAdd })
						break;
					default:
						// statements_def
						break;
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.name {
		font-style: normal;
		font-size: 12px;
		color: #0076FF;
		&.me {
			color: red;
		}
	}
</style>
