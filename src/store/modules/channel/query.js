/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 13:56:57
*/

'use strict';

import { channel_query } from '../../api/channel'
import { CHANNEL_QUERY } from '../../types'

const state = {
	lock: false,
	data: {}
}

const getters = {}

const actions = {
	[CHANNEL_QUERY.REQUEST] ({ commit }, ...args) {
		commit(CHANNEL_QUERY.REQUEST);
		return new Promise((resolve, reject) => {
			channel_query(...args).then(res => {
				commit(CHANNEL_QUERY.SUCCESS, res.data);
				resolve(res.data);
			}).catch(err => {
				commit(CHANNEL_QUERY.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[CHANNEL_QUERY.REQUEST] (state) {
		state.lock = true
		state.data = {};
	},
	[CHANNEL_QUERY.SUCCESS] (state, { channel }) {
		state.lock = false;
		state.data = channel
	},
	[CHANNEL_QUERY.FAILURE] (state, err) {
		state.lock = false;
		state.data = {};
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
