/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-02 18:05:26
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











