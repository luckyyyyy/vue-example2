/*
* @Author: William Chan
* @Date:   2017-03-06 22:28:39
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-09 10:43:02
*/

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
				component: resolve => import('@/views/account/overview.vue'),
			},
			{
				name: 'account_recharge',
				path: 'overview/recharge',
				meta: { requiresAuth: true, parent: 'account_overview'},
				component: resolve => import('@/views/account/recharge.vue'),
			},
			{
				name: 'account_flow',
				path: 'flow',
				meta: { requiresAuth: true },
				component: resolve => import('@/views/account/flow.vue'),
			},
			{
				name: 'account_consume',
				path: 'consume',
				meta: { requiresAuth: true },
				component: resolve => import('@/views/account/consume.vue'),
			}
		],
	},
]
