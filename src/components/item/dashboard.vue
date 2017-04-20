<template>
	<div class="contain">
		<div class="dashboard-wrap">
				<div class="dashboard" :style="{ transform: angle, borderTopColor: color, borderRightColor: color }"></div>
		</div>
		<div class="main-wrap">
			<p class="number">{{ min | limit }}</p>
			<p class="main">
				<span class="value">{{ value | limit }}</span>
				<span class="unit">{{ unit }}</span>
			</p>
			<p class="number">{{ max | limit }}</p>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { limit } from '../../filter/filter.js'
Vue.filter('limit', limit);
export default {
	props: {
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 200,
			required: true,
		},
		minColor: {
			type: String,
			default: '#7ed321',
		},
		maxColor: {
			type: String,
			default: '#ff4949',
		},
		value: {
			type: Number,
			default: 0,
			required: true,
		},
		unit: {
			type: String,
			default: '',
		}
	},
	events: {

	},
	data () {
		return {
		}
	},
	methods: {

	},
	watch: {
	},
	computed: {
		color() {
			return this.value / this.max <= 0.5 ? '#7ed321' : '#ff4949';
		},
		angle() {
			return 'rotate(' + (Math.round((this.value / this.max) * 180) - 225) + 'deg)';
		}
	},
}
</script>
<style lang='less' scoped>
.contain{
	position: relative;
}
.dashboard-wrap{
	position: relative;
	width: 180px;
	height: 90px;
	overflow: hidden;
}
.dashboard{
	margin: 10px auto 0;
	width: 160px;
	height: 160px;
	border:28px solid #7ed321;
	border-radius: 50%;
	border-left:28px solid #fff;
	border-bottom:28px solid #fff;
	transform : rotate(-225deg); /* 旋转45度 */
	/*animation: circle_right .7s ease-out; /* 动画名称 */
	transition: all .3s ease-out;
	box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.1);
}
.main-wrap{
	display: flex;
	justify-content: space-between;
	position: absolute;
	bottom: -18px;
	left: 0;
	width:  180px;
	height: 50px;
	font-size: 14px;
	color: #fff;
	.number{
		align-self: flex-end;
		width: 48px;
		height: 18px;
		line-height: 18px;
		text-align: center;
	}
	.main{
		display: flex;
		flex-direction: column;
		width: 84px;
		.value{
			line-height: 30px;
			font-size: 22px;
			text-align: center;
		}
		.unit{
			line-height: 18px;
			font-size: 12px;
			text-align: center;
			color: #ccc;
		}
	}
}
@keyframes circle_right{
	0%{
		transform : rotate(-225deg);
	}
	100%{
		transform : rotate(-45deg);
	}
}
</style>
