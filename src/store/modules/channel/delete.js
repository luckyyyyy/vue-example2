/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-01 14:33:15
*/

'use strict';

import { channel_delete } from '../../api/channel'
import { CHANNEL_DELETE } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[CHANNEL_DELETE.REQUEST] ({ commit }, ...args) {
		commit(CHANNEL_DELETE.REQUEST);
		return new Promise((resolve, reject) => {
			channel_delete(...args).then(res => {
				commit(CHANNEL_DELETE.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(CHANNEL_DELETE.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[CHANNEL_DELETE.REQUEST] (state) {
		state.lock = true
	},
	[CHANNEL_DELETE.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[CHANNEL_DELETE.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
