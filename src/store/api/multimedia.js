/*
* @Author: Administrator
* @Date:   2017-02-25 14:41:16
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-21 16:19:21
*/

'use strict';

// -----------------------------
// multimedia
// -----------------------------

import { http } from './'
// POST /api/v1/multimedia/find/images
export const multimedia_find = ({ start, limits, type }) => {
	return http.get(`multimedia/find/images/${type}`, { params: { start, limits } })
}
