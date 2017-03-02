/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-01 22:38:37
*/

'use strict';

import { http } from './'

// 获取商品目录
// GET /api/v1/commodity/catalogs
export const get_commodity_catalogs = () => {
	return http.get(`commodity/catalogs`)
}