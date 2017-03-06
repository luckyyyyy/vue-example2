/*
* @Author: William Chan
* @Date:   2017-03-06 22:27:42
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-06 22:41:11
*/

'use strict';

export default [
	{
		path: '/home',
		meta: { requiresAuth: true },
		redirect: { name: 'select_channel' },
		components: {
			select: resolve => require(['../views/home/page.vue'], resolve)
		},
		children: [
			{
				name: 'select_channel',
				path: 'select/:id?',
				meta: { requiresAuth: true, group: 'select', name: "选择频道" },
				component: resolve => require(['../views/home/select.vue'], resolve)
			},
			{
				name: 'create_channel',
				path: 'create/:id?',
				meta: { requiresAuth: true, group: 'select', name: "创建频道" },
				component: resolve => require(['../views/home/create.vue'], resolve)
			},
		]
	},
]
