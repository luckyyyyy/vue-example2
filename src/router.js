/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-04 14:58:02
*/

'use strict';

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter);

const isAuth = () => {
	return store.getters.member.token;
};

const routes = [
	{
		path: '/',
		name: 'index',
		meta: { requiresAuth: true },
		components: {
			sidebar: resolve => require(['./components/sidebar.vue'], resolve),
			main: resolve    => require(['./views/index.vue'], resolve)
		},
	},
	{
		path: '/store',
		meta: { requiresAuth: true, default: 'store_shop_create' },
		components: {
			sidebar: resolve => require(['./components/sidebar.vue'], resolve),
			main: resolve    => require(['./components/breadcrumb.vue'], resolve)
		},
		children: [
			{ // 保证在前面 先后顺序匹配
				name: 'store_shop_create',
				path: 'shop/create',
				meta: { requiresAuth: true, parent: 'store_shop_list', },
				component: resolve => require(['./views/store/create.vue'], resolve)
			},
			{
				name: 'store_shop_list',
				path: 'shop/:type?',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'index', name: 'A' },
					{ route: 'store_shop_list', name: 'B' },
					{ route: 'store_shop_list', name: 'C' },
					{ route: 'store_shop_list', name: '商品列表' },
					{ route: 'store_shop_list', name: 'D' },
					{ route: 'index', name: 'A' },
					{ route: 'store_shop_list', name: 'B' },
					{ route: 'store_shop_list', name: 'C' },
					{ route: 'store_shop_list', name: '商品列表' },
					{ route: 'store_shop_list', name: 'D' },
				] },
				component: resolve => require(['./views/store/shop.vue'], resolve)
			},
			{
				name: 'store_order_list',
				path: 'order',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'store_order_list', name: '订单管理' },
				] },
				component: resolve => require(['./views/store/order.vue'], resolve)
			},
			{
				name: 'store_order_detail',
				path: 'order/detail/:id',
				meta: { requiresAuth: true, parent: 'store_order_list' [
					{ route: 'store_order_list', name: '订单管理' },
					{ route: 'store_order_detail', name: '订单详情' }
				] },
				component: resolve => require(['./views/store/order-detail.vue'], resolve)
			},
			{
				name: 'store_setting',
				path: 'setting',
				meta: { requiresAuth: true, parent: 'store_setting', default: 'store_setting_pay' },
				component: resolve => require(['./views/store/setting.vue'], resolve),
				children: [
					{
						name: 'store_setting_pay',
						path: 'pay',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/store/setting-pay.vue'], resolve)
					},
					{
						name: 'store_setting_order',
						path: 'order',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/store/setting-order.vue'], resolve)
					},
					{
						name: 'store_setting_address',
						path: 'address',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/store/setting-address.vue'], resolve)
					},
				],

			},
		]
	},
	{
		path: '/live',
		meta: { requiresAuth: true, default: 'live_list' },
		components: {
			sidebar: resolve => require(['./components/sidebar.vue'], resolve),
			main: resolve    => require(['./components/breadcrumb.vue'], resolve)
		},
		children: [
			{
				name: 'live_list',
				path: 'list/:type?',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'live_list', name: '直播列表' }
				] },
				component: resolve => require(['./views/live/list.vue'], resolve)
			},
			{
				name: 'live_template',
				path: 'template',
				meta: { requiresAuth: true },
				component: resolve => require(['./views/live/template.vue'], resolve)
			},
			{
				name: 'live_control',
				path: 'control/:id',
				meta: { requiresAuth: true, parent: 'live_list' },
				component: resolve => require(['./views/live/control.vue'], resolve)
			},
			{
				name: 'live_data',
				path: 'data/:id',
				meta: { requiresAuth: true, parent: 'live_list' },
				component: resolve => require(['./views/live/data.vue'], resolve)
			},
			{
				name: 'live_detail',
				path: 'detail/:id',
				meta: { requiresAuth: true, parent: 'live_list', default: 'live_detail_countdown' },
				component: resolve => require(['./views/live/detail.vue'], resolve),
				children: [
					{
						name: 'live_detail_countdown',
						path: 'countdown',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-countdown.vue'], resolve)
					},
					{
						name: 'live_detail_image',
						path: 'image',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-image.vue'], resolve)
					},
					{
						name: 'live_detail_share',
						path: 'share',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-share.vue'], resolve)
					},
					{
						name: 'live_detail_livebuy',
						path: 'livebuy',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-livebuy.vue'], resolve)
					},
					{
						name: 'live_detail_liveshop',
						path: 'liveshop',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-liveshop.vue'], resolve)
					},
					{
						name: 'live_detail_luckydraw',
						path: 'luckydraw',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-luckydraw.vue'], resolve)
					},
					{
						name: 'live_detail_follow',
						path: 'follow',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-follow.vue'], resolve)
					},
					{
						name: 'live_detail_authorize',
						path: 'authorize',
						meta: { requiresAuth: true },
						component: resolve => require(['./views/live/detail-authorize.vue'], resolve)
					},
				],
			}
		],
	},
	{
		path: '/account',
		meta: { requiresAuth: true, default: 'account_overview' },
		components: {
			sidebar: resolve => require(['./components/sidebar.vue'], resolve),
			main: resolve    => require(['./components/breadcrumb.vue'], resolve)
		},
		children: [
			{
				name: 'account_overview',
				path: 'overview',
				meta: { requiresAuth: true },
				component: resolve => require(['./views/account/overview.vue'], resolve)
			},
			{
				name: 'account_upgrade',
				path: 'uphrade',
				meta: { requiresAuth: true },
				component: resolve => require(['./views/account/upgrade.vue'], resolve)
			},
			{
				name: 'account_flow',
				path: 'flow',
				meta: { requiresAuth: true },
				component: resolve => require(['./views/account/flow.vue'], resolve)
			},
			{
				name: 'account_recharge',
				path: 'recharge',
				meta: { requiresAuth: true },
				component: resolve => require(['./views/account/recharge.vue'], resolve)
			},
			{
				name: 'account_income',
				path: 'income',
				meta: { requiresAuth: true },
				component: resolve => require(['./views/account/income.vue'], resolve)
			}
		],
	},
	{
		path: '/home',
		meta: { requiresAuth: true, default: 'select_channel' },
		components: {
			select: resolve => require(['./views/home/page.vue'], resolve)
		},
		children: [
			{
				name: 'select_channel',
				path: 'select/:id?',
				meta: { requiresAuth: true, group: 'select', name: "选择频道" },
				component: resolve => require(['./views/home/select.vue'], resolve)
			},
			{
				name: 'create_channel',
				path: 'create/:id?',
				meta: { requiresAuth: true, group: 'select', name: "创建频道" },
				component: resolve => require(['./views/home/create.vue'], resolve)
			},
		]
	},
	{
		path: '/user',
		meta: { requiresAuth: true, default: 'profile', group: 'global' },
		components: {
			user: resolve => require(['./views/home/page.vue'], resolve)
		},
		children: [
			{
				path: 'profile',
				name: 'profile',
				meta: { requiresAuth: true, group: 'global', name: "个人中心" },
				component: resolve => require(['./views/home/profile.vue'], resolve)
			},
			{
				path: 'password',
				name: 'password',
				meta: { requiresAuth: true, group: 'global', name: "修改密码" },
				component: resolve => require(['./views/home/password.vue'], resolve)
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		components: {
			first: resolve => require(['./views/user/login.vue'], resolve)
		}
	},
	{
		path: '/register',
		name: 'register',
		components: {
			first: resolve => require(['./views/user/register.vue'], resolve)
		},
	},
	{
		path: '/register/seccuss',
		name: 'register_seccuss',
		components: {
			first: resolve => require(['./views/user/register-seccuss.vue'], resolve)
		},
	},
	{
		path: '/resetpwd',
		name: 'resetpwd',
		components: {
			first: resolve => require(['./views/user/reset_password.vue'], resolve)
		}
	},
	{
		path: '*',
		name: '404',
		components: {
			first: resolve => require(['./views/user/login.vue'], resolve)
		}
	}
]

const router = new VueRouter({
	base: __dirname,
	routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

router.beforeEach((to, from, next) => {
	NProgress.done(true);
	NProgress.remove();
	NProgress.start();
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const defaultPage  = to.meta.default; // 部分子路由默认页面
	if (!isAuth()) {
		if (to.name == '404' || to.fullPath == '/') {
			return next({ name: 'login' });
		} else if (requiresAuth) {
			return next({ name: 'login', query: { redirect: to.fullPath } });
		}
	} else {
		if (store.getters.channel) {
			if (to.meta.group == 'select' && to.meta.group != 'global') {
				if (to.query.redirect) {
					return next({ path: to.query.redirect })
				} else {
					return next({ name: 'index' })
				}
			}
		} else {
			if (to.meta.group != 'select' && to.meta.group != 'global') {
				return next({ name: 'select_channel', query: { redirect: to.fullPath } });
			}
		}
		if (!requiresAuth) {
			if (to.query.redirect) {
				return next({ path: to.query.redirect })
			} else {
				return next({ name: 'index' })
			}
		}
	}
	if (defaultPage && to.name != defaultPage) {
		return next({ name: defaultPage, params: to.params })
	} else {
		return next();
	}
})
router.afterEach(route => {
	NProgress.done(true);
})

export default router






