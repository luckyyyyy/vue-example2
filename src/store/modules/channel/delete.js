/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:44:40
*/

'use strict';

import { channel_delete } from '../../api/channel'
import { CHANNEL } from '../../types'

const state = {}

const getters = {}

const actions = {
	[CHANNEL.DELETE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			channel_delete(...args).then(res => {
				resolve();
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
