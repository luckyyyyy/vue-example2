/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 14:59:42
*/

'use strict';

import { channel_create } from '../../api/channel'
import { CHANNEL_CREATE } from '../../types'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[CHANNEL_CREATE.REQUEST] ({ commit, dispatch }, ...args) {
		commit(CHANNEL_CREATE.REQUEST);
		channel_create(...args).then(res => {
			commit(CHANNEL_CREATE.SUCCESS, res.data);
			dispatch('SELECT_CHANNEL', { id: res.data.channel.channelId, to: true });
		}).catch(err => {
			commit(CHANNEL_CREATE.FAILURE, err);
		})
	}
}

const mutations = {
	[CHANNEL_CREATE.REQUEST] (state) {
		state.lock = true
	},
	[CHANNEL_CREATE.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[CHANNEL_CREATE.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
