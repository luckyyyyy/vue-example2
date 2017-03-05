/*
* @Author: Administrator
* @Date:   2017-01-06 02:28:10
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-06 03:28:47
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

export const channel = state => {
	if (state.channel) {
		return state.channel;
	} else {
		return sessionStorage.getItem('channel');
	}
}








