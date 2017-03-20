<template>
	<div class="sidebar">
		<div class="logo">
			<!-- 待定 -->
			<img src="../assets/qrcode.png">
		</div>
		<Menu @on-select="onSelect" theme="dark" :activeName="active" mode="vertical" width="135px" :openNames="openNames">
			<template v-for="item of sidebar">
				<template v-if="item.sub">
					<Submenu :name="item.name">
						<span slot="title" v-html="item.item"></span>
						<MenuItem :key="sub.name" v-for="sub of item.sub" :name="sub.name" v-html="sub.item"></MenuItem>
					</Submenu>
				</template>
				<MenuItem v-else :name="item.name" v-html="item.item"></MenuItem>
			</template>
		</Menu>
		<div style="text-align: center;padding: 10px;">
			<iSwitch @on-change="enableDebug" v-model="debug">
				<span slot="open">on</span>
				<span slot="close">off</span>
			</iSwitch>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data () {
		return {
			debug: localStorage.getItem('debug') ? true : false,
			sidebar: [
				{ item: '<i class="iconfont icon-rank"></i>概况', name: 'index' },
				{ item: '<i class="iconfont icon-list"></i>频道', name: 'index2' },
				{ item: '<i class="iconfont icon-video"></i>直播', name: 'live', sub: [
					{ item: '直播列表', name: 'live_list' },
					{ item: '直播间模板', name: 'live_template' },
					{ item: '回放列表', name: 'video_list' },
				] },
				// { item: '<i class="iconfont icon-shop"></i>电商', name: 'shop', sub: [
				// 	{ item: '商品', name: 'store_shop_list' },
				// 	{ item: '订单', name: 'store_order_list' },
				// 	{ item: '设置', name: 'store_setting' },
				// ] },
				{ item: '<i class="iconfont icon-recharge"></i>账户', name: 'account', sub: [
					{ item: '账户总览', name: 'account_overview' },
					{ item: '账户升级', name: 'account_upgrade' },
					{ item: '流量管理', name: 'account_flow' },
					{ item: '立即充值', name: 'account_recharge' },
					{ item: '我的收入', name: 'account_income' },
				] },
				// { item: '<i class="iconfont icon-circle"></i>营销', name: 'index2' },
			],
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
		openNames () {
			let openNames = [];
			for (let item of this.sidebar) {
				for (let sub of item.sub || []) {
					if (sub.name == this.active) {
						openNames.push(item.name);
						break;
					}
				}
			}
			return openNames;
		},
		...mapState({
			user: state => state.user,
		})
	},
	mounted () {
		// console.log(this.info)
	},
	methods: {
		enableDebug (val) {
			if (val) {
				localStorage.setItem('debug', true);
			} else {
				localStorage.removeItem('debug');
			}
			window.location.reload();
		},
		onSelect (name) {
			this.$router.push({ name })
		}
	}
}
</script>

<style lang="less" scoped>
	.sidebar {
		z-index: 222;
		position: fixed;
		top: 0;
		left: 0;
		width: 135px;
		height: 100%;
		background: #fff;
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-top: 50px;
		box-sizing: border-box;
		background: #373d41;
		.logo {
			text-align: center;
			margin: 30px 0;
			img {
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}
		}
		.ivu-menu {
			background: #373d41;
			overflow-y: auto;
			flex: 1;
			.ivu-menu-item, .ivu-menu-submenu-title {
				padding: 10px 24px;
			}
			.ivu-menu-submenu .ivu-menu {
				background: darken(#373d41, 5%);
			}
			.ivu-menu-submenu .ivu-menu-item {
				padding-left: 30px;
			}
			.iconfont {
				margin-right: 10px;
			}

			.ivu-menu-item-active:hover:not(.ivu-menu-submenu),
			.ivu-menu-item-active:not(.ivu-menu-submenu) {
				background: #eaedf1 !important;
				color: black !important;
				border: none !important;
				border-left: 5px solid #00C1DE !important;
			}
			// .ivu-menu-submenu-title-active:not(.ivu-menu-submenu)

		}
	}
</style>















