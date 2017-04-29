/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   Webster
* @Last Modified time: 2017-04-29 15:59:03
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

import { getAuthorization, getCurrentChannel, store } from '../store'


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
// router.beforeResolve via 2.5.0+
// In 2.5.0+ you can register a global guard with router.beforeResolve.
// This is similar to router.beforeEach, with the difference that resolve guards will be called right before the navigation is confirmed,
// after all in-component guards and async route components are resolved.
// // router.onError = err => {
// 	console.log(err)
// }
router.beforeEach(async (to, from, next) => {
	NProgress.remove();
	NProgress.start();
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	let params;
	const user = await getAuthorization();
	if (!user) {
		if (to.name == '404' || to.fullPath == '/') {
			params = { name: 'login' };
		} else if (requiresAuth) {
			params = { name: 'login', query: { redirect: to.fullPath } };
		}
	} else {
		const channel = await getCurrentChannel();
		if (channel) {
			if (channel.status != 2) {
				store.commit('channel/CHANNEL_SELECT', null);
				params = { name: 'create_channel', params: { id: channel.channelId } };
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
export default router
