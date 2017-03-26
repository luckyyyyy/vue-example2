/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-27 05:26:12
*/

'use strict';

import { multimedia_find, multimedia_delete } from '../../api/multimedia'
import { MULTIMEDIA_FIND, MULTIMEDIA } from '../../types'

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
	[MULTIMEDIA_FIND.REQUEST] ({ commit, state }, params) {
		if (!state.lock || params.reload || state.type != params.type) {
			return new Promise((resolve, reject) => {
				commit(MULTIMEDIA_FIND.REQUEST, params);
				multimedia_find(state).then(res => {
					commit(MULTIMEDIA_FIND.SUCCESS, res);
					resolve(res);
				}).catch(err => {
					commit(MULTIMEDIA_FIND.FAILURE, err);
					reject(err);
				})
			})
		}
	},
	[MULTIMEDIA.DELETE] ({ commit, state }, ...args) {
		return new Promise((resolve, reject) => {
			multimedia_delete(...args).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			})
		})
	},
}

const mutations = {
	[MULTIMEDIA_FIND.REQUEST] (state, { reload, type }) {
		if (reload || state.type != type) {
			state.data  = [];
			state.start = 0;
		}
		state.type = type;
		state.lock = true;
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
	[MULTIMEDIA.INSERT] (state, data) {
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
