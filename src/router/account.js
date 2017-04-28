/*
* @Author: William Chan
* @Date:   2017-03-06 22:28:39
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-28 14:50:06
*/

'use strict';
import { registerModule } from '../store'

export default [
	{
		path: '/account',
		meta: { requiresAuth: true },
		redirect: { name: 'account_overview' },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			topbar:  resolve => require(['../components/topbar.vue'], resolve),
			main:    resolve => require(['../components/main.vue'], resolve)
		},
		children: [
			{
				name: 'account_overview',
				path: 'overview',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/overview.vue'], resolve)
			},
			{
				name: 'account_recharge',
				path: 'overview/recharge',
				meta: { requiresAuth: true, parent: 'account_overview'},
				component: resolve => require(['../views/account/recharge.vue'], resolve)
			},
			{
				name: 'account_flow',
				path: 'flow',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/flow.vue'], resolve)
			},

			{
				name: 'account_consume',
				path: 'consume',
				meta: { requiresAuth: true },
				component: resolve => require([
					'../views/account/consume.vue',
					'../store/modules/pay/consume.js',
				], (
					ConsumeComponent,
					PayConsumeModule,
				) => {
					registerModule(['pay', 'consume_create'], PayConsumeModule.default);
					resolve(ConsumeComponent);
				})
			},
		],
	},
]
