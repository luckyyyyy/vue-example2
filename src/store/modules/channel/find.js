/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:30:12
*/

'use strict';

import { channel_find } from '../../api/channel'
import { CHANNEL } from '../../types'

const state = {
	data: [],
	total: 0
}

const getters = {}

const actions = {
	[CHANNEL.FIND_REQUEST] ({ commit }, ...args) {
		commit(CHANNEL.FIND_REQUEST);
		return new Promise((resolve, reject) => {
			channel_find(...args).then(res => {
				commit(CHANNEL.FIND_SUCCESS, res);
				resolve(res.data);
			}).catch(err => {
				commit(CHANNEL.FIND_FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[CHANNEL.FIND_REQUEST] (state) {
		state.data  = [];
		state.total = 0;
	},
	[CHANNEL.FIND_SUCCESS] (state, { data }) {
		state.data  = data.channels;
		state.total = data.total;
	},
	[CHANNEL.FIND_FAILURE] (state, err) {
		state.data  = [];
		state.total = 0;
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
