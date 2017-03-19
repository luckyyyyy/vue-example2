/*
* @Author: Administrator
* @Date:   2017-01-06 02:34:03
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 03:40:22
*/

'use strict';

import { reset_password_captcha, reset_password } from '../../api/user'
import { RESETPWD_CAPTCHA, RESETPWD } from '../../types'

const state = {}

const getters = {}

const actions = {
	[RESETPWD_CAPTCHA.REQUEST] (store, ...args) {
		return new Promise((resolve, reject) => {
			reset_password_captcha(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
	},
	[RESETPWD.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			reset_password(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	}
}

const mutations = {}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
