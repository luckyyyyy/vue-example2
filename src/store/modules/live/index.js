/*
* @Author: William Chan
* @Date:   2017-03-19 14:48:07
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 17:48:28
*/

'use strict';

import { live_query } from '../../api/live'
import { LIVE } from '../../types'

const state = {
	live: [],
}

const getters = {}

const actions = {
	[LIVE.QUERY] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			live_query(params).then(res => {
				commit(LIVE.QUERY, res.data);
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
}

const mutations = {
	[LIVE.QUERY] (state, data) {
		state.live = data.live;
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
