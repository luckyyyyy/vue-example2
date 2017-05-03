/*
* @Author: William Chan
* @Date:   2017-03-06 22:28:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-03 11:59:22
*/

'use strict';
import { registerModule } from '../store'

export default [
	{
		path: '/account',
		meta: { requiresAuth: true },
		redirect: { name: 'account_overview' },
		components: {
			sidebar: resolve => import('@/components/sidebar.vue'),
			topbar:  resolve => import('@/components/topbar.vue'),
			main:    resolve => import('@/components/main.vue'),
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
