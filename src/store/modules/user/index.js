/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Webster
* @Last Modified time: 2017-04-29 14:24:41
*/

'use strict';

import { logout, get_user } from '../../api/user'
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
		return get_user().then(data => {
			commit(USER.LOGIN, data.data);
		}).catch(() => {
			commit(USER.LOGOUT);
		})
	},
	[USER.LOGOUT] ({ dispatch }, ...args) {
		return new Promise((resolve, reject) => {
			logout().then(() => {
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
