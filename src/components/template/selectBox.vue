<template>
	<div class="select-box">
		<div class="pop">
			<el-radio-group @change="onChange" class='radio-group' v-model="orderByRadio">
				<div class="pop-box">
					<div class="pop-box__radio">
						<el-radio class="radio" label="default">默认顺序</el-radio>
						<p class="tip">直播开始时间排序</p>
					</div>
				</div>
				<div class="pop-box">
					<div class="pop-box__radio">
						<el-radio class="radio" label="user-defined">自定义首位</el-radio>
						<p class="tip">自定义选中排为首位</p>
					</div>
				</div>
			</el-radio-group>
		</div>
		<transition name="el-fade-in-linear">
			<div class="pop pop--select" v-if="orderByRadio == 'user-defined'" v-loading="loading">
				<div class="pop__button" :class="{ 'pop__button--disabled': page <= 1 }" @click="prevPage">
					<span class="prev"></span>
				</div>
				<ul class="live-list">
					<li
					 v-for="(item, index) in data.videos"
					 :style="{ backgroundImage: `url(${item.liveInfo.coverImageUrl})` }"
					 :class="['live-item', { 'live-item--active': page == 1 && index == 0 }]"
					 @click="onSelect(item.id, index)">
					</li>
				</ul>
				<div class="pop__button" :class="{ 'pop__button--disabled': page >= totalPage }" @click="nextPage">
					<span class="next"></span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script scoped>
import { mapState, mapActions } from 'vuex'

export default {
	props: {
		orderBy: {
			type: String,
			required: true,
			default: 'default'
		},
		totalPage: {
			type: Number,
			required: true,
			defalut: 0,
		},
		data: {
			type: Object,
			required: true,
			defalut: {},
		},
		loading: {
			type: Boolean,
			defalut: false,
		},
		reset: {
			type: Boolean,
			required: true,
		}
	},
	data () {
		return {
			orderByRadio: this.orderBy,
			page: 1,
		}
	},
	computed: {

	},
	created () {
		if (this.orderBy == 'user-defined') {
			this.$emit('radioChange', this.orderByRadio)
		}
	},
	methods: {
		...mapActions('template', {
			sortBeing:      'TEMPLATE_SORT_BEING',
			sortFinished:   'TEMPLATE_SORT_FINISHED',
			findBeing: 			'TEMPLATE_FIND_BEING',
			findFinished:   'TEMPLATE_FIND_FINISHED'
		}),
		/**
		 * 触发radioChange事件 重置page
		 * @method onChange
		 * @return null
		 */
		onChange () {
			this.page = 1
			this.$emit('radioChange', this.orderByRadio)
		},
		/**
		 * 选中选项，触发onSelect事件
		 * @method onSelect
		 * @param  {number} id    直播id
		 * @param  {number} index 数组下标
		 * @return {null}
		 */
		onSelect (id, index) {
			if(index == 0 && this.page ==1 ){
				return
			}
			this.$emit('onSelect', id);
		},
		/**
		 * 上一页
		 * @method prevPage
		 * @return {null}
		 */
		prevPage () {
			if (this.page <= 1) return
			this.page --
			this.$emit('pageChange', this.page)
		},
		/**
		 * 下一页
		 * @method nextPage
		 * @return {null}
		 */
		nextPage () {
			if (this.page >= this.totalPage) return
			this.page ++
			this.$emit('pageChange', this.page)
		}
	},
	watch: {
		reset () {
			return this.page = 1
		}
	}
}
</script>

<style lang="less">
.select-box {
	position: absolute;
	top: 0;
	left: 350px;
	height: 228px;
	.pop {
		padding: 22px 26px;
		width: 540px;
		background-color: #4e546c;
		border-radius: 8px;
		&::before {
			content: '';
			position: absolute;
			top: 20px;
			left: -17px;
			border: 9px solid transparent;
			border-right-color: #4e546c;
		}
		&-horizontal {
			display: flex;
			margin-bottom: 26px;
			&:last-child {
				margin: 0;
			}
		}
		.radio-group {
			display: flex;
			width: 100%;
		}
		.pop-box {
			width: 50%;
			padding-right: 60px;
			&__title {
				color: #fff;
				line-height: 20px;
				&:before {
					content: '';
					display: inline-block;
					margin-right: 10px;
					width: 10px;
					height: 10px;
					background-color: #31bedb;
					border-radius: 50%;
				}
			}
			&__input {
				display: flex;
				margin-top: 12px;
				padding-left: 20px;
				.button {
					display: block;
					width: 40px;
					height: 40px;
					background-color: #fff;
					background-size: 100%;
					background-position: center;
					background-repeat: no-repeat;
					border-radius: 4px;
				}
				.tip  {
					margin-left: 10px;
					line-height: 40px;
					color: #fff;
				}
			}
			&__radio {
				.radio {
					color: #fff;
				}
				.tip {
					margin-left: 28px;
					color: #c7c7c7;
					font-size: 12px;
					line-height: 20px;
				}
			}
		}
	}
	.pop--select {
		display: flex;
		margin-top: 20px;
		&::before {
			display: none;
		}
		.pop__button {
			display: flex;
			justify-content: center;
			align-items: center;
			min-width: 30px;
			height: 80px;
			border-radius: 6px;
			background-color: #2C2E44;
			cursor: pointer;
			.next {
				margin-left: -7px;
				display: block;
				width: 14px;
				height: 14px;
				border-top: 1px solid #fff;
				border-right: 1px solid #fff;
				transform: rotateZ(45deg);
			}
			.prev {
				margin-right: -7px;
				display: block;
				width: 14px;
				height: 14px;
				border-top: 1px solid #fff;
				border-left: 1px solid #fff;
				transform: rotateZ(-45deg);
			}
			&--disabled {
				cursor: not-allowed;
				background-color: lighten(#2C2E44, 10%);
			}
		}
		.live-list {
			display: flex;
			padding: 0 10px;
			width: 100%;
			.live-item {
				position: relative;
				margin-right: 10px;
				width: 128px;
				height: 80px;
				background: #fff;
				border-radius: 6px;
				background-size: 100%;
				background-position: center;
				background-repeat: no-repeat;
				cursor: pointer;
				&:last-child {
					margin: 0;
				}
				&--active {
					box-shadow: 0 0 12px 0 #31bedb;
					cursor: default;
					&::before {
						content: '';
						position: absolute;
						right: 0;
						bottom: 0;
						width: 30px;
						height: 30px;
						background-image: url(../../assets/images/select@2x.png);
						background-size: cover;
					}
				}
			}
		}
	}
}
</style>
