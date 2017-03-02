/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-02 20:45:55
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
		logout().then(() => {
			commit(LOGOUT.SUCCESS);
			commit(LOGIN.FAILURE);
		}).catch(() => {
			commit(LOGOUT.FAILURE);
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
