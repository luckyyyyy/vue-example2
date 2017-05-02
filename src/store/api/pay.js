/*
* @Author: chuxiao
* @Date:   2017-04-28 14:03:53
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-02 14:16:35
*/

'use strict';
import { http, API_HOST } from './'

//  POST /api/v1/pay/consume/create
export const pay_consume_create = ({ edition, quantity, type }) => {
	if(type === 1){
		// 阿里支付
		let baseURL = API_HOST + '/pay/consume/create?';
		let url = baseURL+`edition=${edition}&quantity=${quantity}&type=${type}`;
		return window.open(url);
	}else{
		return http.post(`pay/consume/create?edition=${edition}&quantity=${quantity}&type=${type}`, { edition, quantity, type })
	}
}

//  POST /api/v1/pay/flow/create
export const pay_flow_create = ({ money, type }) => {
	return http.post('pay/flow/create', { money, type })
}
//	POST /api/v1/pay/recharge/create
export const pay_recharge_create = ({ money, type }) => {
	return http.post('pay/recharge/create', { money, type })
}
//	POST /api/v1/pay/finish/order/alipay
export const pay_order_create = ({ sn, model }) => {
	return http.post('finish/order/alipay', { sn, model })
}
//	POST /api/v1/pay/finish/order/deposit
export const pay_order_deposit = ({ sn, model }) => {
	return http.post('finish/order/deposit', { sn, model })
}

