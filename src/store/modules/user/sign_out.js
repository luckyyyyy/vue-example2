/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-01-10 17:54:43
*/

'use strict';

import { sign_out } from '../../api'
import { SIGNIN, SIGNOUT } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[SIGNOUT.REQUEST] ({ commit }, ...args) {
		commit(SIGNOUT.REQUEST);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				commit(SIGNOUT.FAILURE);
				commit(SIGNIN.FAILURE);
				resolve();
			}, 1000);
			// reject(error);
		})
	}
}

const mutations = {
	[SIGNOUT.REQUEST] (state) {
		state.lock = true
	},
	[SIGNOUT.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[SIGNOUT.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
