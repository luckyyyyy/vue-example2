/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-17 14:31:25
*/

'use strict';

import { logout } from '../../api/user'
import { LOGIN, LOGOUT } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LOGOUT.REQUEST] ({ commit, dispatch }, ...args) {
		commit(LOGOUT.REQUEST);
		return new Promise((resolve, reject) => {
			logout().then(() => {
				commit(LOGOUT.SUCCESS);
				commit(LOGIN.FAILURE);
				resolve();
			}).catch(() => {
				commit(LOGOUT.FAILURE);
				reject();
			})
		})
	}
}

const mutations = {
	[LOGOUT.REQUEST] (state) {
		state.lock = true;
	},
	[LOGOUT.SUCCESS] (state) {
		state.lock = false;
	},
	[LOGOUT.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
