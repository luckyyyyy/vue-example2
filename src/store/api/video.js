/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-11 13:56:51
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

// PUT /api/v1/video/update/guide/{id}
export const video_guide = ({ id, guideStatus, guideImageId }) => {
  return http.put(`video/update/guide/${id}`, { guideStatus, guideImageId })
}
// PUT /api/v1/video/update/share/{id}
export const video_share = ({ id, shareStatus, shareImageId, shareTitle, shareContent }) => {
  return http.put(`video/update/share/${id}`, { shareStatus, shareImageId, shareTitle, shareContent })
}
// PUT /api/v1/video/update/{id}
export const video_update = ({ id, name, nickName, avatarImageId }) => {
  return http.put(`video/update/${id}`, { name, nickName, avatarImageId })
}
// PUT /api/v1/video/update/attention_watch/{id}
// export const video_watch = ({ id, attentionWatchStatus }) => {
//  return http.put(`video/update/attention_watch/${id}`, { attentionWatchStatus })
// }
// PUT /api/v1/video/update/auth_watch/{id}
export const video_auth_watch = ({ id, authWatchStatus, chargeHints, price, authCode, authCodeHints }) => {
  return http.put(`video/update/auth_watch/${id}`, { authWatchStatus, chargeHints, price, authCode, authCodeHints })
}










