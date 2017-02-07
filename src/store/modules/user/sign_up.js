/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 03:37:34
*/

'use strict';

import { sign_up_smscode, sign_up } from '../../api'
import { SIGNUP_SMSCODE, SIGNUP } from '../../types'

const state = {
	lock: false,
	interval: null,
	countdown: null,
}

const getters = {}

const actions = {
	[SIGNUP.REQUEST] ({ commit }, ...args) {
		commit(SIGNUP.REQUEST);
		return sign_up(...args);
	},
	[SIGNUP_SMSCODE.REQUEST] ({ commit }, ...args) {
		commit(SIGNUP_SMSCODE.REQUEST);
		return sign_up_smscode(...args);
	},
}

const mutations = {
	[SIGNUP.REQUEST] (state) {
		state.lock = true
	},
	[SIGNUP.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[SIGNUP.FAILURE] (state, err) {
		state.lock = false;
	},
	// 注册短信
	[SIGNUP_SMSCODE.REQUEST] (state) {
		if(state.interval) {
			clearInterval(state.interval);
			state.interval = null;
		}
		state.countdown = 60;
	},
	[SIGNUP_SMSCODE.SUCCESS] (state, interval) {
		state.interval = interval
	},
	[SIGNUP_SMSCODE.COUNTDOWN] (state, countdown) {
		if (countdown < 0) {
			if(state.interval) {
				clearInterval(state.interval);
				state.interval = null;
			}
			state.countdown = null;
		} else {
			state.countdown = countdown;
		}
	},
	[SIGNUP_SMSCODE.FAILURE] (state, err) {
		if(state.interval) {
			clearInterval(state.interval);
			state.interval = null;
		}
		state.countdown = null;
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}