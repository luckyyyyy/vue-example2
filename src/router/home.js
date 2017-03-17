/*
* @Author: William Chan
* @Date:   2017-03-06 22:27:42
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-17 14:19:21
*/

'use strict';

import store from '../store'

export default [
	{
		path: '/home',
		meta: { requiresAuth: true },
		redirect: { name: 'select_channel' },
		components: {
			select: resolve => require([
				'../views/home/page.vue',
			], (
				HomeComponent,
			) => {
				resolve(HomeComponent);
			})
		},
		children: [
			{
				name: 'select_channel',
				path: 'select/:id?',
				meta: { requiresAuth: true, group: 'select', name: "选择频道" },
				component: resolve => require([
					'../views/home/select.vue',
					'../store/modules/channel/find',
					'../store/modules/channel/delete'
				], (
					SelectComponent,
					ChannelFindModule,
					ChannelDeleteModule,
				) => {
					store.registerModule('channel_find', ChannelFindModule.default);
					store.registerModule('channel_delete', ChannelDeleteModule.default);
					resolve(SelectComponent);
				})
			},
			{
				name: 'create_channel',
				path: 'create/:id?',
				meta: { requiresAuth: true, group: 'select', name: "创建频道" },
				component: resolve => require([
					'../views/home/create.vue',
					'../store/modules/channel/create',
					'../store/modules/weixin/auth_url',
					'../store/modules/commodity/catalogs'
				], (
					CreateComponent,
					ChannelCreateModule,
					WeixinAuthurlModule,
					CommodityCatalogsModule,
				) => {
					store.registerModule('channel_create', ChannelCreateModule.default);
					store.registerModule('weixin_auth_url', WeixinAuthurlModule.default);
					store.registerModule('catalogs', CommodityCatalogsModule.default);
					resolve(CreateComponent);
				})
			},
		]
	},
]
