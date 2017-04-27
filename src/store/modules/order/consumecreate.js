/*
* @Author: chuxiao
* @Date:   2017-04-25 14:20:28
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-26 17:34:34
*/

'use strict';
import { order_consume_create } from '../../api/order'
import { ORDER_CONSUME } from '../../types'

const state = {
}

const getters = {}

const actions = {
	[ORDER_CONSUME.CREATE] ({ commit }, consumeReq) {
		return new Promise((resolve, reject) => {
			order_consume_create(consumeReq).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
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
