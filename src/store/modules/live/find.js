/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-05 16:47:28
*/

'use strict';

import { live_find } from '../../api/live'
import { LIVE_FIND } from '../../types'

const state = {
	lock: false,
	request: false,
	data: [],
	start: 0,
	limits: 30,
	status: 0,
}

const getters = {}

const actions = {
	[LIVE_FIND.REQUEST] ({ commit, state, dispatch }, params) {
		if (!state.lock || params.reload || state.status != params.status) {
			commit(LIVE_FIND.REQUEST, params);
			live_find(state).then(res => {
				commit(LIVE_FIND.SUCCESS, res);
			}).catch(err => {
				commit(LIVE_FIND.FAILURE, err);
			})
		}
	},
}

const mutations = {
	[LIVE_FIND.REQUEST] (state, { reload, status }) {
		if (reload || state.status != status) {
			state.data  = [];
			state.start = 0;
		}
		state.status  = status;
		state.lock    = true;
		state.request = true;
	},
	[LIVE_FIND.SUCCESS] (state, { data }) {
		if (data.lives.length >= state.limits) {
			state.lock = false;
		}
		state.data    = state.data.concat(data.lives);
		state.start   = state.start + state.limits;
		state.request = false;
	},
	[LIVE_FIND.FAILURE] (state, err) {
		state.lock    = false;
		state.request = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
