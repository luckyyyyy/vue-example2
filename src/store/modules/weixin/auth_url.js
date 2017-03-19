/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 05:07:29
*/

'use strict';

import { wx_get_auth_url } from '../../api/weixin'
import { WEXIN_AUTH_URL } from '../../types'

const state = {}

const getters = {}

const actions = {
	[WEXIN_AUTH_URL.REQUEST] ({ commit, dispatch }, ...args) {
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
