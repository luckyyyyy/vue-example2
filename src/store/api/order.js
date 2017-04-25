/*
* @Author: chuxiao
* @Date:   2017-04-25 10:51:56
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-25 14:27:05
*/

'use strict';

import { http } from './'

// -----------------------------
// order
// -----------------------------

// POST /api/v1/order/consume/create
export const order_consume_create = ({ consumeReq }) => {
	return http.get('order/consume/create', { consumeReq })
}
//  POST /api/v1/order/flow/create
export const order_flow_create = ({ flowReq }) => {
	return http.get('order/flow/create', { flowReq })
}
//	GET /api/v1/order/find/consume
export const order_find_consume = ({ page, start, limits }) => {
	return http.get('order/find/consume', { page, start, limits })
}
//	GET /api/v1/order/find/flow
export const order_find_flow = ({ page, start, limits }) => {
	return http.get('order/find/flow', { page, start, limits })
}
//	GET /api/v1/order/find/recharge
export const order_find_recharge = ({ page, start, limits }) => {
	return http.get('order/find/recharge', { page, start, limits })
}
