/*
* @Author: William Chan
* @Date:   2016-12-03 19:24:59
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-21 19:33:09
*/

'use strict';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './modules/user/login'
import register from './modules/user/register'
import logout from './modules/user/logout'
import reset_password from './modules/user/reset_password'
import update_user from './modules/user/update_user'
import password from './modules/user/password'

const modules = {
	login, register, reset_password, logout, update_user, password
}

// globle and common
import * as getters   from './getters'
import * as actions   from './actions'
import * as mutations from './mutations'

const state = {
	channel: 0,
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
