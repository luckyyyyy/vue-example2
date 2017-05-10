/*
* @Author: chuxiao
* @Date:   2017-05-09 09:53:46
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-10 09:39:09
*/

'use strict';

import { wallet_query } from '@/store/api/wallet'
import { WALLET } from '../../types'

const state = {
	wallet:{},
}

const getters = {

}

const actions = {
	[WALLET.QUERY] ({ commit }, params) {
		return new Promise((resolve, reject) => {
			wallet_query(params).then(res => {
				commit(WALLET.QUERY,res.data)
			}).catch(err => {

			})

		})
	}
}

const mutations = {
	[WALLET.QUERY] (state, data) {
		state.wallet = data.object;
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
