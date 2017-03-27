<template>
	<i v-if="members[account]" :class="members[account].type"></i>
</template>


<script>
	export default {
		props: {
			account: String,
			members: Object
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
				background-color: rgba(255, 236, 236, 0.8);
				color: #FF4949;
			}
		}
		&.manager {
			&:after {
				content: '管理员';
				background-color: rgba(231, 250, 239, 0.8);
				color: #10ad57;
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
				background-color: rgba(232, 245, 255, 0.8);
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
			padding: 3px 6px;
			color: #fff;
			font-style: normal;
			box-sizing: border-box;
			display: inline-block;
			border-radius: 4px;
			background-color: rgba(255, 236, 236, 0.8);
		}
	}
</style>
