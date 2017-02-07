/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 03:36:21
*/

'use strict';

import { sign_in } from '../../api'
import { SIGNIN } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[SIGNIN.REQUEST] ({ commit }, ...args) {
		commit(SIGNIN.REQUEST);
		return sign_in(...args);
	}
}

const mutations = {
	[SIGNIN.REQUEST] (state) {
		state.lock = true
	},
	[SIGNIN.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[SIGNIN.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}