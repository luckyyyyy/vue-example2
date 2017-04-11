/*
* @Author: William Chan
* @Date:   2017-03-15 13:20:01
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-11 11:02:44
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
					'../views/video/list.vue',
					'../store/modules/video/find'
				], (
					VideoListComponent,
					VideoFindModule,
				) => {
					registerModule(['video', 'find'], VideoFindModule.default);
					resolve(VideoListComponent);
				})
			},
			{
				name: 'video_data',
				path: 'data/:videoid',
				meta: { requiresAuth: true, parent: 'video_list' },
				component: resolve => require(['../views/video/data.vue'], resolve)
			},
			{
				name: 'video_detail',
				path: 'detail/:videoid',
				meta: { requiresAuth: true, parent: 'video_list' },
				redirect: { name: 'video_detail_image' },
				component: resolve => require([
					'../views/video/detail.vue',
					'../store/modules/video/detail',
				], (
					VideoDetailComponent,
					VideoDetailModule
				) => {
					registerModule(['video', 'detail'], VideoDetailModule.default);
					resolve(VideoDetailComponent);
				}),
				children: [
					{
						name: 'video_detail_image',
						path: 'image',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/video/detail-image.vue'], resolve)
					},
					// {
					// 	name: 'live_detail_share',
					// 	path: 'share',
					// 	meta: { requiresAuth: true },
					// 	component: resolve => require(['../views/live/detail-share.vue'], resolve)
					// },
					// {
					// 	name: 'live_detail_setting',
					// 	path: 'setting',
					// 	meta: { requiresAuth: true },
					// 	component: resolve => require(['../views/live/detail-setting.vue'], resolve)
					// },
					// {
					// 	name: 'live_detail_livebuy',
					// 	path: 'livebuy',
					// 	meta: { requiresAuth: true },
					// 	component: resolve => require(['../views/live/detail-livebuy.vue'], resolve)
					// },
					// {
					// 	name: 'live_detail_liveshop',
					// 	path: 'liveshop',
					// 	meta: { requiresAuth: true },
					// 	component: resolve => require(['../views/live/detail-liveshop.vue'], resolve)
					// },
					// {
					// 	name: 'live_detail_luckydraw',
					// 	path: 'luckydraw',
					// 	meta: { requiresAuth: true },
					// 	component: resolve => require(['../views/live/detail-luckydraw.vue'], resolve)
					// },
					// {
					// 	name: 'live_detail_watch',
					// 	path: 'watch',
					// 	meta: { requiresAuth: true },
					// 	component: resolve => require(['../views/live/detail-watch.vue'], resolve)
					// },
					// {
					// 	name: 'live_detail_authorize',
					// 	path: 'authorize',
					// 	meta: { requiresAuth: true },
					// 	component: resolve => require(['../views/live/detail-authorize.vue'], resolve)
					// },
				],
			}
		]
	}
]










