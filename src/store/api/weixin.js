/*
* @Author: Administrator
* @Date:   2017-02-25 14:58:36
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-01 15:15:25
*/

'use strict';

import { API_HOST } from './'
import axios from 'axios'

// -----------------------------
// weixin 微信接口
// -----------------------------

// POST /api/v1/wx_open/auth_url
export const wx_get_auth_url = ({ channelID }) => {
	return axios.post(`${API_HOST}/wx_open/auth_url`, { channelID }, { interceptors: false })
}

