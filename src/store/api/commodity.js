/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 14:59:01
*/

'use strict';

import { API_HOST } from './'
import axios from 'axios'

// 获取商品目录
// GET /api/v1/commodity/catalogs
export const get_commodity_catalogs = () => {
	return axios.get(`${API_HOST}/commodity/catalogs`)
}