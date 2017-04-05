/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 16:11:42
*/

'use strict';

import { live_delete } from '../../api/live'
import { LIVE_DELETE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE_DELETE.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_delete(...args).then(res => {
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