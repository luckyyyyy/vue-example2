/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-17 22:31:00
*/

'use strict';

import { logout } from '../../api'
import { LOGIN, LOGOUT } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LOGOUT.REQUEST] ({ commit }, ...args) {
		commit(LOGOUT.REQUEST);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				commit(LOGOUT.SUCCESS);
				commit(LOGIN.FAILURE);
				resolve();
			}, 1000);
			// reject(error);
		})
	}
}

const mutations = {
	[LOGOUT.REQUEST] (state) {
		state.lock = true
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
