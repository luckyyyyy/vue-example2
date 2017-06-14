/*
* @Author: cx
* @Date:   2017-06-13 14:05:48
* @Last Modified by:   cx
* @Last Modified time: 2017-06-13 14:05:53
*/

'use strict'

import * as api from '@/store/api/template'
import { TEMPLATE } from '@/store/types'

export default {
	namespaced: true,
	state: {
		topInfo: {} // 置顶信息
	},
	getters: {},
	actions: {
		[TEMPLATE.QUERY] ({ commit }) {
			return new Promise((resolve, reject) => {
				api.query_live().then(res => {
					commit(TEMPLATE.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					reject(err);
				})
			})
		}
	},
	mutations: {
		[TEMPLATE.QUERY] (state, data) {
			state.topInfo = data;
		}
	}
}
