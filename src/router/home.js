/*
* @Author: William Chan
* @Date:   2017-03-06 22:27:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-04 20:14:17
*/

export default [
	{
		path: '/home',
		meta: { requiresAuth: true },
		redirect: { name: 'select_channel' },
		components: {
			home: resolve => import('@/views/home/main.vue'),
		},
		children: [
			{
				name: 'select_channel',
				path: 'select/:id?',
				meta: { requiresAuth: true, group: 'select', name: "选择频道" },
				component: resolve => import('@/views/home/select.vue'),
			},
			{
				name: 'create_channel',
				path: 'create/:id?',
				meta: { requiresAuth: true, group: 'select', name: "创建频道" },
				component: resolve => import('@/views/home/create.vue'),
			},
			{
				path: '/user/profile',
				name: 'profile',
				meta: { requiresAuth: true, group: 'global', name: "个人中心" },
				component: resolve => import('@/views/user/profile.vue'),
			},
			{
				path: '/user/password',
				name: 'password',
				meta: { requiresAuth: true, group: 'global', name: "修改密码" },
				component: resolve => import('@/views/user/password.vue'),
			},
		]
	},
]
