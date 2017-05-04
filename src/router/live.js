/*
* @Author: William Chan
* @Date:   2017-03-06 22:29:46
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-04 16:36:34
*/

export default [
	{
		path: '/live',
		name: 'live',
		meta: { requiresAuth: true },
		redirect: { name: 'live_list' },
		components: {
			sidebar: resolve => import('@/components/sidebar.vue'),
			topbar:  resolve => import('@/components/topbar.vue'),
			main:    resolve => import('@/components/main.vue'),
		},
		children: [
			{
				name: 'live_list',
				path: 'list/:status?',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'live_list', name: '直播列表' }
				] },
				component: resolve => import('@/views/live/list.vue'),
			},
			{
				name: 'live_template',
				path: 'template',
				meta: { requiresAuth: true },
				component: resolve => import('@/views/live/template.vue'),
			},
			{
				name: 'live_control',
				path: 'control/:liveid',
				meta: { requiresAuth: true, parent: 'live_list', breadcrumb: [
					{ route: 'live_list', name: '直播列表' },
					{ route: 'live_detail', name: '直播装修' },
					{ name: '中控台' },
				] },
				component: resolve => import('@/views/live/control.vue'),
			},

			{
				name: 'live_data',
				path: 'data/:liveid',
				meta: { requiresAuth: true, parent: 'live_list' },
				component: resolve => import('@/views/live/data.vue'),
			},
			{
				name: 'live_detail',
				path: 'detail',
				meta: { requiresAuth: true, parent: 'live_list' },
				redirect: { name: 'live_detail_countdown' },
				component: resolve => import('@/views/live/detail.vue'),
				children: [
					{
						name: 'live_detail_countdown',
						path: 'countdown/:liveid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/live/detail-countdown.vue'),
					},
					{
						name: 'live_detail_image',
						path: 'image/:liveid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/live/detail-image.vue'),
					},
					{
						name: 'live_detail_share',
						path: 'share/:liveid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/live/detail-share.vue'),
					},
					{
						name: 'live_detail_setting',
						path: 'setting/:liveid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/live/detail-setting.vue'),
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
						component: resolve => import('@/views/live/detail-watch.vue'),
					},
					{
						name: 'live_detail_authorize',
						path: 'authorize/:liveid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/live/detail-authorize.vue'),
					},
				],
			}
		],
	},
]
