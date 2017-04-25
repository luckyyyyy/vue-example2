/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-25 12:38:51
*/

'use strict';

import { video_find } from '../../api/video'
import { VIDEO_FIND } from '../../types'

const state = {
	lock: false,
	data: [],
	start: 0,
	limits: 25,
	status: 0,
}

const getters = {}

const actions = {
	[VIDEO_FIND.REQUEST] ({ commit, state, dispatch }, params) {
		if (!state.lock || params.reload || state.status != params.status) {
			commit(VIDEO_FIND.REQUEST, params);
			return new Promise((resolve, reject) => {
				video_find(state).then(res => {
					commit(VIDEO_FIND.SUCCESS, res);
					resolve();
				}).catch(err => {
					commit(VIDEO_FIND.FAILURE, err);
					reject();
				})
			})
		}
	},
}

const mutations = {
	[VIDEO_FIND.REQUEST] (state, { reload, status }) {
		if (reload || state.status != status) {
			state.data  = [];
			state.start = 0;
		}
		state.status  = status;
		state.lock    = true;
	},
	[VIDEO_FIND.SUCCESS] (state, { data }) {
		state.data    = state.data.concat(data.videos);
		state.start   = state.start + state.limits;
		if (state.data.length !== data.total) {
			state.lock = false;
		}
	},
	[VIDEO_FIND.FAILURE] (state, err) {
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
