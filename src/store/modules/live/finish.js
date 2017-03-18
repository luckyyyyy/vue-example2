/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 22:40:56
*/

'use strict';

import { live_finish } from '../../api/live'
import { LIVE_FINISH } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LIVE_FINISH.REQUEST] ({ commit }, ...args) {
		commit(LIVE_FINISH.REQUEST);
		return new Promise((resolve, reject) => {
			live_finish(...args).then(res => {
				commit(LIVE_FINISH.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(LIVE_FINISH.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[LIVE_FINISH.REQUEST] (state) {
		state.lock = true
	},
	[LIVE_FINISH.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[LIVE_FINISH.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
