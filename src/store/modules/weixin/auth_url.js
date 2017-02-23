/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-23 17:34:48
*/

'use strict';

import { wx_get_auth_url } from '../../api'
import { WEXIN_AUTH_URL } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[WEXIN_AUTH_URL.REQUEST] ({ commit, dispatch }, ...args) {
		commit(WEXIN_AUTH_URL.REQUEST);
		wx_get_auth_url(...args).then(res => {
			commit(WEXIN_AUTH_URL.SUCCESS, res.data);
			console.log(res)
			// dispatch('SELECT_CHANNEL', { id: res.data.channel.channelId, to: true });
		}).catch(err => {
			commit(WEXIN_AUTH_URL.FAILURE, err);
		})
	}
}

const mutations = {
	[WEXIN_AUTH_URL.REQUEST] (state) {
		state.lock = true
	},
	[WEXIN_AUTH_URL.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[WEXIN_AUTH_URL.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
