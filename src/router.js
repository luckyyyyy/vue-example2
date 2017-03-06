/*
* @Author: William Chan
* @Date:   2016-12-01 17:57:50
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-06 23:16:28
*/

'use strict';

import Vue       from 'vue'
import VueRouter from 'vue-router'
import store     from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import topRoute     from './router/top'
import liveRoute    from './router/live'
import homeRoute    from './router/home'
import accountRoute from './router/account'
import storeRoute   from './router/store'
import userRoute    from './router/user'

Vue.use(VueRouter);

const routes = [].concat(
	liveRoute, homeRoute, accountRoute, storeRoute, userRoute,
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
	console.log(1)
	NProgress.remove();
	NProgress.start();
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	console.log(to)
	if (!store.getters.member.token) {
		console.log(3)
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
	console.log(2)
	return next();
})
router.afterEach(route => {
	NProgress.done(true);
})

export default router
