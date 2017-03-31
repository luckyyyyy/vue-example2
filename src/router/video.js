/*
* @Author: William Chan
* @Date:   2017-03-15 13:20:01
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-03-31 15:19:45
*/

'use strict';

import { registerModule } from '../store'

export default [
	{
		path: '/video',
		meta: { requiresAuth: true },
		redirect: { name: 'video_list' },
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
				name: 'video_list',
				path: 'list/:status?',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'video_list', name: '回放列表' }
				] },
				component: resolve => require([
					// '../views/video/list.vue',
					// '../store/modules/live/find'
				], (
					VideoListComponent,
					LiveFindModule,
				) => {
					// registerModule('live_find', LiveFindModule.default);
					// resolve(VideoListComponent);
				})
			},
		]
	}
]
