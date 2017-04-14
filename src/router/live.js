/*
* @Author: William Chan
* @Date:   2017-03-06 22:29:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-14 20:23:37
*/

'use strict';
import { registerModule } from '../store'
import LiveModule from '../store/modules/live'

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
				'../store/modules/live/query',
			], (
				MainComponent,
				LiveQueryModule,
			) => {
				registerModule(['live', 'query'], LiveQueryModule.default);
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
					'../store/modules/live/public',
				], (
					LiveListComponent,
					LiveFindModule,
					LiveCreateModule,
					LiveDeleteModule,
					LiveTrashModule,
					LivePublicModule,
				) => {
					registerModule(['live', 'find'], LiveFindModule.default);
					registerModule(['live', 'create'], LiveCreateModule.default);
					registerModule(['live', 'delete'], LiveDeleteModule.default);
					registerModule(['live', 'trash'], LiveTrashModule.default);
					registerModule(['live', 'public'], LivePublicModule.default);
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
					'../store/modules/live/finish',
					'../store/modules/live/notice',
				], (
					LiveControlComponent,
					IMModule,
					LiveStreamModule,
					LiveFinishModule,
					LiveNoticeModule,
				) => {
					registerModule('im', IMModule.default);
					registerModule(['live', 'query_stream'], LiveStreamModule.default);
					registerModule(['live', 'finish'], LiveFinishModule.default);
					registerModule(['live', 'notice'], LiveNoticeModule.default);
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
				path: 'detail',
				meta: { requiresAuth: true, parent: 'live_list' },
				redirect: { name: 'live_detail_countdown' },
				component: resolve => require([
					'../views/live/detail.vue',
					'../store/modules/live/detail',
				], (
					LiveDetailComponent,
					LiveDetailModule
				) => {
					registerModule(['live', 'detail'], LiveDetailModule.default);
					resolve(LiveDetailComponent);
				}),
				children: [
					{
						name: 'live_detail_countdown',
						path: 'countdown/:liveid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-countdown.vue'], resolve)
					},
					{
						name: 'live_detail_image',
						path: 'image/:liveid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-image.vue'], resolve)
					},
					{
						name: 'live_detail_share',
						path: 'share/:liveid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-share.vue'], resolve)
					},
					{
						name: 'live_detail_setting',
						path: 'setting/:liveid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-setting.vue'], resolve)
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
						name: 'live_detail_watch',
						path: 'watch/:liveid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-watch.vue'], resolve)
					},
					{
						name: 'live_detail_authorize',
						path: 'authorize/:liveid',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/live/detail-authorize.vue'], resolve)
					},
				],
			}
		],
	},
]
