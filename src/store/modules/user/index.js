/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-05 13:22:12
*/

'use strict';

import * as api from '@/store/api/user'
import { USER, CHANNEL } from '@/store/types'

const state = {
	user: null,
}

const getters = {
	user: state => {
		if (state.user && Object.keys(state.user).length !== 0) {
			return state.user;
		} else {
			return false;
		}
	}
}

const actions = {
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
	[USER.PASSWORD] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.password(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
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
	[USER.REGISTER] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.register(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	},
	[USER.REGISTER_CAPTCHA] (store, ...args) {
		return new Promise(function(resolve, reject) {
			api.register_captcha(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
	},
	[USER.RESETPWD_CAPTCHA] (store, ...args) {
		return new Promise((resolve, reject) => {
			api.reset_password_captcha(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
	},
	[USER.RESETPWD] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.reset_password(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	}
}

const mutations = {
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
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
