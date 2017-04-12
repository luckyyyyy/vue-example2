/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   William Chan
* @Last Modified time: 2017-04-12 16:51:49
*/

'use strict';

import Vue       from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { LoadingBar } from 'iview' // 暂时不用

import topRoute        from './top'
import liveRoute       from './live'
import VideoRoute      from './video'
import homeRoute       from './home'
import accountRoute    from './account'
// import storeRoute      from './store'
import userRoute       from './user'
import multimediaRoute from './multimedia'
import channelRoute    from './channel'

import { getAuthorization, getCurrentChannelID, store } from '../store'


Vue.use(VueRouter);
const routes = [].concat(
	accountRoute, // storeRoute,
	liveRoute, VideoRoute, homeRoute, userRoute,
	multimediaRoute, channelRoute,
	topRoute
);

const router = new VueRouter({
	// base: __dirname,
	base: 'store',
	routes,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

router.beforeEach(async (to, from, next) => {
	NProgress.remove();
	NProgress.start();
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	let params;
	const channel = getCurrentChannelID();
	if (!getAuthorization()) {
		if (to.name == '404' || to.fullPath == '/') {
			params = { name: 'login' };
		} else if (requiresAuth) {
			params = { name: 'login', query: { redirect: to.fullPath } };
		}
	} else {
		if (channel) {
			const state = store.state.channel;
			// 这里有坑 不过暂时先这样
			if (!state.channel || state.id != state.channel.channelID) {
				await store.dispatch('channel/CHANNEL_QUERY',  channel).then(res => {
					if (res.channel.status != 2) {
						store.commit('channel/CHANNEL_SELECT', null);
						params = { name: 'create_channel', params: { id: channel } };
					}
				}).catch(err => {
					store.commit('channel/CHANNEL_SELECT', null);
					params = { name: 'select_channel', query: { redirect: to.fullPath } };
				})
			}
			if (to.meta.group == 'select' && to.meta.group != 'global') {
				if (to.query.redirect) {
					params = { path: to.query.redirect };
				} else {
					params = { name: 'index' };
				}
			}
		} else {
			if (to.meta.group != 'select' && to.meta.group != 'global') {
				params = { name: 'select_channel', query: { redirect: to.fullPath } };
			}
		}
		if (!requiresAuth) {
			if (to.query.redirect) {
				params = { path: to.query.redirect };
			} else {
				params = { name: 'index' }
			}
		}
	}
	if (!params) NProgress.done();
	next(params);
})
router.afterEach(route => {
	NProgress.done();
})
// router.onError = err => {
// 	console.log(err)
// }
export default router
