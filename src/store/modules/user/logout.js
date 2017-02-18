/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-18 12:38:18
*/

'use strict';

import { logout } from '../../api'
import { LOGIN, LOGOUT } from '../../types'

import { MessageBox } from 'element-ui'

const state = {
	lock: false
}

const getters = {}

const actions = {
	[LOGOUT.REQUEST] ({ commit }, ...args) {
		MessageBox.confirm('确定退出系统?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			commit(LOGOUT.REQUEST);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit(LOGOUT.SUCCESS);
					commit(LOGIN.FAILURE);
					resolve();
				}, 1000);
				// reject(error);
			})
		})
	}
}

const mutations = {
	[LOGOUT.REQUEST] (state) {
		state.lock = true
	},
	[LOGOUT.SUCCESS] (state) {
		state.lock = false;
	},
	[LOGOUT.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
