/*
* @Author: chuxiao
* @Date:   2017-04-28 14:34:59
* @Last Modified by:   WilliamChan
* @Last Modified time: 2017-06-06 14:37:46
*/
import * as api from '@/store/api/account'
import { ACCOUNT } from '@/store/types'

const state = {}
const getters = {}

const actions = {
	[ACCOUNT.ORDER_FIND] ({ commit }, params) {
		return api.account_order_find(params);
	},
	[ACCOUNT.ORDER_PAY] ({ commit }, params) {
		return api.account_order_pay(params);
	},
	[ACCOUNT.BUY_FLOW] ({ commit }, params) {
		return api.account_buy_flow(params);
	},
	[ACCOUNT.BUY_EDITION] ({ commit }, params) {
		return api.account_buy_edition(params);
	},
	[ACCOUNT.RECHARGE] ({ commit }, params) {
		return api.account_recharge(params);
	},
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
