/*
* @Author: William Chan
* @Date:   2016-12-03 19:24:59
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-10 14:15:46
*/

'use strict';
import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'

import { isDevelop }    from '@/utils/util'
// globle and common
// import * as getters   from './getters'
// import * as actions   from './actions'
import * as mutations  from '@/store/mutations'

import userModule       from '@/store/modules/user'
import channelModule    from '@/store/modules/channel'
import liveModule       from '@/store/modules/live'
import imModule         from '@/store/modules/im'
import videoModule      from '@/store/modules/video'
import orderModule      from '@/store/modules/order'
import payModule        from '@/store/modules/pay'
import weChatModule     from '@/store/modules/wechat/auth_url'
import commodityModule  from '@/store/modules/commodity/catalogs'
import multimediaModule from '@/store/modules/multimedia'
import walletModule     from '@/store/modules/wallet'


Vue.use(Vuex)
const state = {}
export const store = new Vuex.Store({
	strict: isDevelop(),
	// state,
	// getters,
	// actions,
	mutations
})

store.registerModule('user',        userModule);
store.registerModule('channel',     channelModule);
store.registerModule('live',        liveModule);
store.registerModule('im',          imModule);
store.registerModule('video',       videoModule);
store.registerModule('order',       orderModule);
store.registerModule('pay',         payModule);
store.registerModule('wechat',      weChatModule);
store.registerModule('catalogs',    commodityModule);
store.registerModule('multimedia',  multimediaModule);
store.registerModule('wallet',      walletModule);

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

