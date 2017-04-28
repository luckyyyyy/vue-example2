/*
* @Author: William Chan
* @Date:   2016-12-03 19:24:59
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-28 14:36:26
*/

'use strict';
import Vue from 'vue'
import Vuex from 'vuex'

// globle and common
// import * as getters   from './getters'
// import * as actions   from './actions'
import * as mutations  from './mutations'

import userModule      from './modules/user'
import channelModule   from './modules/channel'
import liveModule      from './modules/live'
import videoModule     from './modules/video'
import orderModule     from './modules/order'
import payModule			 from './modules/pay'
import { isDev }       from '../utils/util'

Vue.use(Vuex)
const state = {}
export const store = new Vuex.Store({
	strict: isDev(),
	// state,
	// getters,
	// actions,
	mutations
})

// Because the router, so register it.
// See router beforeEach
store.registerModule('user',    userModule);
store.registerModule('channel', channelModule);
store.registerModule('live',    liveModule);
store.registerModule('video',   videoModule);
store.registerModule('order',   orderModule);
store.registerModule('pay', payModule);
const module = {};
export const registerModule = (path, module) => {
	const name = typeof path == 'string' ? path : path.join('/');
	if (!module[name]) {
		store.registerModule(path, module);
		module[name] = true;
	}
}

export const clearAuthorization = error => {
	return store.commit('USER_CLEAR', error, { root: true });
}

export const getAuthorization = () => {
	return store.getters['user/auth'];
}

export const getCurrentChannelID = () => {
	return store.getters['channel/channelID'];
}

