/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-28 00:26:48
*/

'use strict';

import { password } from '../../api/user'
import { PASSWORD } from '../../types'
const state = {
	lock: false
}

const getters = {}

const actions = {
	[PASSWORD.REQUEST] ({ commit }, ...args) {
		commit(PASSWORD.REQUEST);
		return new Promise((resolve, reject) => {
			password(...args).then(res => {
				commit(PASSWORD.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(PASSWORD.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[PASSWORD.REQUEST] (state) {
		state.lock = true
	},
	[PASSWORD.SUCCESS] (state) {
		state.lock = false;
	},
	[PASSWORD.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
