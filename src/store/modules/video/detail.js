/*
* @Author: Administrator
* @Date:   2017-03-22 02:16:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 12:02:52
*/

'use strict';

import { video_guide, video_share, video_update, video_auth_watch } from '../../api/video'
import { VIDEO } from '../../types'

const state = {}

const getters = {}

const actions = {
	[VIDEO.GUIDE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			video_guide(...args).then(res => {
				commit(`video/${VIDEO.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[VIDEO.SHARE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			video_share(...args).then(res => {
				commit(`video/${VIDEO.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[VIDEO.UPDATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			video_update(...args).then(res => {
				commit(`video/${VIDEO.QUERY}`, res.data, { root: true });
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	[VIDEO.AUTH] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			video_auth_watch(...args).then(res => {
				commit(`video/${VIDEO.QUERY}`, res.data, { root: true });
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
