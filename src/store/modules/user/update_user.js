/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-10 03:27:34
*/

'use strict';

import { update_user } from '../../api/user'
import { UPDATE_USER } from '../../types'
const state = {
	lock: false
}

const getters = {}

const actions = {
	[UPDATE_USER.REQUEST] ({ commit }, ...args) {
		commit(UPDATE_USER.REQUEST);
		return new Promise((resolve, reject) => {
			update_user(...args).then(res => {
				commit(UPDATE_USER.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(UPDATE_USER.FAILURE, err);
				reject();
			})
		});
	}
}

const mutations = {
	[UPDATE_USER.REQUEST] (state) {
		state.lock = true
	},
	[UPDATE_USER.SUCCESS] (state) {
		state.lock = false;
	},
	[UPDATE_USER.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
