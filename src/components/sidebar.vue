<template>
	<div class="sidebar">
		<div class="logo">
		<!-- 待定 -->
		<svg width="56px" height="44px" viewBox="39 80 56 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		    <!-- Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch -->
		    <desc>Created with Sketch.</desc>
		    <defs></defs>
		    <g id="电视" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(39.000000, 80.000000)">
		        <path d="M13.3111049,15.415049 L18.1876364,15.415049 L16.0179021,27.6171189 L21.521007,27.6171189 L23.6441958,15.415049 L28.5672727,15.415049 L29.3299021,11.0505175 L14.0737343,11.0505175 L13.3111049,15.415049 L13.3111049,15.415049 Z M37.0313846,22.0567273 L36.0825734,11.0505175 L30.557986,11.0505175 L33.3328112,27.6171189 L38.8359161,27.6171189 L47.5506573,11.0505175 L42.0475524,11.0505175 L37.0313846,22.0567273 L37.0313846,22.0567273 Z M36.9633566,40.3455105 L19.3118881,40.3455105 C18.4525874,40.3455105 17.7544056,41.0401119 17.7544056,41.8958322 C17.7544056,42.7515524 18.4525874,43.4461538 19.3118881,43.4461538 L36.9633566,43.4461538 C37.8226573,43.4461538 38.5208392,42.7515524 38.5208392,41.8958322 C38.5208392,41.0401119 37.8262378,40.3455105 36.9633566,40.3455105 Z M54.1457902,0.0192447552 L1.87166434,0.0192447552 C0.72593007,0.0192447552 0.0384895105,0.703104895 0.0384895105,1.84883916 L0.0384895105,35.2147692 C0.0384895105,36.3569231 1.18422378,37.0443636 2.32995804,37.0443636 L54.1457902,37.0443636 C55.2915245,37.0443636 55.978965,36.3605035 55.978965,35.2147692 L55.978965,1.84883916 C55.9825455,0.706685315 55.2951049,0.0192447552 54.1457902,0.0192447552 Z M53.2292028,33.3851748 C53.2292028,33.958042 52.8854825,34.2981818 52.3126154,34.2981818 L3.70483916,34.2981818 C3.13197203,34.2981818 2.78825175,33.9544615 2.78825175,33.3851748 L2.78825175,3.67485315 C2.78825175,3.10198601 3.13197203,2.76184615 3.70483916,2.76184615 L52.3126154,2.76184615 C52.8854825,2.76184615 53.2292028,3.10556643 53.2292028,3.67485315 L53.2292028,33.3851748 Z" id="Shape" fill="#DCDEE3"></path>
		    </g>
		</svg>
		</div>
		<el-menu :default-active="active" class="el-menu-vertical-demo" router="router">
			<el-menu-item :route="{ name: 'index' }" index="index"><i class="iconfont icon-rank"></i>概况</el-menu-item>
			<el-menu-item index="/todo1"><i class="iconfont icon-list"></i>频道</el-menu-item>
			<el-submenu index="1">
				<template slot="title"><i class="iconfont icon-video"></i>直播</template>
				<el-menu-item :route="{ name: 'live_list' }" index="live_list">直播列表</el-menu-item>
				<el-menu-item :route="{ name: 'live_template' }" index="live_template">直播间模板</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title"><i class="iconfont icon-shop"></i>电商</template>
				<el-menu-item :route="{ name: 'store_shop_list' }" index="store_shop_list">商品</el-menu-item>
				<el-menu-item :route="{ name: 'store_order_list' }" index="store_order_list">订单</el-menu-item>
				<el-menu-item :route="{ name: 'store_setting' }" index="store_setting">设置</el-menu-item>
			</el-submenu>
			<el-menu-item index="/todo1"><i class="iconfont icon-recharge"></i>账户</el-menu-item>
			<el-menu-item index="/todo1"><i class="iconfont icon-circle"></i>营销</el-menu-item>
		</el-menu>

		<el-popover ref="popover" placement="top-end" width="149" trigger="click" popper-class="account-popper">
			<div class="account">
				<p v-show="user.nickName">{{ user.nickName }}</p>
				<p>{{ user.phone }}</p>
			</div>
			<ul class="meun">
				<li><a>账号设置</a></li>
				<li><a @click="switchShop" href="javascript:;">切换频道</a></li>
				<li><a @click="logout" href="javascript:;">退出系统</a></li>
			</ul>
		</el-popover>
		<footer>
			<span v-popover:popover>{{ user.nickName || user.phone }}</span>
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data () {
		return {
			router: true,
		}
	},
	computed: {
		active () {
			let active = this.$route.name;
			this.$route.matched.some(record => {
				if (record.meta.parent) {
					active = record.meta.parent;
				}
			})
			return active;
		},
		...mapState({
			user: state => state.user
		})
	},
	mounted () {

	},
	methods: {
		logout () {
			this.$store.commit('SIGNIN_FAILURE');
		},
		switchShop () {
			this.$confirm('确定切换频道么?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('SELECT_SHOP', 0);
			})

		}
	}
}
</script>

<style lang="less">
	.sidebar {
		z-index: 222;
		position: fixed;
		top: 0;
		left: 0;
		width: 135px;
		box-shadow: 2px 0 5px 0 #eee;
		height: 100%;
		background: #fff;
		display: flex;
		flex-direction: column;
		flex: 1;
		.logo {
			text-align: center;
			margin: 30px;
			// img {
			// 	width: 100%;
			// }
		}
		.el-menu {
			background: #fff;
			.iconfont {
				margin-right: 10px;
			}
			.el-menu-item, .el-submenu__title {
				height: 45px;
				line-height: 45px;
				// padding-left: 15px !important;
			}
			.el-menu-item:hover, .el-menu-item.is-active {
				background: rgba(16,144,191,0.20);
			}
			.el-menu-item.is-active {
				border-right: 3px solid #1190BF;
				color: #1190BF;
			}
		}
		& > .el-menu {
			overflow-y: auto;
			flex: 1;
		}
	}

	footer {
		z-index: 1;
		box-shadow: 0 -2px 5px 0 #eee;
		height: 45px;
		line-height: 45px;
		text-align: center;
		span {
			width: 100%;
			display: inline-block;
			cursor: pointer;
		}
	}

	.account-popper {
		padding: 0;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		.account {
			margin-bottom: 10px;
			padding: 8px 10px;
			background: #ebecf0;
			p {
				margin: 5px;
			}
		}
		.meun {
			margin-bottom: 10px;
			 a {
			 	box-sizing: border-box;
			 	width: 100%;
			 	display: inline-block;
				padding-left: 10px;
				height: 40px;
				line-height: 40px;
				color: #666;
				&:hover {
					background: rgba(16, 144, 191, 0.2) !important;
    				color: #1190BF !important;
				}
			}
		}
	}
</style>















