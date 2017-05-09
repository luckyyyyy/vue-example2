/*
* @Author: chuxiao
* @Date:   2017-05-09 09:53:46
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-09 15:18:56
*/

'use strict';

import { wallet_query } from '@/store/api/wallet'
import { WALLET } from '../../types'

const state = {

}

const getters = {

}

const actions = {
	[WALLET.QUERY] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			wallet_query(params).then(res => {
				console.log(res);
			}).catch(err => {

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
