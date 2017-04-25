/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 11:22:26
*/

'use strict';

import { register_captcha, register } from '../../api/user'
import { USER } from '../../types'

const state = {}

const getters = {}

const actions = {
	[USER.REGISTER] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			register(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	},
	[USER.REGISTER_CAPTCHA] (store, ...args) {
		return new Promise(function(resolve, reject) {
			register_captcha(...args).then(res => {
				resolve();
			}).catch(err => {
				reject(err);
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
