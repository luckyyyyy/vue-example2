/*
* @Author: William Chan
* @Date:   2017-03-19 03:49:11
* @Last Modified by:   Webster
* @Last Modified time: 2017-04-29 16:37:08
*/

'use strict';

import cookie from 'js-cookie'
import { isDevelop } from '@/utils/util'
import { channel_query, channel_update } from '../../api/channel'
import { CHANNEL } from '../../types'
import router from '../../../router'
const state = {
	channel: null,
}

const getters = {
	channel: state => {
		return state.channel;
		// if (state.channel && state.channel.channelId == cookie.get('channelID')) {
		// 	return state.channel;
		// } else {
		// 	return null;
		// }
	},
}

const actions = {
	[CHANNEL.GET] ({ commit }, id) {
		return channel_query(id).then(res => {
			commit(CHANNEL.SELECT, res.data);
		})
	},
	[CHANNEL.SET] ({ commit, dispatch }, id) {
		if (id) {
			dispatch(CHANNEL.GET, id).then(() => {
				commit(CHANNEL.SELECT, id, { root: true });
			})
		} else {
			commit(CHANNEL.SELECT, null, { root: true });
			commit(CHANNEL.SELECT, null);
		}
	},
	[CHANNEL.SELECT] ({ getters, dispatch, commit }, id) {
		if (id) {
			commit(CHANNEL.SELECT, id);
			// commit(CHANNEL.SELECT, id, { root: true });
		} else {
			commit(CHANNEL.SELECT, null);
			// commit(CHANNEL.SELECT, null, { root: true });
		}
	},
	[CHANNEL.UPDATE] ({ getters, dispatch, commit }, ...args) {
		return new Promise((resolve, reject) => {
			channel_update(...args).then(res => {
				commit(CHANNEL.UPDATE, res.data);
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	},
}

const mutations = {
	[CHANNEL.SELECT] (state, data) {
		if (data) {
			state.channel = data.channel;
			// because cros domain, can not set cookie.
			// so, local set cookie.
			if (isDevelop() && data.channel.status == 2) {
				cookie.set('channelID', data.channel.channelId);
			}
		} else {
			state.channel = null;
			cookie.remove('channelID');
		}
	},
	[CHANNEL.UPDATE] (state, data) {
		if (state.id == data.channel.channelID) {
			state.channel = data.channel;
		}
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
