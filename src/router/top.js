/*
* @Author: William Chan
* @Date:   2017-03-06 22:25:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-06 22:41:31
*/

'use strict';

export default [
	{
		path: '/',
		name: 'index',
		meta: { requiresAuth: true },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			main: resolve    => require(['../views/index.vue'], resolve)
		},
	},
	{
		path: '/login',
		name: 'login',
		components: {
			first: resolve => require(['../views/user/login.vue'], resolve)
		}
	},
	{
		path: '/register',
		name: 'register',
		components: {
			first: resolve => require(['../views/user/register.vue'], resolve)
		},
	},
	{
		path: '/register/seccuss',
		name: 'register_seccuss',
		components: {
			first: resolve => require(['../views/user/register-seccuss.vue'], resolve)
		},
	},
	{
		path: '/resetpwd',
		name: 'resetpwd',
		components: {
			first: resolve => require(['../views/user/reset_password.vue'], resolve)
		}
	},
	{
		path: '*',
		name: '404',
		components: {
			first: resolve => require(['../views/user/login.vue'], resolve)
		}
	}
]
