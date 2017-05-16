/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-16 16:44:58
*/

'use strict';

import { http } from '@/store/api'

// -----------------------------
// live
// -----------------------------

// POST /api/v1/live/create
export const live_create = ({ name }) => {
	return http.post(`live`, { name })
}
// GET /api/v1/live/find
export const live_find = ({ start, limits, status }) => {
	return http.get(`live/find/${status}`, { params: { start, limits } })
}
// GET /api/v1/live/query
export const live_query = ({ id }) => {
	return http.get(`live/${id}`)
}
// GET /api/v1/live/query/stream
export const live_query_stream = ({ id }) => {
	return http.get(`live/stream/${id}`)
}
// PUT /api/v1/live/trash
export const live_trash = ({ id }) => {
	return http.put(`live/trash/${id}`)
}
// DELETE /api/v1/live
export const live_delete = ({ id }) => {
	return http.delete(`live/${id}`)
}
// PUT /api/v1/live/finish
export const live_finish = ({ id }) => {
	return http.put(`live/finish/${id}`)
}
// PUT /api/v1/live/public
export const live_public = ({ id }) => {
	return http.put(`live/public/${id}`)
}
// PUT /api/v1/live/count_down/{id}
export const live_count_down = ({ id, countDownStatus, liveBeginTime, liveHint }) => {
	return http.put(`live/countdown/${id}`, { countDownStatus, liveBeginTime, liveHint })
}
// PUT /api/v1/live/guide/{id}
export const live_guide = ({ id, guideStatus, guideImageId }) => {
	return http.put(`live/guide/${id}`, { guideStatus, guideImageId })
}
// PUT /api/v1/live/share/{id}
export const live_share = ({ id, shareStatus, shareImageId, shareTitle, shareContent }) => {
	return http.put(`live/share/${id}`, { shareStatus, shareImageId, shareTitle, shareContent })
}
// PUT /api/v1/live/{id}
export const live_update = ({ id, name, nickName, avatarImageId }) => {
	return http.put(`live/${id}`, { name, nickName, avatarImageId })
}

// PUT /api/v1/live/auth_watch/{id}
export const live_auth_watch = ({ id, authWatchStatus, chargeHints, price, authCode, authCodeHints }) => {
	return http.put(`live/auth-watch/${id}`, { authWatchStatus, chargeHints, price, authCode, authCodeHints })
}

// POST /api/v1/notice/{live_id}
export const live_notice = ({ id, content }) => {
	return http.post(`live/notice/${id}`, { content })
}













