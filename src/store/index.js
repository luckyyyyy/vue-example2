/*
* @Author: William Chan
* @Date:   2016-12-03 19:24:59
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-04 21:22:37
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

import catalogs from './modules/commodity/catalogs'

import channel_create from './modules/channel/create'
import channel_find from './modules/channel/find'
import channel_delete from './modules/channel/delete'
import channel_query from './modules/channel/query'

import multimedia_find from './modules/multimedia/find'

import weixin_auth_url from './modules/weixin/auth_url'

const modules = {
	login, register, reset_password, logout, update_user, password,
	catalogs,
	channel_create, channel_find, channel_delete, channel_query,
	multimedia_find,
	weixin_auth_url
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
