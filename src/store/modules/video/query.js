/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-14 20:26:06
*/

'use strict';

import { video_query } from '../../api/video'
import { VIDEO } from '../../types'

const state = {}

const getters = {}

const actions = {
	[VIDEO.QUERY] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			video_query(params).then(res => {
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
