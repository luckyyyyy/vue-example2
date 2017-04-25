/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:21:50
*/

'use strict';

import { password } from '../../api/user'
import { USER } from '../../types'
const state = {}

const getters = {}

const actions = {
	[USER.PASSWORD] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			password(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
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
