/*
* @Author: William Chan
* @Date:   2017-03-19 03:49:11
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-26 18:08:20
*/

'use strict';

import cookie from 'js-cookie'
import { isDevelop } from '@/utils/util'
import * as api from '@/store/api/channel'
import { CHANNEL } from '@/store/types'

export default {
	namespaced: true,
	state: {
		channel: null,
		data: [],
		total: 0,
		live: {},
	},
	getters: {
		channel: state => state.channel,
	},
	actions: {
		[CHANNEL.GET] ({ commit }, id) {
			return api.channel_query(id).then(res => {
				commit(CHANNEL.SELECT, res.data);
			}).catch(() => {
				commit(CHANNEL.SELECT, null);
			})
		},
		[CHANNEL.QUERY] ({ commit }, id) {
			return api.channel_query(id);
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
		[CHANNEL.UPDATE] ({ getters, dispatch, commit }, params) {
			return new Promise((resolve, reject) => {
				api.channel_update(params).then(res => {
					commit(CHANNEL.UPDATE, res.data);
					resolve(res.data);
				}).catch(err => {
					reject();
				})
			})
		},
		[CHANNEL.FIND_REQUEST] ({ commit }, params) {
			commit(CHANNEL.FIND_REQUEST);
			return new Promise((resolve, reject) => {
				api.channel_find(params).then(res => {
					commit(CHANNEL.FIND_SUCCESS, res);
					resolve(res.data);
				}).catch(err => {
					commit(CHANNEL.FIND_FAILURE, err);
					reject();
				})
			})
		},
		[CHANNEL.DELETE] ({ commit }, params) {
			return api.channel_delete(params);
		},
		[CHANNEL.CREATE] ({ commit, dispatch }, params) {
			return api.channel_create(params);
		},
		[CHANNEL.LIVE] ({ commit }) {
			return new Promise((resolve, reject) => {
				api.channel_live().then(res => {
					commit(CHANNEL.LIVE, res.data);
					resolve();
				}).catch(err => {
					reject();
				})
			})
		}
	},
	mutations: {
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
		[CHANNEL.LIVE] (state, data) {
			state.live  = data;
		}
	}
}

