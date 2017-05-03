/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-03 11:24:57
*/

'use strict';

import * as user from '../../api/user'
import { USER, CHANNEL } from '../../types'

const state = {
	user: null,
}

const isEmpty = obj => {
	for (const i in obj) {
		return false;
	}
	return true;
}
const getters = {
	user: state => {
		if (state.user && !isEmpty(state.user)) {
			return state.user;
		} else {
			return false;
		}
	}
}

const actions = {
	[USER.GET] ({ commit }, ...args) {
		return user.get_user().then(data => {
			commit(USER.LOGIN, data.data);
		}).catch(() => {
			commit(USER.LOGOUT);
		})
	},
	[USER.LOGOUT] ({ dispatch }, ...args) {
		return new Promise((resolve, reject) => {
			user.logout().then(() => {
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
			user.login(...args).then(res => {
				commit(USER.LOGIN, res.data);
				commit(USER.LOGIN, res.data, { root: true });
				resolve();
			}).catch(err => {
				commit(USER.CLEAR, err, { root: true });
				reject();
			})
		})
	},
	[USER.PASSWORD] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			user.password(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	},
	[USER.UPDATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			user.update_user(...args).then(res => {
				commit(USER.UPDATE, res.data);
				resolve();
			}).catch(err => {
				reject();
			})
		});
	},
	[USER.REGISTER] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			user.register(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	},
	[USER.REGISTER_CAPTCHA] (store, ...args) {
		return new Promise(function(resolve, reject) {
			user.register_captcha(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
	},
	[USER.RESETPWD_CAPTCHA] (store, ...args) {
		return new Promise((resolve, reject) => {
			user.reset_password_captcha(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
	},
	[USER.RESETPWD] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			user.reset_password(...args).then(res => {
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
