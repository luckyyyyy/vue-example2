/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:57
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-18 16:41:31
*/

'use strict';

import { register_captcha, register } from '../../api'
import { REGISTER_CAPTCHA, REGISTER } from '../../types'
import { MessageBox } from 'element-ui';
import router from '../../../router'
import { PHONE_CAPTCHA_EXPIRED } from '../../../options'

const state = {
	lock: false,
	interval: null,
	countdown: null,
}

const getters = {}

const actions = {
	[REGISTER.REQUEST] ({ commit }, ...args) {
		commit(REGISTER.REQUEST);
		register(...args).then(res => {
			commit(REGISTER.SUCCESS, res);
			router.push({ name: 'register_seccuss' })
		}).catch(err => {
			commit(REGISTER.FAILURE, err);
		})
	},
	[REGISTER_CAPTCHA.REQUEST] (store, ...args) {
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
		}).catch(err => {
			if (err.data) {
				if (err.data.retCode == -197) {
					MessageBox.confirm('该用户已注册，是否立即登录？', '提示', {
						confirmButtonText: '登录',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						router.push({ name: 'login' })
					}).catch(() => {
						console.log('cancel')
					})
				} else {
					MessageBox.alert(err.data.retMsg, '错误', {
						type: 'error'
					})
				}
			}
			store.commit(REGISTER_CAPTCHA.FAILURE, err);
		})
	},
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
