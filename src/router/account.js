/*
* @Author: William Chan
* @Date:   2017-03-06 22:28:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-07 23:50:37
*/

'use strict';

export default [
	{
		path: '/account',
		meta: { requiresAuth: true },
		redirect: { name: 'account_overview' },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			topbar:  resolve => require(['../components/topbar.vue'], resolve),
			main: resolve    => require(['../components/breadcrumb.vue'], resolve)
		},
		children: [
			{
				name: 'account_overview',
				path: 'overview',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/overview.vue'], resolve)
			},
			{
				name: 'account_upgrade',
				path: 'uphrade',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/upgrade.vue'], resolve)
			},
			{
				name: 'account_flow',
				path: 'flow',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/flow.vue'], resolve)
			},
			{
				name: 'account_recharge',
				path: 'recharge',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/recharge.vue'], resolve)
			},
			{
				name: 'account_income',
				path: 'income',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/income.vue'], resolve)
			}
		],
	},
]
