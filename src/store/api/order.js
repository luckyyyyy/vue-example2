/*
* @Author: chuxiao
* @Date:   2017-04-25 10:51:56
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-28 10:23:49
*/

'use strict';

import { http } from './'

// -----------------------------
// order
// -----------------------------

// POST /api/v1/order/consume/create
export const order_consume_create = ({ edition, quantity }) => {
	return http.post('order/consume/create', { edition, quantity})
}
//  POST /api/v1/order/flow/create
export const order_flow_create = (money) => {
	return http.post('order/flow/create', { money })
}
//	GET /api/v1/order/find/consume
export const order_find = ({ page, start, limits }) => {
	return http.get('order/find', { page, start, limits })
}
//	GET /api/v1/order/find/recharge
export const order_find_recharge = ({ page, start, limits }) => {
	return http.get('order/find/recharge', { page, start, limits })
}
//  GET /api/v1/order/query/consume
export const order_query_consume = (sn) => {
	return http.get(`order/query/consume/${sn}`)
}
//  GET /api/v1/order/query/flow
export const order_query_flow = (sn) => {
	return http.get('order/query/flow', { sn })
}
//  GET /api/v1/order/query/recharge
export const order_query_recharge = (sn) => {
	return http.get('order/query/recharge', { sn })
}
