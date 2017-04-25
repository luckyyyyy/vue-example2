/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:29:18
*/

'use strict';

import { channel_create } from '../../api/channel'
import { CHANNEL } from '../../types'

const state = {}

const getters = {}

const actions = {
	[CHANNEL.CREATE] ({ commit, dispatch }, ...args) {
		return new Promise((resolve, reject) => {
			channel_create(...args).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject();
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
