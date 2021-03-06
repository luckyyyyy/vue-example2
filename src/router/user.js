/*
* @Author: William Chan
* @Date:   2017-03-06 22:26:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-04 20:14:38
*/

export default [
	{
		path: '/user',
		redirect: { name: 'profile' },
		components: {
			user: resolve => import('@/views/user/main.vue')
		},
		children: [
			{
				path: 'login',
				name: 'login',
				component: resolve => import('@/views/user/login.vue')
			},
			{
				path: 'register',
				name: 'register',
				component: resolve => import('@/views/user/register.vue')
			},
			{
				path: 'register/success',
				name: 'register_success',
				component: resolve => import('@/views/user/register_success.vue')
			},
			{
				path: 'resetpwd',
				name: 'resetpwd',
				component: resolve => import('@/views/user/reset_password.vue')
			},
		]
	},
]
