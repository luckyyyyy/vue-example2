/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-13 09:31:32
*/

'use strict';

import { http } from './'

// -----------------------------
// video
// -----------------------------

// GET /api/v1/video/find
export const video_find = ({ start, limits, status }) => {
	return http.get(`video/find/${status}`, { params: { start, limits } })
}
// GET /api/v1/live/query
export const video_query = ({ id }) => {
  return http.get(`video/query/${id}`)
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
export const video_update = ({ id, name, nickName, avatarImageId }) => {
  return http.put(`video/${id}`, { name, nickName, avatarImageId })
}
// PUT /api/v1/video/auth_watch/{id}
export const video_auth_watch = ({ id, authWatchStatus, chargeHints, price, authCode, authCodeHints }) => {
  return http.put(`video/auth-watch/${id}`, { authWatchStatus, chargeHints, price, authCode, authCodeHints })
}










