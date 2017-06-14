/*
* @Author: cx
* @Date:   2017-06-13 14:05:48
* @Last Modified by:   cx
* @Last Modified time: 2017-06-13 14:05:53
*/

'use strict'

import * as api from '@/store/api/template'
import { TEMPLATE } from '@/store/types'

export default {
	namespaced: true,
	state: {
		topInfo: {},				// 置顶信息
		beingInfo: {},			// 分页信息-正在直播
		beingStart: 0,
		finishedInfo: {},		// 分页信息-精彩回放
		finishedStart: 0,
		limits: 3,
	},
	getters: {},
	actions: {
		[TEMPLATE.QUERY] ({ commit }) {
			return new Promise((resolve, reject) => {
				api.query_live().then(res => {
					commit(TEMPLATE.QUERY, res.data);
					resolve(res.data);
				}).catch(err => {
					reject(err);
				})
			})
		},
		[TEMPLATE.SORT_BEING] ({ commit }, params) {
			return api.sort_being(params)
		},
		[TEMPLATE.SORT_FINISHED] ({ commit }, params) {
			return api.sort_finished(params)
		},
		[TEMPLATE.FIND_BEING] ({ commit, state }, params) {
			return new Promise((resolve, reject) => {
				api.find_being(state).then(res => {
					commit(TEMPLATE.BEING_SUCCESS, res.data)
				})
			})
		},
		[TEMPLATE.FIND_FINISHED] ({ commit, state }, params) {
			return new Promise((resolve, reject) => {
				api.find_finished(state).then(res => {
					commit(TEMPLATE.FINISHED_SUCCESS, res.data)
				})
			})
		},
	},
	mutations: {
		[TEMPLATE.QUERY] (state, data) {
			state.topInfo = data;
		},
		[TEMPLATE.BEING_SUCCESS] (state, data) {
			state.beingInfo  = data.lives;
			state.beingStart = state.beingStart + state.limits;
		},
		[TEMPLATE.FINISHED_SUCCESS] (state, data) {
			state.finishedInfo  = data.videos;
			state.finishedStart = state.finishedStart + state.limits;
		},
	}
}
