/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 05:09:57
*/

'use strict';

import { channel_create } from '../../api/channel'
import { CHANNEL_CREATE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[CHANNEL_CREATE.REQUEST] ({ commit, dispatch }, ...args) {
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
