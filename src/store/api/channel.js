/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-02 11:26:54
*/

'use strict';

import { http } from './'

// -----------------------------
// channel 频道接口
// -----------------------------

// POST /api/v1/channel/create
export const channel_create = ({ name, commodityCatalog, province, city, county, address, companyName }) => {
	return http.post(`channel/create`, { name, commodityCatalog, province, city, county, address, companyName })
}
// GET /api/v1/channel/find
export const channel_find = ({ page, limits }) => {
	return http.get(`channel/find`, { params: { page, limits } })
}
// DELETE /api/v1/channel/{channel_id}
export const channel_delete = (id) => {
	return http.delete(`channel/${id}`)
}
// GET /api/v1/channel/query/{channel_id}
export const channel_query = (id) => {
	return axios.get(`${API_HOST}/channel/query/${id}`)
}
