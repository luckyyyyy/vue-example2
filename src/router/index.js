/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-18 14:53:49
*/

import Vue       from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import topRoute        from '@/router/top'
import liveRoute       from '@/router/live'
import VideoRoute      from '@/router/video'
import homeRoute       from '@/router/home'
import accountRoute    from '@/router/account'
// import storeRoute      from './store'
import userRoute       from '@/router/user'
import multimediaRoute from '@/router/multimedia'
import channelRoute    from '@/router/channel'

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

router.onReady((callback, errorCallback) => {
	if (window._vueloaded) {
		window._vueloaded();
	}
})
// router.onError(cb => {
// })
router.beforeResolve((to, from, next) => {
	next();
	NProgress.done();
})
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
// router.afterEach(route => {
// 	NProgress.done();
// })
export default router
