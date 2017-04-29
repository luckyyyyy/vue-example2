/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Webster
* @Last Modified time: 2017-04-29 19:25:30
*/

'use strict';

import { live_query_stream } from '../../api/live'
import { LIVE } from '../../types'

const state = {
	bitRateInfo: {},
	publishStreamInfo: {}
}

const getters = {}

const actions = {
	[LIVE.QUERY_STREAM] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_query_stream(...args).then(res => {
				commit(LIVE.QUERY_STREAM, res)
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	}
}

const mutations = {
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
