/*
* @Author: Administrator
* @Date:   2017-01-06 02:34:03
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:22:40
*/

'use strict';

import { reset_password_captcha, reset_password } from '../../api/user'
import { USER } from '../../types'

const state = {}

const getters = {}

const actions = {
	[USER.RESETPWD_CAPTCHA] (store, ...args) {
		return new Promise((resolve, reject) => {
			reset_password_captcha(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
	},
	[USER.RESETPWD] ({ commit }, ...args) {
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
