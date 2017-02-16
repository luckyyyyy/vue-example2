/*
* @Author: Administrator
* @Date:   2017-01-06 02:42:21
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-16 15:55:23
*/

'use strict';

export const SIGNIN_SUCCESS = (state, { data }) => {
	state.token = data.token;
	// state.invitation = data.invitation;
	state.user  = data.user;
	sessionStorage.setItem('user', JSON.stringify(data));
}

export const SIGNIN_FAILURE = (state, err) => {
	state.token = '';
	state.user  = {};
	state.shop  = 0;
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('shop');
	console.log(err);
}

export const SET_SHOP = (state, id) => {
	sessionStorage.setItem('shop', id);
	state.shop = id || 0;
}
