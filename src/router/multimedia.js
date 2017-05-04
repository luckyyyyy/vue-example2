/*
* @Author: William Chan
* @Date:   2017-03-23 13:17:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-03 12:02:32
*/

'use strict';

export default [
	{
		path: '/multimedia',
		meta: { requiresAuth: true },
		redirect: { name: 'multimedia' },
		components: {
			sidebar: resolve => import('@/components/sidebar.vue'),
			topbar:  resolve => import('@/components/topbar.vue'),
			main:    resolve => import('@/components/main.vue'),
		},
		children: [
			{
				name: 'multimedia',
				path: ':type?',
				meta: { requiresAuth: true },
				component: resolve => import('@/views/multimedia/index.vue'),
			},
		]
	},
]
