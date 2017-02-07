/*
* @Author: Administrator
* @Date:   2017-01-06 02:34:03
* @Last Modified by:   William Chan
* @Last Modified time: 2017-01-06 19:30:26
*/

'use strict';

import { resetpwd_smscode, resetpwd } from '../../api'
import { RESETPWD_SMSCODE, RESETPWD } from '../../types'

const state = {
	lock: false,
	interval: null,
	countdown: null
}

const getters = {}

const actions = {
	[RESETPWD_SMSCODE.REQUEST] ({ commit }, ...args) {
		commit(RESETPWD_SMSCODE.REQUEST);
		return resetpwd_smscode(...args);
	},
	[RESETPWD.REQUEST] ({ commit }, ...args) {
		commit(RESETPWD.REQUEST);
		return resetpwd(...args);
	}
}

const mutations = {
	[RESETPWD_SMSCODE.REQUEST] (state) {
		if(state.interval) {
			clearInterval(state.interval);
			state.interval = null;
		}
		state.countdown = 60;
	},
	[RESETPWD_SMSCODE.SUCCESS] (state, interval) {
		state.interval = interval
	},
	[RESETPWD_SMSCODE.COUNTDOWN] (state, countdown) {
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
	[RESETPWD_SMSCODE.FAILURE] (state, err) {
		if(state.interval) {
			clearInterval(state.interval);
			state.interval = null;
		}
		state.countdown = null;
	},
	[RESETPWD.REQUEST] (state) {
		state.lock = true;
	},
	[RESETPWD.SUCCESS] (state) {
		state.lock = false;
	},
	[RESETPWD.FAILURE] (state) {
		state.lock = false;
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
