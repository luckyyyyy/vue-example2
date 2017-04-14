/*
* @Author: William Chan
* @Date:   2017-03-19 14:48:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-14 20:26:27
*/

'use strict';

// import { live_query } from '../../api/live'
import { LIVE } from '../../types'

const state = {
	live: [],
}

const getters = {}

const actions = {}

const mutations = {
	[LIVE.QUERY] (state, data) {
		state.live = data.live;
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
