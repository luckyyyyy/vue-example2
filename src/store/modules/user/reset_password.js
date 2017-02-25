/*
* @Author: Administrator
* @Date:   2017-01-06 02:34:03
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 14:54:31
*/

'use strict';

import { reset_password_captcha, reset_password } from '../../api/user'
import { RESETPWD_CAPTCHA, RESETPWD } from '../../types'
import { PHONE_CAPTCHA_EXPIRED } from '../../../options'

const state = {
	lock: false,
	interval: null,
	countdown: null
}

const getters = {}

const actions = {
	[RESETPWD_CAPTCHA.REQUEST] (store, ...args) {
		store.commit(RESETPWD_CAPTCHA.REQUEST);
		reset_password_captcha(...args).then(res => {
			const interval = setInterval(() => {
				const countdown = store.state.countdown - 1;
				if (countdown <= 0) {
					store.commit(RESETPWD_CAPTCHA.FAILURE);
				} else {
					store.commit(RESETPWD_CAPTCHA.COUNTDOWN, countdown);
				}
			}, 1000)
			store.commit(RESETPWD_CAPTCHA.SUCCESS, interval);
		}).catch(err => {
			store.commit(RESETPWD_CAPTCHA.FAILURE, err);
		})
	},
	[RESETPWD.REQUEST] ({ commit }, ...args) {
		commit(RESETPWD.REQUEST);
		return new Promise((resolve, reject) => {
			reset_password(...args).then(res => {
				commit(RESETPWD.SUCCESS, res.data);
				resolve();
			}).catch(err => {
				commit(RESETPWD.FAILURE, err);
				reject();
			})
		})
	}
}

const mutations = {
	[RESETPWD_CAPTCHA.REQUEST] (state) {
		if(state.interval) {
			clearInterval(state.interval);
			state.interval = null;
		}
		state.countdown = PHONE_CAPTCHA_EXPIRED;
	},
	[RESETPWD_CAPTCHA.SUCCESS] (state, interval) {
		state.interval = interval
	},
	[RESETPWD_CAPTCHA.COUNTDOWN] (state, countdown) {
		state.countdown = countdown;
	},
	[RESETPWD_CAPTCHA.FAILURE] (state, err) {
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
