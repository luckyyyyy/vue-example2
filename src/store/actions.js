/*
* @Author: Administrator
* @Date:   2017-01-06 02:29:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-21 02:23:19
*/

'use strict';

import { LOGIN } from './types'

export const LOGIN_CHECK = (store) => {
	const getters = store.getters;
	if (!getters.member.user){
		console.log('无法直接登录');
	} else {
		store.commit(LOGIN.SUCCESS, getters.member);
	}
}

export const SELECT_CHANNEL = (store, id) => {
	if (id === undefined) {
		if (store.getters.channel > 0) {
			store.commit('SET_CHANNEL', store.getters.channel);
		} else {
			console.log('没有选择频道');
		}
	} else {
		store.commit('SET_CHANNEL', id);
	}
}
