/*
* @Author: William Chan
* @Date:   2017-03-19 03:49:11
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-24 04:48:15
*/

'use strict';

import { channel_query } from '../../api/channel'
import { CHANNEL } from '../../types'
import router from '../../../router'

const state = {
	channel: null,
	id: ''
}

const getters = {
	channelID: state => {
		if (state.id) {
			return state.id;
		} else {
			return sessionStorage.getItem('channelID');
		}
	},
}

const actions = {
	[CHANNEL.QUERY] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			channel_query(...args).then(res => {
				commit(CHANNEL.SELECT, res.data);
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	},
	[CHANNEL.SELECT] ({ getters, dispatch, commit }, id) {
		if (id) {
			commit(CHANNEL.SELECT, id, { root: true });
		} else {
			commit(CHANNEL.SELECT, null, { root: true });
		}

	}
}

const mutations = {
	[CHANNEL.SELECT] (state, data) {
		if (data) {
			state.channel = data.channel;
			state.id      = data.channel.channelID;
		} else {
			state.channel = null;
			state.id      = null;
			sessionStorage.removeItem('channelID')
		}
	}
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
