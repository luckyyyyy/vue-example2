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
