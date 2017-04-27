/*
* @Author: chuxiao
* @Date:   2017-04-26 15:14:46
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-26 16:50:29
*/

'use strict';

import { order_query_consume } from '../../api/order'
import { ORDER_CONSUME } from '../../types'

const state = {
}

const getters = {}

const actions = {
  [ORDER_CONSUME.QUERY] ({ commit }, sn) {
    return new Promise((resolve, reject) => {
      order_query_consume(sn).then(res => {
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
