/*
* @Author: Administrator
* @Date:   2017-01-06 02:29:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-01 18:10:10
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
	id = id || store.getters.channel;

	if (id) {
		if (to) {
			return router.push({ name: 'create_channel', params: { id: id } })
		} else {
			store.dispatch('CHANNEL_QUERY_REQUEST', id).then((data) => {
				if (data.channel.status == 2) {
					return store.commit('SET_CHANNEL', id);
				} else {
					return router.push({ name: 'create_channel', params: { id: id } })
				}
			});
		}
	} else {
		return store.commit('SET_CHANNEL');
	}

}

