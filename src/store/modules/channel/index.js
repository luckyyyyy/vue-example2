/*
* @Author: William Chan
* @Date:   2017-03-19 03:49:11
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-03 11:41:51
*/

'use strict';

import cookie from 'js-cookie'
import { isDevelop } from '@/utils/util'
import * as api from '@/store/api/channel'
import { CHANNEL } from '@/store/types'

const state = {
	channel: null,
	data: [],
	total: 0
}

const getters = {
	channel: state => {
		return state.channel;
	},
}

const actions = {
	[CHANNEL.GET] ({ commit }, id) {
		return api.channel_query(id).then(res => {
			commit(CHANNEL.SELECT, res.data);
		}).catch(() => {
			commit(CHANNEL.SELECT, null);
		})
	},
	[CHANNEL.SET] ({ commit, dispatch }, id) {
		if (id) {
			dispatch(CHANNEL.GET, id).then(() => {
				commit(CHANNEL.SELECT, id, { root: true });
			})
		} else {
			commit(CHANNEL.SELECT, null);
			commit(CHANNEL.SELECT, null, { root: true });
		}
	},
	[CHANNEL.UPDATE] ({ getters, dispatch, commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.channel_update(...args).then(res => {
				commit(CHANNEL.UPDATE, res.data);
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	},
	[CHANNEL.FIND_REQUEST] ({ commit }, ...args) {
		commit(CHANNEL.FIND_REQUEST);
		return new Promise((resolve, reject) => {
			api.channel_find(...args).then(res => {
				commit(CHANNEL.FIND_SUCCESS, res);
				resolve(res.data);
			}).catch(err => {
				commit(CHANNEL.FIND_FAILURE, err);
				reject();
			})
		})
	},
	[CHANNEL.DELETE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			api.channel_delete(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
	},
	[CHANNEL.CREATE] ({ commit, dispatch }, ...args) {
		return new Promise((resolve, reject) => {
			api.channel_create(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	}
}

const mutations = {
	[CHANNEL.SELECT] (state, data) {
		if (data) {
			state.channel = data.channel;
			// because cros domain, can not set cookie.
			// so, local set cookie.
			if (isDevelop() && data.channel.status == 2) {
				cookie.set('ChannelID', data.channel.channelId);
			}
		} else {
			state.channel = null;
			cookie.remove('ChannelID');
		}
	},
	[CHANNEL.UPDATE] (state, data) {
		if (state.id == data.channel.channelID) {
			state.channel = data.channel;
		}
	},
	[CHANNEL.FIND_REQUEST] (state) {
		state.data  = [];
		state.total = 0;
	},
	[CHANNEL.FIND_SUCCESS] (state, { data }) {
		state.data  = data.channels;
		state.total = data.total;
	},
	[CHANNEL.FIND_FAILURE] (state, err) {
		state.data  = [];
		state.total = 0;
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
