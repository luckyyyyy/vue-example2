/*
* @Author: Administrator
* @Date:   2017-03-22 02:16:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:46:03
*/

'use strict';

import { live_count_down, live_guide, live_share, live_update, live_auth_watch } from '../../api/live'
import { LIVE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE.COUNTDOWN] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_count_down(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.GUIDE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_guide(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.SHARE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_share(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.UPDATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_update(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE.AUTH] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_auth_watch(...args).then(res => {
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
