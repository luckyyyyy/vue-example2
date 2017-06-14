/*
* @Author: William Chan
* @Date:   2017-03-19 14:48:07
* @Last Modified by:   cx
* @Last Modified time: 2017-05-27 10:57:53
*/

'use strict';

import * as api from '@/store/api/video'
import { VIDEO } from '@/store/types'

export default {
	namespaced: true,
	state: {
		video: [],
		lock: false,
		data: [],
		start: 0,
		limits: 25,
		status: 0,
	},
	getters: {},
	actions: {
		[VIDEO.DELETE] ({ commit }, params) {
			return api.video_delete(params);
		},
		[VIDEO.GUIDE] ({ commit }, ...args) {
			return new Promise((resolve, reject) => {
				api.video_guide(...args).then(res => {
					commit(VIDEO.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					reject(err);
				})
			})
		},
		[VIDEO.SHARE] ({ commit }, ...args) {
			return new Promise((resolve, reject) => {
				api.video_share(...args).then(res => {
					commit(VIDEO.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					reject(err);
				})
			})
		},
		[VIDEO.UPDATE] ({ commit }, ...args) {
			return new Promise((resolve, reject) => {
				api.video_update(...args).then(res => {
					commit(VIDEO.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					reject(err);
				})
			})
		},
		[VIDEO.AUTH] ({ commit }, ...args) {
			return new Promise((resolve, reject) => {
				api.video_auth_watch(...args).then(res => {
					commit(VIDEO.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					reject(err);
				})
			})
		},
		[VIDEO.FIND_REQUEST] ({ commit, state, dispatch }, params) {
			if (!state.lock || params.reload || state.status != params.status) {
				commit(VIDEO.FIND_REQUEST, params);
				return new Promise((resolve, reject) => {
					api.video_find(state).then(res => {
						commit(VIDEO.FIND_SUCCESS, res);
						resolve();
					}).catch(err => {
						commit(VIDEO.FIND_FAILURE, err);
						reject();
					})
				})
			}
		},
		[VIDEO.QUERY] ({ commit }, params) {
			return new Promise((resolve, reject) => {
				api.video_query(params).then(res => {
					commit(VIDEO.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					reject(err);
				})
			})
		},
		[VIDEO.TRASH] ({ commit }, params) {
			return api.video_trash(params);
		},
		[VIDEO.MEDIA_DELETE] ({ commit }, params) {
			return new Promise((resolve, reject) => {
				api.video_media_delete(params).then(res => {
					commit(VIDEO.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					rejcet();
				})
			})
		}
	},
	mutations: {
		[VIDEO.QUERY] (state, data) {
			state.video = data.video;
		},
		[VIDEO.FIND_REQUEST] (state, { reload, status }) {
			if (reload || state.status != status) {
				state.data  = [];
				state.start = 0;
			}
			state.status  = status;
			state.lock    = true;
		},
		[VIDEO.FIND_SUCCESS] (state, { data }) {
			state.data    = state.data.concat(data.videos);
			state.start   = state.start + state.limits;
			if (state.data.length !== data.total) {
				state.lock = false;
			}
		},
		[VIDEO.FIND_FAILURE] (state, err) {
			state.lock    = false;
		},
	}
}

