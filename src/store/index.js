/*
* @Author: William Chan
* @Date:   2016-12-03 19:24:59
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-17 15:53:17
*/

'use strict';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import sign_in from './modules/user/sign_in'
import sign_up from './modules/user/sign_up'
import sign_out from './modules/user/sign_out'
import resetpwd from './modules/user/resetpwd'
const modules = {
	sign_in, sign_up, resetpwd, sign_out
}

// globle and common
import * as getters   from './getters'
import * as actions   from './actions'
import * as mutations from './mutations'

const state = {
	shop: 0,
	user: {},
	token: null,
}

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	getters,
	actions,
	mutations,
	modules
})
