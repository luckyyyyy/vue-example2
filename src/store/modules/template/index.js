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
		topInfo: {},						// 置顶信息
		beingData: {},					// 分页信息-正在直播
		beingTotalPage: 0,
		finishedData: {},				// 分页信息-精彩回放
		finishedTotalPage: 0,
		aboutData: {},					// 分页信息-直播预告
		aboutTotalPage: 0,
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
		[TEMPLATE.SORT_ABOUT] ({ commit }, params) {
			return api.sort_about(params)
		},
		[TEMPLATE.FIND_BEING] ({ commit, state }, page) {
			page = page == undefined ? 1 : page
			return new Promise((resolve, reject) => {
				api.find_being({ page, limits:state.limits }).then(res => {
					commit(TEMPLATE.BEING_SUCCESS, res.data)
					resolve();
				}).catch(err => {
					reject();
				})
			})
		},
		[TEMPLATE.FIND_FINISHED] ({ commit, state }, page) {
			page = page == undefined ? 1 : page
			return new Promise((resolve, reject) => {
				api.find_finished({ page, limits:state.limits }).then(res => {
					commit(TEMPLATE.FINISHED_SUCCESS, res.data)
					resolve()
				}).catch(err => {
					reject(err)
				})
			})
		},
		[TEMPLATE.FIND_ABOUT] ({ commit, state }, page) {
			page = page == undefined ? 1 : page
			return new Promise((resolve, reject) => {
				api.find_about({ page, limits:state.limits }).then(res => {
					commit(TEMPLATE.ABOUT_SUCCESS, res.data)
					resolve()
				}).catch(err => {
					reject(err)
				})
			})
		},
		[TEMPLATE.FIRST_FINISHED] ({ commit,state }, id) {
			return new Promise((resolve, reject) => {
				api.first_finished(id).then(_ => {
					resolve()
				}).catch(_ => {
					reject()
				})
			})
		}
	},
	mutations: {
		[TEMPLATE.QUERY] (state, data) {
			state.topInfo = data
		},
		[TEMPLATE.BEING_SUCCESS] (state, data) {
			state.beingData  = data
			state.beingTotalPage = Math.ceil(data.total / state.limits)
		},
		[TEMPLATE.FINISHED_SUCCESS] (state, data) {
			state.finishedData = data
			state.finishedTotalPage = Math.ceil(data.total / state.limits)
		},
		[TEMPLATE.ABOUT_SUCCESS] (state, data) {
			state.aboutData = data
			state.aboutTotalPage = Math.ceil(data.total / state.limits)
		},
	}
}
