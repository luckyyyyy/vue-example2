/*
* @Author: Administrator
* @Date:   2017-01-06 02:29:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 03:45:48
*/

'use strict';

export const SIGNIN_CHECK = ({ commit }) => {
	try {
		const data = JSON.parse(sessionStorage.getItem('user'));
		commit('SIGNIN_SUCCESS', { data });
	} catch(e) {
		console.log('无法直接登录');
	}
}