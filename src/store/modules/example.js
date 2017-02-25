/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 15:00:54
*/

'use strict';

import { login } from '../../api'
import { LOGIN } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LOGIN.REQUEST] ({ commit }, ...args) {
		commit(LOGIN.REQUEST);
		login(...args).then(res => {
			commit(LOGIN.SUCCESS, res.data);
		}).catch(err => {
			commit(LOGIN.FAILURE, err);
		})
	}
}

const mutations = {
	[LOGIN.REQUEST] (state) {
		state.lock = true
	},
	[LOGIN.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[LOGIN.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
