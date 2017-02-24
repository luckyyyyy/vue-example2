/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-24 14:12:56
*/

'use strict';

import { login } from '../../api'
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
		login(...args).then(res => {
			commit(CHANNEL_FIND.SUCCESS, res);
		}).catch(err => {
			commit(CHANNEL_FIND.FAILURE, err);
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
