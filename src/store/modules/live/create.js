/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 15:34:12
*/

'use strict';

import { live_create } from '../../api/live'
import { LIVE_CREATE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE_CREATE.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_create(...args).then(res => {
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
