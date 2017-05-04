/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-04 14:36:02
*/

'use strict';

import { live_find } from '../../api/live'
import { LIVE } from '../../types'

const state = {
	lock: false,
	data: [],
	start: 0,
	limits: 25,
	status: 0,
}

const getters = {}

const actions = {
	[LIVE.FIND_REQUEST] ({ commit, state, dispatch }, params) {
		if (!state.lock || params.reload || state.status != params.status) {
			commit(LIVE.FIND_REQUEST, params);
			return new Promise((resolve, reject) => {
					live_find(state).then(res => {
					commit(LIVE.FIND_SUCCESS, res);
					resolve();
				}).catch(err => {
					commit(LIVE.FIND_FAILURE, err);
					reject();
				})
			})
		}
	},
}

const mutations = {
	[LIVE.FIND_REQUEST] (state, { reload, status }) {
		if (reload || state.status != status) {
			state.data  = [];
			state.start = 0;
		}
		state.status  = status;
		state.lock    = true;
	},
	[LIVE.FIND_SUCCESS] (state, { data }) {
		state.data    = state.data.concat(data.lives);
		state.start   = state.start + state.limits;
		if (state.data.length !== data.total) {
			state.lock = false;
		}
	},
	[LIVE.FIND_FAILURE] (state, err) {
		state.lock    = false;
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
