/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-25 14:59:35
*/

'use strict';

import { API_HOST } from './'
import axios from 'axios'

// -----------------------------
// channel 频道接口
// -----------------------------

// POST /api/v1/channel/create
export const channel_create = ({ name, commodityCatalog, province, city, county, address, companyName }) => {
	return axios.post(`${API_HOST}/channel/create`, { name, commodityCatalog, province, city, county, address, companyName })
}
// GET /api/v1/channel/find
export const channel_find = ({ page, limits }) => {
	return axios.get(`${API_HOST}/channel/find`, { page, limits })
}