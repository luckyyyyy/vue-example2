/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-15 16:05:48
*/

// component(resolve) {
// 	require(['./views/index.vue'], resolve)
// }

'use strict';

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter);

const isAuth = () => {
	try {
		const data = JSON.parse(sessionStorage.getItem('user'));
		return data.token
	} catch(e) {
		return false;
	}
};

const routes = [
	{
		path: '/',
		name: 'index',
		meta: { requiresAuth: true },
		components: {
			main: resolve => {
				require(['./views/index.vue'], resolve)
			},
		},
	},
	{
		path: '/store',
		meta: { requiresAuth: true },
		components: {
			main: resolve => {
				require(['./views/store/main.vue'], resolve)
			},
		},
		children: [
			{ // 保证在前面 先后顺序匹配
				name: 'store_shop_create',
				path: 'shop/create',
				meta: { requiresAuth: true, parent: 'store_shop_list', },
				component: resolve => {
					require(['./views/store/create.vue'], resolve)
				}
			},
			{
				name: 'store_shop_list',
				path: 'shop/:type?',
				meta: { requiresAuth: true },
				component: resolve => {
					require(['./views/store/shop.vue'], resolve)
				}
			},
			{
				name: 'store_order_list',
				path: 'order/:type?',
				meta: { requiresAuth: true },
				component: resolve => {
					require(['./views/store/order.vue'], resolve)
				}
			},
			{
				name: 'store_setting',
				path: 'setting',
				meta: { requiresAuth: true, parent: 'store_setting', default: 'store_setting_pay' },
				component: resolve => {
					require(['./views/store/setting.vue'], resolve)
				},
				children: [
					{
						name: 'store_setting_pay',
						path: 'pay',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/store/setting-pay.vue'], resolve)
						}
					},
					{
						name: 'store_setting_order',
						path: 'order',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/store/setting-order.vue'], resolve)
						}
					},
				],

			},
		]
	},
	{
		path: '/live',
		meta: { requiresAuth: true },
		components: {
			main: resolve => {
				require(['./views/live/main.vue'], resolve)
			},
		},
		children: [
			{
				name: 'live_list',
				path: 'list/:type?',
				meta: { requiresAuth: true },
				component: resolve => {
					require(['./views/live/list.vue'], resolve)
				}
			},
			{
				name: 'live_template',
				path: 'template',
				meta: { requiresAuth: true },
				component: resolve => {
					require(['./views/live/template.vue'], resolve)
				}
			},
			{
				name: 'live_control',
				path: 'control/:id',
				meta: { requiresAuth: true, parent: 'live_list' },
				component: resolve => {
						require(['./views/live/control.vue'], resolve)
					},
				},
			{
				name: 'live_detail',
				path: 'detail/:id',
				meta: { requiresAuth: true, parent: 'live_list', default: 'live_detail_countdown' },
				component: resolve => {
					require(['./views/live/detail.vue'], resolve)
				},
				children: [
					{
						name: 'live_detail_countdown',
						path: 'countdown',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-countdown.vue'], resolve)
						}
					},
					{
						name: 'live_detail_image',
						path: 'image',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-image.vue'], resolve)
						}
					},
					{
						name: 'live_detail_share',
						path: 'share',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-share.vue'], resolve)
						}
					},
					{
						name: 'live_detail_livebuy',
						path: 'livebuy',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-livebuy.vue'], resolve)
						}
					},
					{
						name: 'live_detail_liveshop',
						path: 'liveshop',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-liveshop.vue'], resolve)
						}
					},
					{
						name: 'live_detail_luckydraw',
						path: 'luckydraw',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-luckydraw.vue'], resolve)
						}
					},
					{
						name: 'live_detail_follow',
						path: 'follow',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-follow.vue'], resolve)
						}
					},
					{
						name: 'live_detail_authorize',
						path: 'authorize',
						meta: { requiresAuth: true },
						component: resolve => {
							require(['./views/live/detail-authorize.vue'], resolve)
						}
					},
				],
			}
		],
	},
	{
		path: '/login',
		name: 'login',
		components: {
			first: resolve => {
				require(['./views/user/login.vue'], resolve)
			}
		}
	},
	{
		path: '/register',
		name: 'register',
		components: {
			first: resolve => {
				require(['./views/user/register.vue'], resolve)
			}
		},
		children: []
	},
	{
		path: '/register/seccuss',
		name: 'register/seccuss',
		components: {
			first: resolve => {
				require(['./views/user/register-seccuss.vue'], resolve)
			}
		},
	},
	{
		path: '/resetpwd',
		name: 'resetpwd',
		components: {
			first: resolve => {
				require(['./views/user/resetpwd.vue'], resolve)
			}
		}
	},
	{
		path: '*',
		name: '404',
		components: {
			first: resolve => {
				require(['./views/user/login.vue'], resolve)
			}
		}
	}
]

const route = new VueRouter({
	base: __dirname,
	routes,
	mode: 'history',
})

route.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const defaultPage  = to.meta.default; // 部分子路由默认页面
	if (!isAuth()) {
		if (to.name == '404') {
			return next({ name: 'login' });
		} else if (requiresAuth) {
			 return next({ name: 'login', query: { redirect: to.fullPath } });
		}
	} else {
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
route.afterEach(route => {
	// console.dir(Vue)
	// Vue.nextTick(() => {
	// history.replaceState(null, null, 'a.html?aaaaa')
	// })
})
export default route






