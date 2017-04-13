/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-13 09:30:31
*/

'use strict';

import { http } from './'

// -----------------------------
// weixin 微信接口
// -----------------------------

// POST /api/v1/wx-open/auth/url
export const wx_get_auth_url = ({ channelID }) => {
	return http.post(`wx-open/auth/url`, { channelID }, { interceptors: false })
}

