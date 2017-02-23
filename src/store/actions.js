/*
* @Author: Administrator
* @Date:   2017-01-06 02:29:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-23 17:24:52
*/

'use strict';

import { LOGIN } from './types'
import router from '../router'

export const LOGIN_CHECK = (store) => {
	const getters = store.getters;
	if (!getters.member.user){
		console.log('无法直接登录');
	} else {
		store.commit(LOGIN.SUCCESS, getters.member);
	}
}

export const SELECT_CHANNEL = (store, channel) => {
	let id, to;
	if (channel && channel.id) {
		id = channel.id;
		to = channel.to;
	} else {
		id = channel;
	}
	if (id === undefined) {
		if (store.getters.channel != 0) {
			store.commit('SET_CHANNEL', store.getters.channel);
		} else {
			console.log('没有选择频道');
		}
	} else {
		if (to) {
			router.push({ name: 'create_channel', params: { id: id } })
		} else {
			store.commit('SET_CHANNEL', id);

		}
	}
}
