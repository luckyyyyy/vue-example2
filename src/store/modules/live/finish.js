/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 19:23:20
*/

'use strict';

import { live_finish } from '../../api/live'
import { LIVE_FINISH } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE_FINISH.REQUEST] ({ commit }, ...args) {
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
