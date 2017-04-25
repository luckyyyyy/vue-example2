/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:22:07
*/

'use strict';

import { update_user } from '../../api/user'
import { USER } from '../../types'
const state = {}

const getters = {}

const actions = {
	[USER.UPDATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			update_user(...args).then(res => {
				commit(`user/${USER.UPDATE}`, res.data, { root: true });
				resolve();
			}).catch(err => {
				reject();
			})
		});
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
