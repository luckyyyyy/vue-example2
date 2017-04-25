/*
* @Author: chuxiao
* @Date:   2017-04-25 14:20:28
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-25 15:14:12
*/

'use strict';

import { order_consume_create } from '../../api/order'
import { ORDER_CONSUME } from '../../types'

const state = {
}

const getters = {}

const actions = {
	[ORDER_CONSUME.CREATE] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			order_consume_create(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
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
