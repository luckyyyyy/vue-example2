/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-06 17:36:57
*/

'use strict';

import { live_query } from '../../api/live'
import { LIVE_QUERY } from '../../types'

const state = {
	lock: false,
	data: [],
}

const getters = {}

const actions = {
	[LIVE_QUERY.REQUEST] ({ commit }, params) {
		commit(LIVE_QUERY.REQUEST);
		return new Promise((resolve, reject) => {
			live_query(params).then(res => {
				commit(LIVE_QUERY.SUCCESS, res);
				resolve(res);
			}).catch(err => {
				commit(LIVE_QUERY.FAILURE, err);
				reject();
			})
		})
	},
}

const mutations = {
	[LIVE_QUERY.REQUEST] (state) {
		state.lock = true;
	},
	[LIVE_QUERY.SUCCESS] (state, { data }) {
		state.data = data.live;
	},
	[LIVE_QUERY.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
