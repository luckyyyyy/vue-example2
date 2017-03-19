/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 04:57:02
*/

'use strict';

import { login } from '../../api/user'
import { LOGIN, USER } from '../../types'

const state = {}
const getters = {}

const actions = {
	[LOGIN.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			login(...args).then(res => {
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
