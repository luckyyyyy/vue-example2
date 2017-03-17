/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-17 21:58:13
*/

'use strict';

import Vue       from 'vue'
import VueRouter from 'vue-router'
import store     from '../store'

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

Vue.use(VueRouter);

const module = {};
export const registerModule = (path, module) => {
	if (!module[path]) {
		store.registerModule(path, module);
		module[path] = true;
	}
}

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
router.beforeEach((to, from, next) => {
	NProgress.remove();
	NProgress.start();
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	if (!store.getters.member.token) {
		if (to.name == '404' || to.fullPath == '/') {
			return next({ name: 'login' });
		} else if (requiresAuth) {
			return next({ name: 'login', query: { redirect: to.fullPath } });
		}
	} else {
		if (store.getters.channel) {
			if (to.meta.group == 'select' && to.meta.group != 'global') {
				if (to.query.redirect) {
					return next({ path: to.query.redirect })
				} else {
					return next({ name: 'index' })
				}
			}
		} else {
			if (to.meta.group != 'select' && to.meta.group != 'global') {
				return next({ name: 'select_channel', query: { redirect: to.fullPath } });
			}
		}
		if (!requiresAuth) {
			if (to.query.redirect) {
				return next({ path: to.query.redirect })
			} else {
				return next({ name: 'index' })
			}
		}
	}
	return next();
})
router.afterEach(route => {
	NProgress.done(true);
})

export default router
