/*
* @Author: WilliamChan
* @Date:   2017-06-06 05:04:14
* @Last Modified by:   WilliamChan
* @Last Modified time: 2017-06-06 14:40:49
*/

import { http } from '@/store/api'

//	GET /api/v1/order/find/consume
export const account_order_find = ({ page, limits }) => {
	return http.get(`order/find`, { params: { page, limits } })
}
//	POST /api/v1/pay/finish/order/alipay
export const account_order_pay = ({ sn, model, type }) => {
	// 看不懂 一会用url拼接 一会传type
	if (type == 1) {
		const api = `${http.defaults.baseURL}/pay/finish/order/alipay?sn=${sn}&model=${model}`;
		return new Promise((resolve, reject) => {
			resolve(api)
		});
	} else if (type == 3) {
		// 看不懂 到底是 payload还是query？
		return http.post(`pay/finish/order/deposit?sn=${sn}&model=${model}`, { sn, model })
	}
}
//  POST /api/v1/pay/flow/create
export const account_buy_flow = ({ money, type }) => {
	// 看不懂 一会用url拼接 一会传type
	if (type == 1) {
		const api = `${http.defaults.baseURL}/pay/flow/create?money=${money}&type=${type}`;
		return new Promise((resolve, reject) => {
			resolve(api)
		});
	} else {
		// 同样看不懂
		return http.post(`pay/flow/create?money=${money}&type=${type}`)
	}
}
//  POST /api/v1/pay/consume/create
export const account_buy_edition = ({ edition, quantity, type }) => {
	if (type == 1) {
		const api = `${http.defaults.baseURL}/pay/consume/create?edition=${edition}&quantity=${quantity}&type=${type}`;
		return new Promise((resolve, reject) => {
			resolve(api)
		});
	} else {
		return http.post(`pay/consume/create?edition=${edition}&quantity=${quantity}&type=${type}`, { edition, quantity, type })
	}
}

export const account_recharge = ({ money, type }) => {
	if (type == 1) {
		const api = `${http.defaults.baseURL}/pay/recharge/create?money=${money}&type=${type}`;
		return new Promise((resolve, reject) => {
			resolve(api)
		});
	} else {
		//暂时没有其他充值方式
	}
}
