/*
* @Author: Administrator
* @Date:   2017-01-06 02:29:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 14:01:25
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

export const SELECT_CHANNEL = (store, id) => {
	id = id || store.getters.channel;
	if (id) {
		store.dispatch('CHANNEL_QUERY_REQUEST', id).then((data) => {
			if (data.channel.status == 2) {
				return store.commit('SET_CHANNEL', id);
			} else {
				return router.push({ name: 'create_channel', params: { id: id } })
			}
		}).catch(() => {
			store.commit('SET_CHANNEL');
		})
	} else {
		return store.commit('SET_CHANNEL');
	}

}

