/*
* @Author: Administrator
* @Date:   2017-03-22 02:16:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-22 03:44:38
*/

'use strict';

import { live_count_down, live_guide, live_share } from '../../api/live'
import { LIVE_DETAIL } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE_DETAIL.COUNTDOWN] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_count_down(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE_DETAIL.GUIDE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_guide(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE_DETAIL.SHARE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_share(...args).then(res => {
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
