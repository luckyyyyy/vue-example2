/*
* @Author: William Chan
* @Date:   2017-03-06 22:27:42
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 22:49:25
*/

'use strict';

import { registerModule } from '../store'

export default [
	{
		path: '/home',
		meta: { requiresAuth: true },
		redirect: { name: 'select_channel' },
		components: {
			home: resolve => require([
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
					registerModule(['channel', 'find'],   ChannelFindModule.default);
					registerModule(['channel', 'delete'], ChannelDeleteModule.default);
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
					registerModule(['channel', 'create'], ChannelCreateModule.default);
					registerModule('weixin_auth', WeixinAuthurlModule.default);
					registerModule('catalogs', CommodityCatalogsModule.default);
					resolve(CreateComponent);
				})
			},
			{
				path: '/user/profile',
				name: 'profile',
				meta: { requiresAuth: true, group: 'global', name: "个人中心" },
				component: resolve => require([
					'../views/user/profile.vue',
					'../store/modules/user/profile',
				], (
					ProfileComponent,
					ProfileUserModule,
				) => {
					registerModule(['user', 'profile'], ProfileUserModule.default);
					resolve(ProfileComponent);
				})
			},
			{
				path: '/user/password',
				name: 'password',
				meta: { requiresAuth: true, group: 'global', name: "修改密码" },
				component: resolve => require([
					'../views/user/password.vue',
					'../store/modules/user/password',
				], (
					PasswordComponent,
					PasswordModule,
				) => {
					registerModule(['user', 'password'], PasswordModule.default);
					resolve(PasswordComponent);
				})
			},
		]
	},
]
