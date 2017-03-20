/*
* @Author: William Chan
* @Date:   2017-03-06 22:25:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-20 18:51:18
*/

'use strict';

export default [
	{
		path: '/',
		meta: { requiresAuth: true },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			topbar:  resolve => require(['../components/topbar.vue'], resolve),
			main:    resolve => require(['../components/main.vue'], resolve)
		},
		children: [
			{
				name: 'index',
				path: '',
				meta: { requiresAuth: true, },
				component: resolve => require(['../views/index.vue'], resolve)
			},
		]
	},
	{
		path: '*',
		name: '404',
		components: {
			first: resolve => require(['../views/user/login.vue'], resolve)
		}
	}
]
