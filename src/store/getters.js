/*
* @Author: Administrator
* @Date:   2017-01-06 02:28:10
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-17 15:57:38
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
		const data = sessionStorage.getItem('user');
		if (data) {
			return JSON.parse(data);
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
