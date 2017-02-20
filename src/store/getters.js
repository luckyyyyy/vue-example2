/*
* @Author: Administrator
* @Date:   2017-01-06 02:28:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-21 02:23:37
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
	if (state.channel > 0) {
		return state.channel;
	} else {
		const channel = sessionStorage.getItem('channel');
		if (channel) {
			return channel;
		} else {
			return 0
		}
	}
}
