/*
* @Author: Administrator
* @Date:   2017-02-25 14:41:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-07 15:32:44
*/

'use strict';

// -----------------------------
// multimedia
// -----------------------------
import { http } from '@/store/api'

// POST /api/v1/multimedia/find/images
export const multimedia_find = ({ start, limits, type }) => {
	return http.get(`multimedia/find/images/${type}`, { params: { start, limits } })
}
// DELETE /api/v1/multimedia/{id}
export const multimedia_delete = (id) => {
	return http.delete(`multimedia/${id}`)
}
