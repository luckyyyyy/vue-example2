/*
* @Author: William Chan
* @Date:   2017-03-19 14:48:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-04 16:40:00
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
	publishStreamInfo: {},
}

const getters = {}

const actions = {
	[LIVE.CREATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_create(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	},
	[LIVE.DELETE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_delete(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	},
	[LIVE.COUNTDOWN] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_count_down(...args).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.GUIDE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_guide(...args).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.SHARE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_share(...args).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.UPDATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_update(...args).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.AUTH] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_auth_watch(...args).then(res => {
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
	[LIVE.FINISH] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_finish(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	},
	[LIVE.NOTICE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_notice(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	},
	[LIVE.PUBLIC] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_public(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
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
	[LIVE.TRASH] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.live_trash(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
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
		state.bitRateInfo       = data.bitRateInfo || {};
		state.publishStreamInfo = data.publishStreamInfo || {};
	}
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
