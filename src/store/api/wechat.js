/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-02 23:51:24
*/

'use strict';

import { http } from '@/store/api'

// -----------------------------
// weixin 微信接口
// -----------------------------

// POST /api/v1/wx-open/auth/url
export const wx_get_auth_url = ({ channelID }) => {
	return http.post(`wx-open/auth/url`, { channelID }, { interceptors: false })
}

