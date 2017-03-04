/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-05 01:17:27
*/

'use strict';

import { live_create } from '../../api/live'
import { LIVE_CREATE } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LIVE_CREATE.REQUEST] ({ commit }, ...args) {
		commit(LIVE_CREATE.REQUEST);
		return new Promise((resolve, reject) => {
			live_create(...args).then(res => {
				commit(LIVE_CREATE.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(LIVE_CREATE.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[LIVE_CREATE.REQUEST] (state) {
		state.lock = true
	},
	[LIVE_CREATE.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[LIVE_CREATE.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
