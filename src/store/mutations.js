/*
* @Author: Administrator
* @Date:   2017-01-06 02:42:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-25 00:44:53
*/

'use strict';
import { USER } from './types'
import router from '../router'

import { getSession, setSession } from './modules/user'

export const USER_LOGIN = (state, data) => {
	state.user.token = data.token;
	state.user.user  = data.user;
	setSession(state.user);
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
export const USER_CLEAR = (state, err) => {
	state.user.token      = '';
	state.user.user       = {};
	state.channel.channel = null;
	state.channel.id      = null;
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('channelID');
	const route = state.route;
	const requiresAuth = route.meta.requiresAuth;
	if (requiresAuth && err) {
		router.push({ name: 'login', query: { redirect: route.fullPath } })
	} else { // 正常退出
		router.push({ name: 'login' })
	}
}

export const CHANNEL_SELECT = (state, id) => {
	router.push({ name: 'index' })
	if (id) {
		sessionStorage.setItem('channelID', id);
	} else {
		sessionStorage.removeItem('channelID');
	}
	state.channel.id = id;
	const route = state.route;
	if (route.meta) {
		const requiresAuth = route.meta.requiresAuth;
		if (requiresAuth) {
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
}


