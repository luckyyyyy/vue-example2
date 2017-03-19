/*
* @Author: William Chan
* @Date:   2017-03-19 03:49:11
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 15:13:46
*/

'use strict';

import { channel_query } from '../../api/channel'
import { CHANNEL } from '../../types'
import router from '../../../router'

const state = {
	channel: {},
}

const getters = {
	channelID: state => {
		if (state.channel && state.channel.channelId) {
			return state.channel.channelId;
		} else {
			return sessionStorage.getItem('channelID');
		}
	},
}

const actions = {
	[CHANNEL.QUERY] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			channel_query(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject();
			})
		})
	},
	[CHANNEL.CHECK] ({ getters, dispatch }) {
		const id = getters.channelID;
		if (!id){
			console.log('没有选择频道');
		} else {
			dispatch(CHANNEL.SELECT, id);
		}
	},
	[CHANNEL.SELECT] ({ getters, dispatch, commit }, id) {
		if (id) {
			dispatch(CHANNEL.QUERY, id).then(data => {
				if (data.channel.status == 2) {
					return commit(CHANNEL.SELECT, data.channel, { root: true });
				} else {
					return router.push({ name: 'create_channel', params: { id: id } })
				}
			}).catch(() => {
				commit(CHANNEL.SELECT, null, { root: true });
			})
		} else {
			return commit(CHANNEL.SELECT, null, { root: true });
		}

	}
}

const mutations = {

}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
