/*
* @Author: William Chan
* @Date:   2017-03-06 22:29:46
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 23:31:47
*/

'use strict';
import { registerModule } from '../store'

export default [
	{
		path: '/live',
		name: 'live',
		meta: { requiresAuth: true },
		redirect: { name: 'live_list' },
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
				name: 'live_list',
				path: 'list/:status?',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'live_list', name: '直播列表' }
				] },
				component: resolve => require([
					'../views/live/list.vue',
					'../store/modules/live/find',
					'../store/modules/live/create',
					'../store/modules/live/delete',
					'../store/modules/live/trash',
				], (
					LiveListComponent,
					LiveFindModule,
					LiveCreateModule,
					LiveDeleteModule,
					LiveTrashModule,
				) => {
					registerModule(['live', 'find'], LiveFindModule.default);
					registerModule(['live', 'create'], LiveCreateModule.default);
					registerModule(['live', 'delete'], LiveDeleteModule.default);
					registerModule(['live', 'trash'], LiveTrashModule.default);
					resolve(LiveListComponent);
				})
			},
			{
				name: 'live_template',
				path: 'template',
				meta: { requiresAuth: true },
				component: resolve => require(['../views/live/template.vue'], resolve)
			},
			{
				name: 'live_control',
				path: 'control/:liveid',
				meta: { requiresAuth: true, parent: 'live_list', breadcrumb: [
					{ route: 'live_list', name: '直播列表' },
					{ route: 'live_detail', name: '直播装修' },
					{ name: '中控台' },
				] },
				component: resolve => require([
					'../views/live/control.vue',
					'../store/modules/im',
					'../store/modules/live/stream',
					'../store/modules/live/public',
					'../store/modules/live/finish',
				], (
					LiveControlComponent,
					IMModule,
					LiveStreamModule,
					LivePublicModule,
					LiveFinishModule,
				) => {
					registerModule('im', IMModule.default);
					registerModule(['live', 'query_stream'], LiveStreamModule.default);
					registerModule(['live', 'public'], LivePublicModule.default);
					registerModule(['live', 'finish'], LiveFinishModule.default);
					resolve(LiveControlComponent);
				})
			},

			{
				name: 'live_data',
				path: 'data/:liveid',
				meta: { requiresAuth: true, parent: 'live_list' },
				component: resolve => require(['../views/live/data.vue'], resolve)
			},
			{
				name: 'live_detail',
				path: 'detail/:liveid',
				meta: { requiresAuth: true, parent: 'live_list' },
				redirect: { name: 'live_detail_countdown' },
				component: resolve => require(['../views/live/detail.vue'], resolve),
				children: [
					{
						name: 'live_detail_countdown',
						path: 'countdown',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-countdown.vue'], resolve)
					},
					{
						name: 'live_detail_image',
						path: 'image',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-image.vue'], resolve)
					},
					{
						name: 'live_detail_share',
						path: 'share',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-share.vue'], resolve)
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
					{
						name: 'live_detail_follow',
						path: 'follow',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-follow.vue'], resolve)
					},
					{
						name: 'live_detail_authorize',
						path: 'authorize',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-authorize.vue'], resolve)
					},
				],
			}
		],
	},
]
