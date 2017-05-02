/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-02 23:51:08
*/

'use strict';

import { http } from '@/store/api'

// 获取商品目录
// GET /api/v1/commodity/catalogs
export const get_commodity_catalogs = () => {
	return http.get(`commodity/catalogs`)
}
