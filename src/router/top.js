/*
* @Author: William Chan
* @Date:   2017-03-06 22:25:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 20:48:59
*/

'use strict';

import { registerModule } from './'

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
		path: '*',
		name: '404',
		components: {
			first: resolve => require(['../views/user/login.vue'], resolve)
		}
	}
]
