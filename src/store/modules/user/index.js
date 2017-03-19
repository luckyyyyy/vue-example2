/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 15:08:30
*/

'use strict';

import { logout } from '../../api/user'
import { LOGIN, USER } from '../../types'

const state = {
	user: {},
	token: ''
}

export const getSession = () => {
	return JSON.parse(sessionStorage.getItem('user'));
}

export const setSession = ({ token, user }) => {
	sessionStorage.setItem('user', JSON.stringify({ token, user }));
}

const getters = {
	member: state => {
		if (state.user.length > 0 && state.token) {
			return { user: state.user, token: state.token };
		} else {
			return getSession() || {};
		}
	},
	auth: state => {
		let token;
		if (state.token) {
			token = state.token;
		} else {
			const data = getSession();
			if (data && data.token) {
				token = data.token;
			}
		}
		return token && `Basic ${new Buffer(`${token}:`).toString('base64')}`;
	}
}

const actions = {
	[USER.LOGIN] ({ getters, commit }) {
		if (!getters.member.user){
			console.log('无法直接登录');
		} else {
			commit(USER.LOGIN, getters.member, { root: true });
		}
	},
	[USER.LOGOUT] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			logout().then(() => {
				commit(USER.CLEAR, null, { root: true });
				resolve();
			}).catch(() => {
				reject();
			})
		})
	}
}

const mutations = {
	[USER.UPDATE] (state, data) {
		state.user = Object.assign(state.user, data.user);
		setSession(state);
	},
	[USER.UPDATE_AVATAR] (state, avatar) {
		state.user.avatar = avatar;
		setSession(state);
	}
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
