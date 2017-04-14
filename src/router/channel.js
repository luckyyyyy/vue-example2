/*
* @Author: William Chan
* @Date:   2017-03-23 13:14:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-14 20:22:41
*/

'use strict';
import { registerModule } from '../store'

export default [
	{
		path: '/channel',
		name: 'channel',
		meta: { requiresAuth: true },
		redirect: { name: 'channel_index' },
		components: {
			sidebar: resolve => require(['../components/sidebar.vue'], resolve),
			topbar:  resolve => require(['../components/topbar.vue'], resolve),
			main:    resolve => {
				return require([
					'../components/main.vue',

				], (
					MainComponent,
				) => {
					resolve(MainComponent)
				})
			}
		},
		children: [
			{
				name: 'channel_index',
				path: 'index',
				meta: { requiresAuth: true, parent: 'channel' },
				component: resolve => require([
					'../views/channel/index.vue',
				], (
					ChannelIndexComponent,
				) => {
					resolve(ChannelIndexComponent);
				})
			},
			{
				name: 'channel_preferences',
				path: 'preferences',
				meta: { requiresAuth: true },
				component: resolve => require([
					'../views/channel/preferences.vue',
					// '../store/modules/channel/delete'
				], (
					PreferencesComponent,
					// ChannelFindModule,
				) => {
					// registerModule(['channel', 'delete'], ChannelDeleteModule.default);
					resolve(PreferencesComponent);
				})
			},
			{
				name: 'channel_template',
				path: 'template/:templateID',
				meta: { requiresAuth: true, parent: 'channel' },
				component: resolve => require([
					'../views/channel/template.vue',
					'../store/modules/live/find',
				],(
					TemplateComponent,
					LiveFindModule,
				) => {
					registerModule(['live', 'find'], LiveFindModule.default);
					resolve(TemplateComponent);
				})
			},
		]
	},
]
