/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-20 02:46:17
*/

'use strict';

import Vue       from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { LoadingBar } from 'iview' // 暂时不用

import topRoute     from './top'
import liveRoute    from './live'
import VideoRoute   from './video'
import homeRoute    from './home'
// import accountRoute from './account'
// import storeRoute   from './store'
import userRoute    from './user'

import { getAuthorization, getCurrentChannelID, store } from '../store'


Vue.use(VueRouter);
const routes = [].concat(
	// accountRoute, storeRoute,
	liveRoute, VideoRoute, homeRoute, userRoute,
	topRoute
);

const router = new VueRouter({
	base: __dirname,
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
	if (!getAuthorization()) {
		if (to.name == '404' || to.fullPath == '/') {
			params = { name: 'login' };
		} else if (requiresAuth) {
			params = { name: 'login', query: { redirect: to.fullPath } };
		}
	} else {
		if (getCurrentChannelID()) {
			if (to.params.liveid) {
					await store.dispatch('live/LIVE_QUERY', { id: to.params.liveid }).then(res => {
						// success
					}).catch(err => {
						if (from.matched.some(record => record.name == 'live')) {
							params = false;
						} else {
							params =  { name: 'index' };
							// TODO 根据服务器来源判断
						}
					})
			} else {
				if (to.meta.group == 'select' && to.meta.group != 'global') {
					if (to.query.redirect) {
						params = { path: to.query.redirect };
					} else {
						params = { name: 'index' };
					}
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
