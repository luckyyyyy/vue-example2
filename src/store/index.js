/*
* @Author: William Chan
* @Date:   2016-12-03 19:24:59
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-09 05:45:22
*/

'use strict';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import logout from './modules/user/logout'
import channel_query from './modules/channel/query'
import live_query from './modules/live/query'

const modules = {
	logout,
	channel_query,
	live_query,
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
const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	getters,
	actions,
	mutations,
	modules
})

export default store



