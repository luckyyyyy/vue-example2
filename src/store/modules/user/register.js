/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:57
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-19 03:32:27
*/

'use strict';

import { register_captcha, register } from '../../api/user'
import { REGISTER_CAPTCHA, REGISTER } from '../../types'

const state = {}

const getters = {}

const actions = {
	[REGISTER.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			register(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
			})
		})
	},
	[REGISTER_CAPTCHA.REQUEST] (store, ...args) {
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
