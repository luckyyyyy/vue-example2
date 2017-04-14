/*
* @Author: William Chan
* @Date:   2017-03-19 14:48:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-14 20:26:20
*/

'use strict';

// import { video_query } from '../../api/video'
import { VIDEO } from '../../types'

const state = {
	video: [],
}

const getters = {}

const actions = {}

const mutations = {
	[VIDEO.QUERY] (state, data) {
		state.video = data.video;
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
