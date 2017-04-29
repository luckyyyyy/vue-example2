/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Webster
* @Last Modified time: 2017-04-29 15:52:53
*/

'use strict';

import { login } from '../../api/user'
import { USER } from '../../types'

const state = {}
const getters = {}

const actions = {
	[USER.LOGIN] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			login(...args).then(res => {
				commit(`user/${USER.LOGIN}`, res.data, { root: true });
				commit(USER.LOGIN, res.data, { root: true });
				resolve();
			}).catch(err => {
				commit(USER.CLEAR, err, { root: true });
				reject();
			})
		})
	},
}

const mutations = {}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
