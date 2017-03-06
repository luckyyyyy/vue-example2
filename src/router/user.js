/*
* @Author: William Chan
* @Date:   2017-03-06 22:26:46
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-06 22:41:35
*/

'use strict';

export default [
	{
		path: '/user',
		meta: { requiresAuth: true, group: 'global' },
		redirect: { name: 'profile' },
		components: {
			user: resolve => require(['../views/home/page.vue'], resolve)
		},
		children: [
			{
				path: 'profile',
				name: 'profile',
				meta: { requiresAuth: true, group: 'global', name: "个人中心" },
				component: resolve => require(['../views/home/profile.vue'], resolve)
			},
			{
				path: 'password',
				name: 'password',
				meta: { requiresAuth: true, group: 'global', name: "修改密码" },
				component: resolve => require(['../views/home/password.vue'], resolve)
			},
		]
	},
]
