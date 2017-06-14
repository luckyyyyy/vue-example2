/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-26 18:03:31
*/

'use strict';

import * as api from '@/store/api/user'
import { USER, CHANNEL } from '@/store/types'

export default {
	namespaced: true,
	state: {
		user: null,
	},
	getters: {
		user: state => {
			if (state.user && Object.keys(state.user).length !== 0) {
				return state.user;
			} else {
				return false;
			}
		}
	},
	actions: {
		[USER.GET] ({ commit }, ...args) {
			return api.get_user().then(data => {
				commit(USER.LOGIN, data.data);
			}).catch(() => {
				commit(USER.LOGOUT);
			})
		},
		[USER.LOGOUT] ({ dispatch }, ...args) {
			return new Promise((resolve, reject) => {
				api.logout().then(() => {
					dispatch(USER.CLEAR);
					resolve();
				}).catch(() => {
					reject();
				})
			})
		},
		[USER.CLEAR] ({ commit }, err) {
			commit(`channel/${CHANNEL.SELECT}`, null, { root: true });
			commit(USER.LOGOUT);
			commit(USER.LOGOUT, err, { root: true });
		},
		[USER.LOGIN] ({ commit }, ...args) {
			return new Promise((resolve, reject) => {
				api.login(...args).then(res => {
					commit(USER.LOGIN, res.data);
					commit(USER.LOGIN, res.data, { root: true });
					resolve();
				}).catch(err => {
					reject();
				})
			})
		},
		[USER.PASSWORD] ({ commit }, params) {
			return api.password(params);
		},
		[USER.UPDATE] ({ commit }, ...args) {
			return new Promise((resolve, reject) => {
				api.update_user(...args).then(res => {
					commit(USER.UPDATE, res.data);
					resolve();
				}).catch(err => {
					reject();
				})
			});
		},
		[USER.REGISTER] ({ commit }, params) {
			return api.register(params);
		},
		[USER.REGISTER_CAPTCHA] (store, params) {
			return api.register_captcha(params);
		},
		[USER.RESETPWD_CAPTCHA] (store, params) {
			return api.reset_password_captcha(params)
		},
		[USER.RESETPWD] ({ commit }, params) {
			return api.reset_password(params);
		}
	},
	mutations: {
		[USER.UPDATE] (state, data) {
			state.user = Object.assign(state.user, data.user);
		},
		[USER.UPDATE_AVATAR] (state, avatar) {
			state.user.avatar = avatar;
		},
		[USER.LOGIN] (state, data) {
			state.user = data.user;
		},
		[USER.LOGOUT] (state) {
			state.user = {};
		}
	}
}
