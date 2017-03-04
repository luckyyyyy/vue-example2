/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-04 22:40:42
*/

'use strict';

import { multimedia_find } from '../../api/multimedia'
import { MULTIMEDIA_FIND } from '../../types'

const state = {
	lock: false,
	data: [],
	start: 0,
	limits: 40,
}

const getters = {}

const actions = {
	[MULTIMEDIA_FIND.REQUEST] ({ commit, state }) {
		if (!state.lock) {
			commit(MULTIMEDIA_FIND.REQUEST);
			multimedia_find(state).then(res => {
				commit(MULTIMEDIA_FIND.SUCCESS, res);
			}).catch(err => {
				commit(MULTIMEDIA_FIND.FAILURE, err);
			})
		}
	}
}

const mutations = {
	[MULTIMEDIA_FIND.REQUEST] (state) {
		state.lock = true
	},
	[MULTIMEDIA_FIND.SUCCESS] (state, { data }) {
		if (data.multimedias.length >= state.limits) {
			state.lock = false;
		}
		state.data = state.data.concat(data.multimedias);
		state.start = state.start + state.limits;
	},
	[MULTIMEDIA_FIND.FAILURE] (state, err) {
		state.lock = false;
	},
	[MULTIMEDIA_FIND.INSERT] (state, data) {
		state.data = data.multimedias.concat(state.data);
		state.start = state.start + data.multimedias.length;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
