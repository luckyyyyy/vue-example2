/*
* @Author: William Chan
* @Date:   2017-03-08 22:41:40
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-09 00:09:24
*/

'use strict';
import { im_init, im_disconnect } from '../../api/im'
import { IM_INIT, IM_DISCONNECT } from '../../types'

const state = {
	init: false,
	data: [],
}

const getters = {}

const actions = {
	[IM_INIT.REQUEST] ({ commit }, init) {
		commit(IM_INIT.REQUEST);
		im_init(init).then(nim => {
			commit(IM_INIT.SUCCESS);
		}).catch(error => {
			commit(IM_INIT.FAILURE);
		})
	},
	[IM_DISCONNECT.REQUEST] ({ commit }) {
		im_disconnect();
		commit(IM_INIT.FAILURE);
	}
}

const mutations = {
	[IM_INIT.REQUEST] (state) {
		state.init = false
	},
	[IM_INIT.SUCCESS] (state, nim) {
		state.init = true;
		// state.nim = nim;
		// console.log(nim)
	},
	[IM_INIT.FAILURE] (state, err) {
		state.init = false;
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
