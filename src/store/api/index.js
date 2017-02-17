/*
* @Author: William Chan
* @Date:   2016-12-02 11:31:24
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-17 14:46:38
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

const HOST = 'http://api.rainbowlive.shop/api/v1';


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

// Promise.reject:
// 1) HTTP status 200 code != 0;
// 2) HTTP status != 200;
// TODO 3) 404 403 res tips;
axios.interceptors.request.use( req => {
	if (req.url.indexOf(HOST) >= 0) { // self api auto add Authorization
		if (!req.headers.Authorization && store.state.token) {
			req.headers.Authorization = store.getters.auth;
		}
	}
	if (req.interceptors !== false) {
		req.interceptors = true;
	}
	return req;
}, error => {
	return Promise.reject(error);
})

axios.interceptors.response.use( res => {
	if (res.data.retCode !== 0) {
		if (res.config.interceptors === true) {
			MessageBox.alert(res.data.retMsg, `错误 (${res.data.retCode})`, {
				type: 'error'
			})
		}
		return Promise.reject(res);
	}
	return res
}, error => {
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
})

// POST /api/v1/user/captcha 获取验证码
export const sign_up_smscode = ({ phone }) => {
	return axios.post(`${HOST}/user/captcha`, { phone }, { interceptors: false })
}
// POST /api/v1/user/register 用户使用手机号和短信验证码进行注册
export const sign_up = ({ phone, password, authCode, nickname, email_address }) => {
	return axios.post(`${HOST}/user/register`, { phone, password, authCode, nickname, email_address })
}
// POST /api/v1/user/login 用户登录
export const sign_in = ({ phone, password }) => {
	return axios.post(`${HOST}/user/login`, { phone, password })
}


// // 4.修改密码短信验证请求 /api/v2/users/password-reset-request POST 必须参数 phone
export const resetpwd_smscode = ({ phone }) => {
	return axios.post(`${HOST}/users/password-reset-request`, { phone })
}
// // 5.修改密码 /api/v2/users/password-reset POST 必须参数 username, new_password, smscode
export const resetpwd = ({ username, new_password, smscode }) => {
	return axios.post(`${HOST}/users/password-reset`, { username, new_password, smscode })
}



