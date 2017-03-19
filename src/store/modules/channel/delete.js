/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 04:59:26
*/

'use strict';

import { channel_delete } from '../../api/channel'
import { CHANNEL_DELETE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[CHANNEL_DELETE.REQUEST] ({ commit }, ...args) {
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
