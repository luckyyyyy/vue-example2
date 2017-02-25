/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 14:49:32
*/

'use strict';

import { update_user } from '../../api/user'
import { UPDATE_USER } from '../../types'
import { Message } from 'element-ui';
const state = {
	lock: false
}

const getters = {}

const actions = {
	[UPDATE_USER.REQUEST] ({ commit }, ...args) {
		commit(UPDATE_USER.REQUEST);
		update_user(...args).then(res => {
			commit(UPDATE_USER.SUCCESS, res.data);
			Message.success({
				message: '修改成功'
			})
		}).catch(err => {
			commit(UPDATE_USER.FAILURE, err);
		})
	}
}

const mutations = {
	[UPDATE_USER.REQUEST] (state) {
		state.lock = true
	},
	[UPDATE_USER.SUCCESS] (state) {
		state.lock = false;
	},
	[UPDATE_USER.FAILURE] (state, err) {
		state.lock = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
