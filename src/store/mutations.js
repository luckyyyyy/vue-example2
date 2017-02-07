/*
* @Author: Administrator
* @Date:   2017-01-06 02:42:21
* @Last Modified by:   William Chan
* @Last Modified time: 2017-01-07 06:02:30
*/

'use strict';

export const SIGNIN_SUCCESS = (state, { data }) => {
	if (data.user.verified == 1) {
		state.token = data.token;
	} else {
		data.token = undefined;
	}
	state.invitation = data.invitation;
	state.user  = data.user;
	sessionStorage.setItem('user', JSON.stringify(data));
}

export const SIGNIN_FAILURE = (state, err) => {
	state.token = '';
	state.user  = {};
	sessionStorage.removeItem('user');
	console.log(err);
}
