/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-21 17:07:42
*/

'use strict';

import { multimedia_find } from '../../api/multimedia'
import { MULTIMEDIA_FIND } from '../../types'

const state = {
	lock: false,
	empty: false,
	data: [],
	start: 0,
	limits: 40,
	type: 1,
}

const getters = {}

const actions = {
	[MULTIMEDIA_FIND.REQUEST] ({ commit, state }, type) {
		if (!state.lock || type) {
			commit(MULTIMEDIA_FIND.REQUEST, type);
			multimedia_find(state).then(res => {
				commit(MULTIMEDIA_FIND.SUCCESS, res);
			}).catch(err => {
				commit(MULTIMEDIA_FIND.FAILURE, err);
			})
		}
	}
}

const mutations = {
	[MULTIMEDIA_FIND.REQUEST] (state, type) {
		state.lock = true;
		state.empty = false;
		if (!type || type != state.type) {
			state.start = 0;
			state.data = [];
		}
		state.type = type || state.type;
	},
	[MULTIMEDIA_FIND.SUCCESS] (state, { data }) {
		if (data.multimedias.length == 0 || data.multimedias.length >= state.limits) {
			state.lock = false;
			state.empty = true;
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
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
