/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-01 15:16:09
*/

'use strict';

import { wx_get_auth_url } from '../../api/weixin'
import { WEXIN_AUTH_URL } from '../../types'

const state = {
	lock: true,
	url: ''
}

const getters = {}

const actions = {
	[WEXIN_AUTH_URL.REQUEST] ({ commit, dispatch }, ...args) {
		commit(WEXIN_AUTH_URL.REQUEST);
		return new Promise((resolve, reject) => {
			wx_get_auth_url(...args).then(res => {
				commit(WEXIN_AUTH_URL.SUCCESS, res);
				resolve();
			}).catch(err => {
				commit(WEXIN_AUTH_URL.FAILURE, err);
				reject(err);
			})
		})
	}
}

const mutations = {
	[WEXIN_AUTH_URL.REQUEST] (state) {
		state.lock = true;
		state.url = '';
	},
	[WEXIN_AUTH_URL.SUCCESS] (state, { data }) {
		state.lock = false;
		state.url = data.url;
	},
	[WEXIN_AUTH_URL.FAILURE] (state, err) {
		state.lock = true;
		state.url = '';
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
