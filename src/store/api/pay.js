/*
* @Author: chuxiao
* @Date:   2017-04-28 14:03:53
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-09 10:51:33
*/

'use strict';
import { http, API_HOST } from './'

//  POST /api/v1/pay/consume/create
export const pay_consume_create = ({ edition, quantity, type }) => {
	if (type == 1) {
		// 阿里支付
		let baseURL = API_HOST + '/pay/consume/create?';
		let url = baseURL + `edition=${edition}&quantity=${quantity}&type=${type}`;
		return Promise.resolve(url);
	} else {
		return http.post(`pay/consume/create?edition=${edition}&quantity=${quantity}&type=${type}`, { edition, quantity, type })
	}
}

//  POST /api/v1/pay/flow/create
export const pay_flow_create = ({ money, type }) => {
	if (type == 1) {
		let baseURL = API_HOST + '/pay/flow/create?';
		let url = baseURL + `money=${money}&type=${type}`;
		return Promise.resolve(url);
	} else {
		return http.post(`pay/flow/create?money=${money}&type=${type}`)
	}
}
//	POST /api/v1/pay/recharge/create
export const pay_recharge_create = ({ money, type }) => {
	if (type == 1) {
		let baseURL = API_HOST + '/pay/recharge/create?';
		let url = baseURL + `money=${money}&type=${type}`;
		return Promise.resolve(url);
	} else {
		return http.post(`pay/recharge/create?money=${money}&type=${type}`)
	}
}
//	POST /api/v1/pay/finish/order/alipay
export const pay_order_alipay = ({ sn, model }) => {
	let baseURL = API_HOST + '/pay/finish/order/alipay?';
	let url = baseURL + `sn=${sn}&model=${model}`;
	return Promise.resolve(url);
}
//	POST /api/v1/pay/finish/order/deposit
export const pay_order_deposit = ({ sn, model }) => {
	return http.post(`pay/finish/order/deposit?sn=${sn}&model=${model}`, { sn, model })
}

