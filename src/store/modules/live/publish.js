/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 22:49:56
*/

'use strict';

import { live_publish } from '../../api/live'
import { LIVE_PUBLISH } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LIVE_PUBLISH.REQUEST] ({ commit }, ...args) {
		commit(LIVE_PUBLISH.REQUEST);
		return new Promise((resolve, reject) => {
			live_publish(...args).then(res => {
				commit(LIVE_PUBLISH.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(LIVE_PUBLISH.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[LIVE_PUBLISH.REQUEST] (state) {
		state.lock = true
	},
	[LIVE_PUBLISH.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[LIVE_PUBLISH.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
