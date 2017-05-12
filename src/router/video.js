/*
* @Author: William Chan
* @Date:   2017-03-15 13:20:01
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-12 10:54:45
*/

export default [
	{
		path: '/video',
		name: 'video',
		meta: { requiresAuth: true },
		redirect: { name: 'video_list' },
		components: {
			sidebar: resolve => import('@/components/sidebar.vue'),
			topbar:  resolve => import('@/components/topbar.vue'),
			main:    resolve => import('@/components/main.vue'),
		},
		children: [
			{
				name: 'video_list',
				path: 'list/:status?',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'video_list', name: '回放列表' }
				] },
				component: resolve => import('@/views/video/list.vue'),
			},
			{
				name: 'video_data',
				path: 'data/:videoid',
				meta: { requiresAuth: true, parent: 'video_list' },
				component: resolve => import('@/views/video/data.vue'),
			},
			{
				name: 'video_detail',
				path: 'detail',
				meta: { requiresAuth: true, parent: 'video_list' },
				redirect: { name: 'video_detail_image' },
				component: resolve => import('@/views/video/detail.vue'),
				children: [
					{
						name: 'video_detail_image',
						path: 'image/:videoid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/video/detail-image.vue'),
					},
					{
						name: 'video_detail_share',
						path: 'share/:videoid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/video/detail-share.vue'),
					},
					{
						name: 'video_detail_setting',
						path: 'setting/:videoid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/video/detail-setting.vue'),
					},
					{
						name: 'video_detail_authorize',
						path: 'authorize/:videoid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/video/detail-authorize.vue'),
					},
					{
						name: 'video_detail_play',
						path: 'play/:videoid',
						meta: { requiresAuth: true },
						component: resolve => import('@/views/video/detail-play.vue'),
					},
				],
			}
		]
	}
]










