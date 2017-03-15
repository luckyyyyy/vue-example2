/*
* @Author: William Chan
* @Date:   2017-03-15 13:20:01
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-15 13:23:13
*/

'use strict';

'use strict';
import store from '../store'

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
				'../store/modules/live/query',
			], (
				MainComponent,
				LiveQueryModule
			) => {
				store.registerModule('live_query', LiveQueryModule.default);
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
					'../views/video/list.vue',
					'../store/modules/live/find',
					'../store/modules/live/create',
				], (
					VideoListComponent,
					LiveFindModule,
					LiveCreateModule
				) => {
					store.registerModule('live_find', LiveFindModule.default);
					store.registerModule('live_create', LiveCreateModule.default);
					resolve(VideoListComponent);
				})
			},
		]
	}
]
