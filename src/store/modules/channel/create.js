/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 13:59:18
*/

'use strict';

import { channel_create } from '../../api/channel'
import { CHANNEL_CREATE } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[CHANNEL_CREATE.REQUEST] ({ commit, dispatch }, ...args) {
		commit(CHANNEL_CREATE.REQUEST);
		return new Promise((resolve, reject) => {
			channel_create(...args).then(res => {
				commit(CHANNEL_CREATE.SUCCESS, res.data);
				resolve(res.data);
			}).catch(err => {
				commit(CHANNEL_CREATE.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[CHANNEL_CREATE.REQUEST] (state) {
		state.lock = true
	},
	[CHANNEL_CREATE.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[CHANNEL_CREATE.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
