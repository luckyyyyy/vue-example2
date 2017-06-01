/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   cx
* @Last Modified time: 2017-06-01 10:41:24
*/

'use strict';

import { http } from '@/store/api'

// -----------------------------
// channel 频道接口
// -----------------------------

// POST /api/v1/channel/create
export const channel_create = ({ name, commodityCatalog, province, city, county, address, companyName }) => {
	return http.post(`channel`, { name, commodityCatalog, province, city, county, address, companyName })
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
	return http.get(`channel/${id}`)
}
// PUT /api/v1/channel/{channel_id}
export const channel_update = ({ channelId, address, brief, contacts, coverImageId, description, logoImageId, name, phone, qrcodeImageId, title }) => {
	return http.put(`channel/${channelId}`, { address, brief, contacts, coverImageId, description, logoImageId, name, phone, qrcodeImageId, title })
}

// GET /api/v1/channel-live
export const channel_live = () => {
  return http.get(`channel-live`)
}













