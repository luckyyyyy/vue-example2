/*
* @Author: Administrator
* @Date:   2017-03-22 02:16:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-29 01:07:42
*/

'use strict';

import { live_count_down, live_guide, live_share, live_update, live_auth_watch } from '../../api/live'
import { LIVE_DETAIL, LIVE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[LIVE_DETAIL.COUNTDOWN] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_count_down(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE_DETAIL.GUIDE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_guide(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE_DETAIL.SHARE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_share(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE_DETAIL.UPDATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			live_update(...args).then(res => {
				commit(`live/${LIVE.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[LIVE_DETAIL.AUTH] ({ commit }, ...args) {
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
