/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-17 16:34:16
*/

'use strict';

import { channel_find } from '../../api/channel'
import { CHANNEL_FIND } from '../../types'

const state = {
	lock: false,
	data: [],
	total: 0
}

const getters = {}

const actions = {
	[CHANNEL_FIND.REQUEST] ({ commit }, ...args) {
		commit(CHANNEL_FIND.REQUEST);
		return new Promise((resolve, reject) => {
			channel_find(...args).then(res => {
				commit(CHANNEL_FIND.SUCCESS, res);
				resolve(res.data);
			}).catch(err => {
				commit(CHANNEL_FIND.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[CHANNEL_FIND.REQUEST] (state) {
		state.lock = true;
		state.data = [];
		state.total = 0;
	},
	[CHANNEL_FIND.SUCCESS] (state, { data }) {
		state.lock = false;
		state.data = data.channels;
		state.total = data.total;
	},
	[CHANNEL_FIND.FAILURE] (state, err) {
		state.lock = false;
		state.data = [];
		state.total = 0;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
