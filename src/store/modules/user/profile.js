/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 15:05:52
*/

'use strict';

import { update_user } from '../../api/user'
import { UPDATE_USER, USER } from '../../types'
const state = {}

const getters = {}

const actions = {
	[UPDATE_USER.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			update_user(...args).then(res => {
				commit(`user/${USER.UPDATE}`, res.data, { root: true });
				resolve();
			}).catch(err => {
				reject();
			})
		});
	}
}

const mutations = {}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
