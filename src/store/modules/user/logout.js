/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 14:49:17
*/

'use strict';

import { logout } from '../../api/user'
import { LOGIN, LOGOUT } from '../../types'

import { MessageBox } from 'element-ui'
const state = {
	lock: false
}

const getters = {}

const actions = {
	[LOGOUT.REQUEST] ({ commit, dispatch }, ...args) {
		MessageBox.confirm('确定退出系统?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			commit(LOGOUT.REQUEST);
			logout().then(() => {
				commit(LOGOUT.SUCCESS);
				commit(LOGIN.FAILURE);
			}).catch(() => {
				commit(LOGOUT.FAILURE);
			})
		})
	}
}

const mutations = {
	[LOGOUT.REQUEST] (state) {
		state.lock = true;
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
