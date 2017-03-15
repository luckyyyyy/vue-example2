/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-16 01:36:22
*/

'use strict';

import { live_query_stream } from '../../api/live'
import { LIVE_QUERY_STREAM } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LIVE_QUERY_STREAM.REQUEST] ({ commit }, ...args) {
		commit(LIVE_QUERY_STREAM.REQUEST);
		return new Promise((resolve, reject) => {
			live_query_stream(...args).then(res => {
				commit(LIVE_QUERY_STREAM.SUCCESS, res.data);
				resolve(res.data);
			}).catch(err => {
				commit(LIVE_QUERY_STREAM.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[LIVE_QUERY_STREAM.REQUEST] (state) {
		state.lock = true
	},
	[LIVE_QUERY_STREAM.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[LIVE_QUERY_STREAM.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
