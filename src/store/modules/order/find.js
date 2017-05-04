/*
* @Author: chuxiao
* @Date:   2017-04-25 14:49:08
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-04 16:06:02
*/

'use strict';

import { order_find } from '@/store/api/order'
import { ORDER } from '@/store/types'

const state = {
	start: 0,
	page: 0,
	limits: 5,
	orders: [],
	total: 0,
}

const getters = {}

const actions = {
	[ORDER.FIND_REQUEST] ({ commit, state }, page) {
		commit(ORDER.FIND_REQUEST, page);
		return new Promise((resolve, reject) => {
			order_find(state).then(res => {
				commit(ORDER.FIND_SUCCESS, res);
				resolve();
			}).catch(err => {
				reject();
			})
		})
	}
}

const mutations = {
	[ORDER.FIND_REQUEST] (state, page) {
		state.start  = (page - 1) * state.limits;
		state.page   = page;
	},
	[ORDER.FIND_SUCCESS] (state, { data }) {
		state.orders = data.orders;
		state.total  = data.total;
	},

}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
