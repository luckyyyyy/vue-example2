/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:52:27
*/

'use strict';

import { wx_get_auth_url } from '../../api/weixin'
import { WEXIN } from '../../types'

const state = {}

const getters = {}

const actions = {
	[WEXIN.AUTH_URL] ({ commit, dispatch }, ...args) {
		return new Promise((resolve, reject) => {
			wx_get_auth_url(...args).then(res => {
				resolve(res.data.url);
			}).catch(err => {
				reject(err);
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
