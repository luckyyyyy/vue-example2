/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-26 15:43:01
*/

'use strict';

import { live_query } from '../../api/live'
import { LIVE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE.QUERY] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			live_query(params).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
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
