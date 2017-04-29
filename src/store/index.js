/*
* @Author: William Chan
* @Date:   2016-12-03 19:24:59
* @Last Modified by:   Webster
* @Last Modified time: 2017-04-29 17:01:50
*/

'use strict';
import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'
// globle and common
// import * as getters   from './getters'
// import * as actions   from './actions'
import * as mutations  from './mutations'

import userModule      from './modules/user'
import channelModule   from './modules/channel'
import liveModule      from './modules/live'
import videoModule     from './modules/video'
import orderModule     from './modules/order'
import payModule       from './modules/pay'
import { isDevelop }       from '../utils/util'

Vue.use(Vuex)
const state = {}
export const store = new Vuex.Store({
	strict: isDevelop(),
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
store.registerModule('pay',     payModule);
const module = {};
export const registerModule = (path, module) => {
	const name = typeof path == 'string' ? path : path.join('/');
	if (!module[name]) {
		store.registerModule(path, module);
		module[name] = true;
	}
}

export const getAuthorization = async () => {
	if (!store.state.user.user) {
		await store.dispatch('user/USER_GET');
	}
	return store.getters['user/user'];
}

export const clearAuthorization = error => {
	store.dispatch('user/USER_CLEAR');
}

export const getCurrentChannel = async () => {
	const id = cookie.get('ChannelID');
	if (id && !store.state.channel.channel) {
		await store.dispatch('channel/CHANNEL_GET', id);
	}
	return store.getters['channel/channel'];
}

