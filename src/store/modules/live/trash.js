/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 01:44:06
*/

'use strict';

import { live_delete } from '../../api/live'
import { LIVE_DELETE } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LIVE_DELETE.REQUEST] ({ commit }, ...args) {
		commit(LIVE_DELETE.REQUEST);
		return new Promise((resolve, reject) => {
			live_delete(...args).then(res => {
				commit(LIVE_DELETE.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(LIVE_DELETE.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[LIVE_DELETE.REQUEST] (state) {
		state.lock = true
	},
	[LIVE_DELETE.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[LIVE_DELETE.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
