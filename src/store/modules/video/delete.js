/*
* @Author: Administrator
* @Date:   2017-01-06 02:33:52
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-14 15:54:24
*/

'use strict';

import { video_delete } from '../../api/video'
import { VIDEO_DELETE } from '../../types'

const state = {}

const getters = {}

const actions = {
	[VIDEO_DELETE.REQUEST] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			video_delete(...args).then(res => {
				resolve();
			}).catch(err => {
				reject();
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
