/*
* @Author: Administrator
* @Date:   2017-01-06 02:29:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-17 22:18:41
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

export const SELECT_SHOP = (store, id) => {
	if (id === undefined) {
		if (store.getters.shop > 0) {
			store.commit('SET_SHOP', store.getters.shop);
		} else {
			console.log('没有选择频道');
		}
	} else {
		store.commit('SET_SHOP', id);
	}
}
