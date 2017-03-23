/*
* @Author: William Chan
* @Date:   2017-03-23 13:17:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-23 13:37:20
*/

'use strict';

import { registerModule } from '../store'

export default [
	{
		path: '/multimedia',
		meta: { requiresAuth: true },
		redirect: { name: 'multimedia' },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			topbar:  resolve => require(['../components/topbar.vue'], resolve),
			main:    resolve => require([
				'../components/main.vue',
			], (
				MainComponent,
			) => {
				resolve(MainComponent)
			})
		},
		children: [
			{
				name: 'multimedia',
				path: ':type?',
				meta: { requiresAuth: true },
				component: resolve => require([
					'../views/multimedia/index.vue',
					// '../store/modules/channel/delete'
				], (
					PreferencesComponent,
					// ChannelFindModule,
				) => {
					// registerModule(['channel', 'delete'], ChannelDeleteModule.default);
					resolve(PreferencesComponent);
				})
			},
		]
	},
]
