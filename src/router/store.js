/*
* @Author: William Chan
* @Date:   2017-03-06 22:30:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-04 20:14:29
*/

export default [
	{
		path: '/store',
		meta: { requiresAuth: true },
		redirect: { name: 'store_shop_list' },
		components: {
			sidebar: resolve => import('@/components/sidebar.vue'),
			topbar:  resolve => import('@/components/topbar.vue'),
			main:    resolve => import('@/components/main.vue'),
		},
		children: [
			{ // 保证在前面 先后顺序匹配
				name: 'store_shop_create',
				path: 'shop/create',
				meta: { requiresAuth: true, parent: 'store_shop_list', },
				component: resolve => require(['../views/store/create.vue'], resolve)
			},
			{
				name: 'store_shop_list',
				path: 'shop/:type?',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'index', name: 'A' },
					{ route: 'store_shop_list', name: 'B' },
					{ route: 'store_shop_list', name: 'C' },
					{ route: 'store_shop_list', name: '商品列表' },
					{ route: 'store_shop_list', name: 'D' },
					{ route: 'index', name: 'A' },
					{ route: 'store_shop_list', name: 'B' },
					{ route: 'store_shop_list', name: 'C' },
					{ route: 'store_shop_list', name: '商品列表' },
					{ route: 'store_shop_list', name: 'D' },
				] },
				component: resolve => require(['../views/store/shop.vue'], resolve)
			},
			{
				name: 'store_order_list',
				path: 'order',
				meta: { requiresAuth: true, breadcrumb: [
					{ route: 'store_order_list', name: '订单管理' },
				] },
				component: resolve => require(['../views/store/order.vue'], resolve)
			},
			{
				name: 'store_order_detail',
				path: 'order/detail/:id',
				meta: { requiresAuth: true, parent: 'store_order_list' [
					{ route: 'store_order_list', name: '订单管理' },
					{ route: 'store_order_detail', name: '订单详情' }
				] },
				component: resolve => require(['../views/store/order-detail.vue'], resolve)
			},
			{
				name: 'store_setting',
				path: 'setting',
				meta: { requiresAuth: true, parent: 'store_setting' },
				redirect: { name: 'store_setting_pay' },
				component: resolve => require(['../views/store/setting.vue'], resolve),
				children: [
					{
						name: 'store_setting_pay',
						path: 'pay',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/store/setting-pay.vue'], resolve)
					},
					{
						name: 'store_setting_order',
						path: 'order',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/store/setting-order.vue'], resolve)
					},
					{
						name: 'store_setting_address',
						path: 'address',
						meta: { requiresAuth: true },
						component: resolve => require(['../views/store/setting-address.vue'], resolve)
					},
				],

			},
		]
	},
]
