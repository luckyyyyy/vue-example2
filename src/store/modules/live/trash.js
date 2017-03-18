/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 15:58:50
*/

'use strict';

import { live_trash } from '../../api/live'
import { LIVE_TRASH } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LIVE_TRASH.REQUEST] ({ commit }, ...args) {
		commit(LIVE_TRASH.REQUEST);
		return new Promise((resolve, reject) => {
			live_trash(...args).then(res => {
				commit(LIVE_TRASH.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(LIVE_TRASH.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[LIVE_TRASH.REQUEST] (state) {
		state.lock = true
	},
	[LIVE_TRASH.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[LIVE_TRASH.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
