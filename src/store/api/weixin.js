/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-01 22:39:20
*/

'use strict';

import { http } from './'

// -----------------------------
// weixin 微信接口
// -----------------------------

// POST /api/v1/wx_open/auth_url
export const wx_get_auth_url = ({ channelID }) => {
	return http.post(`wx_open/auth_url`, { channelID }, { interceptors: false })
}

