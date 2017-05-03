/*
* @Author: chuxiao
* @Date:   2017-04-25 14:49:08
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-03 17:36:39
*/

'use strict';

import { order_find } from '@/store/api/order'
import { ORDER } from '@/store/types'

const state = {

}

const getters = {}

const actions = {
  [ORDER.FIND_REQUEST] ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      order_find(params).then(res => {
        console.log(res);
        resolve(res);
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
