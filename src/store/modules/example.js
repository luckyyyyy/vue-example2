/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-01 17:56:15
*/

'use strict';

import { login } from '../../api'
import { LOGIN } from '../../types'

export default {
	state: {
		lock: false
	},
	getters: {},
	actions: {
		[LOGIN.REQUEST] ({ commit }, ...args) {
			commit(LOGIN.REQUEST);
			return new Promise((resolve, reject) => {
				login(...args).then(res => {
					commit(LOGIN.SUCCESS, res.data);
					resolve();
				}).catch(err => {
					commit(LOGIN.FAILURE, err);
					reject();
				})
			})
		}
	},
	mutations: {
		[LOGIN.REQUEST] (state) {
			state.lock = true
		},
		[LOGIN.SUCCESS] (state, { data }) {
			state.lock = false;
		},
		[LOGIN.FAILURE] (state, err) {
			state.lock = false;
		},
	}
}
