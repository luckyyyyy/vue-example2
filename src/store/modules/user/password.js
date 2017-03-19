/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 14:05:47
*/

'use strict';

import { password } from '../../api/user'
import { PASSWORD } from '../../types'
const state = {}

const getters = {}

const actions = {
	[PASSWORD.REQUEST] ({ commit }, ...args) {
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
