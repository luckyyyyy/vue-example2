/*
* @Author: Administrator
* @Date:   2017-01-06 02:42:21
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-03 11:58:50
*/

'use strict';
import { USER } from '@/store/types'
import router from '@/router'

export const USER_LOGIN = (state) => {
	const route = state.route;
	if (route.meta){
		const requiresAuth = route.meta.requiresAuth;
		if (!requiresAuth && route.name) {
			if (route.query.redirect) {
				router.push({ path: route.query.redirect })
			} else {
				router.push({ name: 'index' })
			}
		}
	}
}
export const USER_LOGOUT = (state, err) => {
	const route = state.route;
	const requiresAuth = route.meta.requiresAuth;
	if (requiresAuth && err) {
		router.push({ name: 'login', query: { redirect: route.fullPath } })
	} else { // 正常退出
		router.push({ name: 'login' })
	}
}

export const CHANNEL_SELECT = (state, id) => {
	const route = state.route;
	if (route.meta) {
		if (id) {
			if (route.meta.group == 'select' && route.meta.group != 'global') {
				if (route.query.redirect) {
					router.push({ path: route.query.redirect })
				} else {
					router.push({ name: 'index' })
				}
			}
		} else {
			if (route.meta.group != 'select' && route.meta.group != 'global') {
				router.push({ name: 'select_channel', query: { redirect: route.fullPath } });
			}
		}
	}
}


