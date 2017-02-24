/*
* @Author: Administrator
* @Date:   2017-01-06 02:42:21
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-24 17:50:01
*/

'use strict';

import router from "../router"

const setSession = ({token, user}) => {
	sessionStorage.setItem('user', JSON.stringify({ token, user }));
}

export const LOGIN_SUCCESS = (state, data) => {
	state.token = data.token;
	state.user  = data.user;
	setSession(data);
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

export const LOGIN_FAILURE = (state, err) => {
	state.token = '';
	state.user  = {};
	state.channel  = 0;
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('channel');
	const route = state.route;
	const requiresAuth = route.meta.requiresAuth;
	if (requiresAuth) {
		router.push({ name: 'login', query: { redirect: route.fullPath } })
	}
	console.log(err);
}

export const UPDATE_USER_SUCCESS = (state, data) => {
	state.user = data.user;
	setSession(state);
}

export const UPDATE_USER_AVATAR = (state, avatar) => {
	state.user.avatar = avatar;
	setSession(state);
}

export const SET_CHANNEL = (state, id) => {
	sessionStorage.setItem('channel', id);
	state.channel = id || 0;
	const route = state.route;
	if (route.meta) {
		const requiresAuth = route.meta.requiresAuth;
		if (requiresAuth) {
			if (state.channel != 0) {
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
}
