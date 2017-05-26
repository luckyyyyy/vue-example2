/*
* @Author: William Chan
* @Date:   2017-03-19 14:48:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-26 18:06:42
*/

'use strict';

import * as api from '@/store/api/live'
import { LIVE } from '@/store/types'

const state = {
	live: [],
	lock: false,
	data: [],
	start: 0,
	limits: 25,
	status: 0,
	bitRateInfo: {},
}

const getters = {}

const actions = {
	[LIVE.CREATE] ({ commit }, params) {
		return api.live_create(params);
	},
	[LIVE.DELETE] ({ commit }, params) {
		return api.live_delete(params);
	},
	[LIVE.COUNTDOWN] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			api.live_count_down(params).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.GUIDE] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			api.live_guide(params).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.SHARE] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			api.live_share(params).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.UPDATE] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			api.live_update(params).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.AUTH] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			api.live_auth_watch(params).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.FIND_REQUEST] ({ commit, state, dispatch }, params) {
		if (!state.lock || params.reload || state.status != params.status) {
			commit(LIVE.FIND_REQUEST, params);
			return new Promise((resolve, reject) => {
				api.live_find(state).then(res => {
					commit(LIVE.FIND_SUCCESS, res);
					resolve();
				}).catch(err => {
					commit(LIVE.FIND_FAILURE, err);
					reject();
				})
			})
		}
	},
	[LIVE.FINISH] ({ commit }, params) {
		return api.live_finish(params);
	},
	[LIVE.NOTICE] ({ commit }, params) {
		return api.live_notice(params);
	},
	[LIVE.PUBLIC] ({ commit }, params) {
		return api.live_public(params);
	},
	[LIVE.QUERY] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			api.live_query(params).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.QUERY_STREAM] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_query_stream(...args).then(res => {
				commit(LIVE.QUERY_STREAM, res)
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	},
	[LIVE.TRASH] ({ commit }, params) {
		return api.live_trash(params);
	}
}

const mutations = {
	[LIVE.QUERY] (state, data) {
		state.live = data.live;
	},
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
	[LIVE.QUERY_STREAM] (state, { data }) {
		state.bitRateInfo = data.bitRateInfo || {};
	}
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
