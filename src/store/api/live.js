/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-06 17:27:07
*/

'use strict';

import { http } from './'

// -----------------------------
// live
// -----------------------------

// POST /api/v1/live/create
export const live_create = ({ name }) => {
	return http.post(`live/create`, { name })
}
// GET /api/v1/live/find
export const live_find = ({ start, limits, status }) => {
	return http.get(`live/find`, { params: { start, limits, status } })
}
// GET /api/v1/live/query
export const live_query = ({ id }) => {
	return http.get(`live/query`, { params: { id } })
}
