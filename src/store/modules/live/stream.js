/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 15:23:27
*/

'use strict';

import { live_query_stream } from '../../api/live'
import { LIVE_QUERY_STREAM } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE_QUERY_STREAM.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_query_stream(...args).then(res => {
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
