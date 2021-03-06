/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   cx
* @Last Modified time: 2017-05-26 14:32:53
*/

'use strict';

import { http } from '@/store/api'

// -----------------------------
// video
// -----------------------------

// GET /api/v1/video/find
export const video_find = ({ start, limits, status }) => {
	return http.get(`video/find/${status}`, { params: { start, limits } })
}
// GET /api/v1/video/query
export const video_query = ({ id }) => {
  return http.get(`video/${id}`)
}
// PUT /api/v1/video/trash
export const video_trash = ({ id }) => {
  return http.put(`video/trash/${id}`)
}
// DELETE /api/v1/video
export const video_delete = ({ id }) => {
  return http.delete(`video/${id}`)
}
// PUT /api/v1/video/guide/{id}
export const video_guide = ({ id, guideStatus, guideImageId }) => {
  return http.put(`video/guide/${id}`, { guideStatus, guideImageId })
}
// PUT /api/v1/video/share/{id}
export const video_share = ({ id, shareStatus, shareImageId, shareTitle, shareContent }) => {
  return http.put(`video/share/${id}`, { shareStatus, shareImageId, shareTitle, shareContent })
}
// PUT /api/v1/video/{id}
export const video_update = ({ id, name, nickName, avatarImageId, coverImageId }) => {
  return http.put(`video/${id}`, { name, nickName, avatarImageId, coverImageId })
}
// PUT /api/v1/video/auth_watch/{id}
export const video_auth_watch = ({ id, authWatchStatus, chargeHints, price, authCode, authCodeHints }) => {
  return http.put(`video/auth-watch/${id}`, { authWatchStatus, chargeHints, price, authCode, authCodeHints })
}
// DELETE /api/v1/video/media/{id}
export const video_media_delete = ({ id }) => {
	return http.delete(`video/media/${id}`)
}
