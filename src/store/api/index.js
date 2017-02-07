/*
* @Author: William Chan
* @Date:   2016-12-02 11:31:24
* @Last Modified by:   William Chan
* @Last Modified time: 2017-01-07 07:28:20
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

const HOST = 'http://api.rainbowbr.cn/api/v2';


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
	if (res.data.code !== 0) {
		if (res.config.interceptors === true) {
			const err = _L[res.data.code] || res.data.error;
			MessageBox.alert(`ERROR（${res.data.code}）${err}`, '错误', {
				type: 'error'
			})
		}
		return Promise.reject(res);
	}
	return res
}, error => {
	if (error.response.status === 401) {
		store.commit('LOGIN_FAILURE');
		console.log('LOGIN_FAILURE');
	}
	// TODO 500 必定显示 or 拦截器配置
	MessageBox.alert(`${error.response.status} ${error.response.statusText}`, '操作失败', {
		type: 'error'
	})
	return Promise.reject(error);
})

// 1.请求验证码 /api/v2/users/smscode-request POST 必须参数 phone
export const sign_up_smscode = ({ phone }) => {
	return axios.post(`${HOST}/users/smscode-request`, { phone }, { interceptors: false })
}
// // 2.注册 /api/v2/users/signup POST 必须参数 username, password, smscode  可选参数 nickname, email_address
export const sign_up = ({ username, password, smscode, nickname, email_address }) => {
	return axios.post(`${HOST}/users/signup`, { username, password, smscode, nickname, email_address })
}
// // 3.登录 /api/v2/users/login POST 必须参数 username, password
export const sign_in = ({ username, password }) => {
	return axios.post(`${HOST}/users/signin`, { username, password })
}
// // 4.修改密码短信验证请求 /api/v2/users/password-reset-request POST 必须参数 phone
export const resetpwd_smscode = ({ phone }) => {
	return axios.post(`${HOST}/users/password-reset-request`, { phone })
}
// // 5.修改密码 /api/v2/users/password-reset POST 必须参数 username, new_password, smscode
export const resetpwd = ({ username, new_password, smscode }) => {
	return axios.post(`${HOST}/users/password-reset`, { username, new_password, smscode })
}



