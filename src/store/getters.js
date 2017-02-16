/*
* @Author: Administrator
* @Date:   2017-01-06 02:28:10
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-16 13:31:42
*/

'use strict';

export const auth = state => {
	const token = `${state.token}:`;
	return `Basic ${new Buffer(token).toString('base64')}`;
}

export const member = state => {
	if (state.user.length > 0 && state.token) {
		return { user: state.user, token: state.token };
	} else {
		const user = sessionStorage.getItem('user');
		if (user) {
			return JSON.parse(user);
		} else {
			return {}
		}
	}
}

export const shop = state => {
	if (state.shop > 0) {
		return state.shop;
	} else {
		const shop = sessionStorage.getItem('shop');
		if (shop) {
			return shop;
		} else {
			return 0
		}
	}
}
