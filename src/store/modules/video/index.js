/*
* @Author: William Chan
* @Date:   2017-03-19 14:48:07
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-02 18:27:36
*/

'use strict';

// import { video_query } from '../../api/video'
import { VIDEO } from '../../types'

const state = {
	live: [],
}

const getters = {}

const actions = {
	// [VIDEO.QUERY] ({ commit }, params) {
	// 	return new Promise((resolve, reject) => {
	// 		video_query(params).then(res => {
	// 			commit(LIVE.QUERY, res.data);
	// 			resolve(res.data);
	// 		}).catch(err => {
	// 			reject(err);
	// 		})
	// 	})
	// },
}

const mutations = {
	// [LIVE.QUERY] (state, data) {
	// 	state.video = data.video;
	// },
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
