/*
* @Author: William Chan
* @Date:   2017-03-06 22:25:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-09 06:08:21
*/

'use strict';

import store from '../store'

export default [
	{
		path: '/',
		name: 'index',
		meta: { requiresAuth: true },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			topbar:  resolve => require(['../components/topbar.vue'], resolve),
			main:    resolve => require(['../views/index.vue'], resolve)
		},
	},
	{
		path: '/login',
		name: 'login',
		components: {
			first: resolve => require([
				'../views/user/login.vue',
				'../store/modules/user/login'
			], (
				LoginComponent,
				LoginModule,
			) => {
				store.registerModule('login', LoginModule.default);
				resolve(LoginComponent);
			})
		}
	},
	{
		path: '/register',
		name: 'register',
		components: {
			first: resolve => require([
				'../views/user/register.vue',
				'../store/modules/user/register'
			], (
				RegisterComponent,
				RegisterModule,
			) => {
				store.registerModule('register', RegisterModule.default);
				resolve(RegisterComponent);
			})
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
			first: resolve => require([
				'../views/user/reset_password.vue',
				'../store/modules/user/reset_password'
			], (
				ResetPasswordComponent,
				ResetPasswordModule,
			) => {
				store.registerModule('reset_password', ResetPasswordModule.default);
				resolve(ResetPasswordComponent);
			})


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
