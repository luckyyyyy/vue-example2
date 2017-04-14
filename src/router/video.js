/*
* @Author: William Chan
* @Date:   2017-03-15 13:20:01
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-14 15:55:45
*/

'use strict';

import { registerModule } from '../store'
import VideoModule from '../store/modules/video'

export default [
	{
		path: '/video',
		name: 'video',
		meta: { requiresAuth: true },
		redirect: { name: 'video_list' },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			topbar:  resolve => require(['../components/topbar.vue'], resolve),
			main:    resolve => {
				registerModule('video', VideoModule);
				return require([
					'../components/main.vue',
				], (
					MainComponent,
				) => {

					resolve(MainComponent);
				})
			}
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
					'../store/modules/video/find',
					'../store/modules/video/trash',
					'../store/modules/video/delete',
				], (
					VideoListComponent,
					VideoFindModule,
					VideoTrashModule,
					VideoDeleteModule,
				) => {
					registerModule(['video', 'find'], VideoFindModule.default);
					registerModule(['video', 'trash'], VideoTrashModule.default);
					registerModule(['video', 'delete'], VideoDeleteModule.default);
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
				path: 'detail',
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
						path: 'image/:videoid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/video/detail-image.vue'], resolve)
					},
					{
						name: 'video_detail_share',
						path: 'share/:videoid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/video/detail-share.vue'], resolve)
					},
					{
						name: 'video_detail_setting',
						path: 'setting/:videoid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/video/detail-setting.vue'], resolve)
					},
					{
						name: 'video_detail_authorize',
						path: 'authorize/:videoid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/video/detail-authorize.vue'], resolve)
					},
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
				],
			}
		]
	}
]










