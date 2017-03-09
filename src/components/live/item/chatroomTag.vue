<template>
	<i v-if="members[account]" :class="members[account].type"></i>
</template>


<script>
	export default {
		props: {
			item: Object,
			account: String,
			members: Object,
		},
	}
</script>

<style scoped lang="less">
	i {
		font-size: 12px;
		margin-right: 5px;
		&.owner {
			&:after {
				content: '创始者';
				background-color: rgba(255,73,73,.1);
				border-color: rgba(255,73,73,.2);
				color: #ff4949;
			}
		}
		&.manager {
			&:after {
				content: '管理员';
				background-color: rgba(18,206,102,.1);
				border-color: rgba(18,206,102,.2);
				color: #13ce66;
			}
		}
		&.restricted {
			&:after {
				content: '禁';
				background: black;
			}
		}
		&.common {
			&:after {
				content: '会员';
				background-color: rgba(32,160,255,.1);
				border-color: rgba(32,160,255,.2);
				color: #20a0ff;
			}
		}
		&.guest {
			&:after {
				// content: '游客';
				// background: red;
			}
		}
		&:after {
			line-height: 20px;
			padding: 0 2px;
			color: white;
			font-style: normal;
			border-radius: 4px;
			box-sizing: border-box;
			border: 1px solid transparent;
			display: inline-block;
		}
	}
</style>
