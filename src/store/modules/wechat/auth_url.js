/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-26 18:09:41
*/

'use strict';

import { wx_get_auth_url } from '@/store/api/wechat'
import { WEXIN } from '@/store/types'

const state = {}

const getters = {}

const actions = {
	[WEXIN.AUTH_URL] ({ commit, dispatch }, params) {
		return wx_get_auth_url(params);
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
