/*
* @Author: William Chan
* @Date:   2017-03-06 22:25:04
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-09 15:06:16
*/

export default [
	{
		path: '/',
		meta: { requiresAuth: true },
		components: {
			sidebar: resolve => import('@/components/sidebar.vue'),
			topbar:  resolve => import('@/components/topbar.vue'),
			main:    resolve => import('@/components/main.vue'),
		},
		children: [
			{
				name: 'index',
				path: '',
				meta: { requiresAuth: true, },
				component: resolve => import('@/views/index.vue'),
			},
		]
	},
	{
		path: '*',
		name: '404',
		components: {
			component: resolve => import('@/views/user/login.vue'),
		}
	}
]
