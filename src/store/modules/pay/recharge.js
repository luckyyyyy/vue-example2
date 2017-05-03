/*
* @Author: chuxiao
* @Date:   2017-04-28 11:50:49
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-03 16:27:06
*/

'use strict';

import { pay_recharge_create } from '../../api/pay'
import { PAY_CREATE } from '../../types'

const state = {

}

const getters = {

}

const actions = {
  [PAY_CREATE.RECHARGE] ({ commit }, params) {
    return new Promise((resolve, reject) => {
      pay_recharge_create(params).then(res => {
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

