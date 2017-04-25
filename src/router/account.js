/*
* @Author: William Chan
* @Date:   2017-03-06 22:28:39
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-25 17:41:01
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
				name: 'account_balance_order',
				path: 'overview/balance',
				meta: { requiresAuth: true, parent: 'account_overview'},
				component: resolve => require(['../views/account/balanceorder.vue'], resolve)
			},
			// {
			// 	name: 'account_upgrade',
			// 	path: 'uphrade',
			// 	meta: { requiresAuth: true },
			// 	component: resolve => require(['../views/account/upgrade.vue'], resolve)
			// },
			{
				name: 'account_flow',
				path: 'flow',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/flow.vue'], resolve)
			},
			{
				name: 'account_flow_order',
				path: 'flow/order/:totalPrice',
				meta: { requiresAuth: true, parent: 'account_flow'},
				component: resolve => require([
					'../views/account/floworder.vue',
				], (
					ConsumeOrderComponent,
				) => {
					resolve(ConsumeOrderComponent);
				})
			},
			{
				name: 'account_recharge',
				path: 'recharge',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/recharge.vue'], resolve)
			},
			{
				name: 'account_consume',
				path: 'consume',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/account/consume.vue'], resolve)
			},
			{
				name: 'account_consume_order',
				path: 'consume/order/:edition',
				meta: { requiresAuth: true, parent: 'account_consume'},
				component: resolve => require([
					'../views/account/consumeorder.vue',
					'../store/modules/order/consumecreate'
				], (
					ConsumeOrderComponent,
					ConsumeCreateModule,
				) => {
					registerModule(['order', 'consume_create'], ConsumeCreateModule.default);
					resolve(ConsumeOrderComponent);
				})
			},
			// {
			// 	name: 'account_income',
			// 	path: 'income',
			// 	meta: { requiresAuth: true },
			// 	component: resolve => require(['../views/account/income.vue'], resolve)
			// }
		],
	},
]
