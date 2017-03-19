/*
* @Author: Administrator
* @Date:   2017-01-06 02:42:21
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 15:03:01
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
	state.channel.channel = {};
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

export const CHANNEL_SELECT = (state, channel) => {
	if (channel && channel.channelId) {
		sessionStorage.setItem('channelID', channel.channelId);
	} else {
		sessionStorage.removeItem('channelID');
	}
	state.channel.channel = channel;
	const route = state.route;
	if (route.meta) {
		const requiresAuth = route.meta.requiresAuth;
		if (requiresAuth) {
			if (state.channel.channel) {
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


