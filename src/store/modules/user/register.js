/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:57
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-24 16:36:55
*/

'use strict';

import { register_captcha, register } from '../../api'
import { REGISTER_CAPTCHA, REGISTER } from '../../types'
import { PHONE_CAPTCHA_EXPIRED } from '../../../options'

const state = {
	lock: false,
	interval: null,
	countdown: null,
}

const getters = {}

const actions = {
	[REGISTER.REQUEST] ({ commit }, ...args) {
		const promise = new Promise(function(resolve, reject) {
			commit(REGISTER.REQUEST);
			register(...args).then(res => {
				commit(REGISTER.SUCCESS, res);
				resolve();
			}).catch(err => {
				commit(REGISTER.FAILURE, err);
				reject();
			})
		})
		return promise;
	},
	[REGISTER_CAPTCHA.REQUEST] (store, ...args) {
		const promise = new Promise(function(resolve, reject) {
			store.commit(REGISTER_CAPTCHA.REQUEST);
			register_captcha(...args).then(res => {
				const interval = setInterval(() => {
					const countdown = store.state.countdown - 1;
					if (countdown <= 0) {
						store.commit(REGISTER_CAPTCHA.FAILURE);
					} else {
						store.commit(REGISTER_CAPTCHA.COUNTDOWN, countdown);
					}
				}, 1000)
				store.commit(REGISTER_CAPTCHA.SUCCESS, interval);
				resolve();
			}).catch(err => {
				store.commit(REGISTER_CAPTCHA.FAILURE, err);
				reject(err);
			})
		})
		return promise
	}
}

const mutations = {
	[REGISTER.REQUEST] (state) {
		state.lock = true
	},
	[REGISTER.SUCCESS] (state, { data }) {
		state.lock = false;
	},
	[REGISTER.FAILURE] (state, err) {
		state.lock = false;
	},
	// 注册短信
	[REGISTER_CAPTCHA.REQUEST] (state) {
		if(state.interval) {
			clearInterval(state.interval);
			state.interval = null;
		}
		state.countdown = PHONE_CAPTCHA_EXPIRED;
	},
	[REGISTER_CAPTCHA.SUCCESS] (state, interval) {
		state.interval = interval
	},
	[REGISTER_CAPTCHA.COUNTDOWN] (state, countdown) {
		state.countdown = countdown;
	},
	[REGISTER_CAPTCHA.FAILURE] (state, err) {
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
