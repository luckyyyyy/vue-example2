/*
* @Author: chuxiao
* @Date:   2017-04-28 11:50:41
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-28 15:46:46
*/

'use strict';

import { pay_flow_create } from '../../api/pay'
import { PAY_CREATE } from '../../types'

const state = {

}

const getters = {

}

const actions = {
	[PAY_CREATE.FLOW] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			pay_flow_create(params).then(res => {
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
