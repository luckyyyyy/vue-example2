/*
* @Author: William Chan
* @Date:   2017-03-06 22:26:46
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 23:23:15
*/

'use strict';
import { registerModule } from './'

export default [
	{
		path: '/user',
		redirect: { name: 'profile' },
		components: {
			user: resolve => require(['../views/user/main.vue'], resolve)
		},
		children: [
			{
				path: 'login',
				name: 'login',
				component: resolve => require([
					'../views/user/login.vue',
					'../store/modules/user/login'
				], (
					LoginComponent,
					LoginModule,
				) => {
					registerModule('login', LoginModule.default);
					resolve(LoginComponent);
				})
			},
			{
				path: 'register',
				name: 'register',
				component: resolve => require([
					'../views/user/register.vue',
					'../store/modules/user/register'
				], (
					RegisterComponent,
					RegisterModule,
				) => {
					registerModule('register', RegisterModule.default);
					resolve(RegisterComponent);
				})
			},
			{
				path: 'register/seccuss',
				name: 'register_seccuss',
				component: resolve => require(['../views/user/register-seccuss.vue'], resolve)
			},
			{
				path: 'resetpwd',
				name: 'resetpwd',
				component: resolve => require([
					'../views/user/reset_password.vue',
					'../store/modules/user/reset_password'
				], (
					ResetPasswordComponent,
					ResetPasswordModule,
				) => {
					registerModule('reset_password', ResetPasswordModule.default);
					resolve(ResetPasswordComponent);
				})
			},
		]
	},
]
