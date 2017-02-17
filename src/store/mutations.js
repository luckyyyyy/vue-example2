/*
* @Author: Administrator
* @Date:   2017-01-06 02:42:21
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-17 17:53:04
*/

'use strict';

import router from "../router"

export const SIGNIN_SUCCESS = (state, data) => {
	state.token = data.token;
	state.user  = data.user;
	sessionStorage.setItem('user', JSON.stringify({ token: data.token, user: data.user }));
	const route = state.route;
	const requiresAuth = route.meta.requiresAuth;
	if (!requiresAuth && route.name) {
		if (route.query.redirect) {
			router.push({ path: route.query.redirect })
		} else {
			router.push({ name: 'index' })
		}
	}
}

export const SIGNIN_FAILURE = (state, err) => {
	state.token = '';
	state.user  = {};
	state.shop  = 0;
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('shop');
	const route = state.route;
	const requiresAuth = route.meta.requiresAuth;
	if (requiresAuth) {
		router.push({ name: 'login', query: { redirect: route.fullPath } })
	}
	console.log(err);
}

export const SET_SHOP = (state, id) => {
	sessionStorage.setItem('shop', id);
	state.shop = id || 0;
	const route = state.route;
	const requiresAuth = route.meta.requiresAuth;
	if (requiresAuth) {
		if (state.shop > 0) {
			if (route.meta.group == 'select' && route.meta.group != 'global') {
				if (route.query.redirect) {
					router.push({ path: route.query.redirect })
				} else {
					router.push({ name: 'index' })
				}
			}
		} else {
			if (route.meta.group != 'select' && route.meta.group != 'global') {
				router.push({ name: 'select_shop', query: { redirect: route.fullPath } });
			}
		}
	}
}
