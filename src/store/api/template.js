/*
* @Author: cx
* @Date:   2017-06-13 14:05:48
* @Last Modified by:   cx
* @Last Modified time: 2017-06-13 14:05:53
*/

'use strict'

import { http } from '@/store/api'

//	GET /api/v1/channel-live
export const query_live = () => {
	return http.get(`channel-live`)
}

//	PUT /api/v1/channel-live/being/{order}
export const sort_being = (order) => {
	return http.put(`channel-live/being/${order}`)
}
//	PUT /api/v1/channel-live/about-to/{order}
export const sort_about = (order) => {
	return http.put(`channel-live/about-to/${order}`)
}
//	PUT /api/v1/channel-live/finished/{order}
export const sort_finished = (order) => {
	return http.put(`channel-live/finished/${order}`)
}

//	GET /api/v1/channel-live/being
export const find_being = ({ page, limits }) => {
	return http.get(`channel-live/being`, { params: { page, limits } })
}
//	GET /api/v1/channel-live/about-to
export const find_about = ({ page, limits }) => {
	return http.get(`channel-live/about-to`, { params: { page, limits } })
}
//	GET /api/v1/channel-live/finished
export const find_finished = ({ page, limits }) => {
	return http.get(`channel-live/finished`, { params: { page, limits } })
}

//	PUT /api/v1/channel-live/finished/first-place/{live_id}
export const first_finished = (live_id) => {
	return http.put(`channel-live/finished/first-place/${live_id}`)
}
