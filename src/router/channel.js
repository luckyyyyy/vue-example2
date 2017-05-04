/*
* @Author: William Chan
* @Date:   2017-03-23 13:14:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-04 16:35:43
*/

'use strict';
import { registerModule } from '../store'

export default [
	{
		path: '/channel',
		name: 'channel',
		meta: { requiresAuth: true },
		redirect: { name: 'channel_index' },
		components: {
			sidebar: resolve => import('@/components/sidebar.vue'),
			topbar:  resolve => import('@/components/topbar.vue'),
			main:    resolve => import('@/components/main.vue'),
		},
		children: [
			{
				name: 'channel_index',
				path: 'index',
				meta: { requiresAuth: true, parent: 'channel' },
				component: resolve => import('@/views/channel/index.vue'),
			},
			{
				name: 'channel_preferences',
				path: 'preferences',
				meta: { requiresAuth: true },
				component: resolve => import('@/views/channel/preferences.vue'),
			},
			{
				name: 'channel_template',
				path: 'template/:templateID',
				meta: { requiresAuth: true, parent: 'channel' },
				component: resolve => import('@/views/channel/template.vue'),
			},
		]
	},
]
