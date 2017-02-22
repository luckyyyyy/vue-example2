/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-21 19:36:33
*/

'use strict';

import { password } from '../../api'
import { PASSWORD } from '../../types'
import { Message } from 'element-ui';
const state = {
	lock: false
}

const getters = {}

const actions = {
	[PASSWORD.REQUEST] ({ commit }, ...args) {
		commit(PASSWORD.REQUEST);
		password(...args).then(res => {
			commit(PASSWORD.SUCCESS, res.data);
			Message.success({
				message: '用户密码修改成功'
			})
		}).catch(err => {
			commit(PASSWORD.FAILURE, err);
		})
	}
}

const mutations = {
	[PASSWORD.REQUEST] (state) {
		state.lock = true
	},
	[PASSWORD.SUCCESS] (state) {
		state.lock = false;
	},
	[PASSWORD.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
