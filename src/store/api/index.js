/*
* @Author: William Chan
* @Date:   2016-12-02 11:31:24
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-24 14:09:56
*/

// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])


'use strict';

import store from '../'
import { MessageBox } from 'element-ui'
import axios from 'axios'

import { API_HOST } from '../../options'

window.onerror = (msg, url, lineNo, columnNo, error) => {
	// const string = msg.toLowerCase();
	// const substring = "script error";
	// let message;
	// if (string.indexOf(substring) > -1){
	// 	message = 'Script Error: See Browser Console for Detail';
	// } else {
		// message = [
		// 	'Message: ' + msg,
		// 	'URL: ' + url,
		// 	'Line: ' + lineNo,
		// 	'Column: ' + columnNo,
		// 	'Error object: ' + JSON.stringify(error)
		// ].join(' \n ');
	// }
	MessageBox.alert(msg, 'JavaScript catch', {
		type: 'error'
	})
	return false;
};

export const onRequest = req => {
	if (req.url.indexOf(API_HOST) >= 0) { // self api auto add Authorization
		if (!req.headers.Authorization && store.state.token) {
			req.headers.Authorization = store.getters.auth;
		}
	}
	if (req.interceptors !== false) {
		req.interceptors = true;
	}
	return req;
}

export const onRequestError = error => {
	return Promise.reject(error);
}

export const onResponse = res => {
	if (res.data.retCode !== 0) {
		if (!res.config || res.config && res.config.interceptors === true) {
			MessageBox.alert(res.data.retMsg, `错误 (${res.data.retCode})`, {
				type: 'error'
			})
		}
		return Promise.reject(res);
	}

	return Promise.resolve(res)
}

export const onResponseError = error => {
	if (!error.response) {
		MessageBox.alert(`${error.stack}`, error.message, {
			type: 'error'
		})
	} else {
		if (error.response.status === 401) {
			store.commit('LOGIN_FAILURE');
			console.log('LOGIN_FAILURE');
		}
		// console.dir(error)
		// TODO 500 必定显示 or 拦截器配置
		MessageBox.alert(`${error.response.status} ${error.response.data.retMsg}`, '操作失败', {
			type: 'error'
		})
	}

	return Promise.reject(error);
}

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);

// 图片上传接口配置
export const USER_AVATAR = {
	action: `${API_HOST}/user/update/avatar`,
	name: 'avatar',
	// accept: 'image/jpeg, image/x-png, image/gif'
}

// -----------------------------
// user 用户接口
// -----------------------------

// POST /api/v1/user/register/captcha 获取验证码
export const register_captcha = ({ phone }) => {
	return axios.post(`${API_HOST}/user/register/captcha`, { phone }, { interceptors: false })
}
// POST /api/v1/user/register 用户使用手机号和短信验证码进行注册
export const register = ({ phone, password, captcha, nickName, email }) => {
	return axios.post(`${API_HOST}/user/register`, { phone, password, captcha, nickName, email })
}
// POST /api/v1/user/login 用户登录
export const login = ({ phone, password }) => {
	return axios.post(`${API_HOST}/user/login`, { phone, password })
}
// POST /api/v1/user/logout
export const logout = () => {
	return axios.post(`${API_HOST}/user/logout`)
}
// POST /api/v1/user/reset_password/captcha
export const reset_password_captcha = ({ phone }) => {
	return axios.post(`${API_HOST}/user/reset_password/captcha`, { phone })
}
// POST /api/v1/user/reset_password
export const reset_password = ({ phone, password, captcha }) => {
	return axios.post(`${API_HOST}/user/reset_password`, { phone, password, captcha })
}
// POST /api/v1/user/update/user
export const update_user = ({ nickName, email, sex, description }) => {
	return axios.post(`${API_HOST}/user/update_user`, { nickName, email, sex, description })
}
// POST /api/v1/user/update_password
export const password = ({ password }) => {
	return axios.post(`${API_HOST}/user/update_password`, { password })
}
// 获取商品目录
// GET /api/v1/commodity/catalogs
export const get_commodity_catalogs = () => {
	return axios.get(`${API_HOST}/commodity/catalogs`)
}
// -----------------------------
// channel 频道接口
// -----------------------------

// POST /api/v1/channel/create
export const channel_create = ({ name, commodityCatalog, province, city, county, address, companyName }) => {
	return axios.post(`${API_HOST}/channel/create`, { name, commodityCatalog, province, city, county, address, companyName })
}
// GET /api/v1/channel/find
export const channel_find = ({ page, limits }) => {
	return axios.get(`${API_HOST}/channel/find`, { page, limits })
}

// -----------------------------
// weixin 微信接口
// -----------------------------

// POST /api/v1/wx_open/auth_url
export const wx_get_auth_url = ({ channelID }) => {
	return axios.post(`${API_HOST}/wx_open/auth_url`, { channelID })
}












