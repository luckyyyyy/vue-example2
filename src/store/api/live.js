/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 15:44:30
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
// GET /api/v1/live/query/stream
export const live_query_stream = ({ id }) => {
	return http.get(`live/query/stream`, { params: { id } })
}
// PUT /api/v1/live/trash
export const live_trash = ({ id }) => {
	return http.put(`live/trash`, { id })
}
// DELETE /api/v1/live
export const live_delete = ({ id }) => {
	return http.delete(`live`, { id })
}
// PUT /api/v1/live/finish
export const live_finish = ({ id }) => {
	return http.put(`live/finish`, { id })
}
// PUT /api/v1/live/publish
export const live_publish = ({ id }) => {
	return http.put(`live/publish`, { id })
}





















