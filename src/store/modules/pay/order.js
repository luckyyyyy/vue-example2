/*
* @Author: chuxiao
* @Date:   2017-05-09 10:20:11
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-10 16:51:49
*/

'use strict';

import { pay_order_alipay, pay_order_deposit } from '../../api/pay'
import { PAY } from '../../types'

const state = {

}

const getters = {

}

const actions = {
	[PAY.ORDER] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			if (params.type == 1) {
				//  支付宝支付
				pay_order_alipay(params).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				})
			} else if (params.type == 3) {
				//	余额支付
				pay_order_deposit(params).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				})
			}
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
