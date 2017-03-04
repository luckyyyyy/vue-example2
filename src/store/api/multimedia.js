/*
* @Author: Administrator
* @Date:   2017-02-25 14:41:16
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-05 01:00:48
*/

'use strict';

// -----------------------------
// multimedia
// -----------------------------

import { http } from './'
// POST /api/v1/multimedia/find/images
export const multimedia_find = ({ start, limits }) => {
	return http.get(`multimedia/find/images`, { params: { start, limits } })
}
