/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-04-08 23:57:57
*/

'use strict';

import { live_finish } from '../../api/live'
import { LIVE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE.FINISH] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_finish(...args).then(res => {
				resolve(res.data);
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
