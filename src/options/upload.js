/*
* @Author: William Chan
* @Date:   2017-02-18 10:38:13
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-18 11:18:29
*/

'use strict';

import store from '../store'
import { API_HOST } from './'

const headers = {
	'Authorization': store.getters.auth,
	'Content-Type':  'application/json',
}

export const USER_AVATAR = {
	action: `${API_HOST}/user/update/avatar`,
	headers,
	name: 'avatar'
}
