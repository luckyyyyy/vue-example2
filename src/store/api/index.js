/*
* @Author: William Chan
* @Date:   2016-12-02 11:31:24
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-02 17:10:38
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
export const API_HOST =
	process.env.NODE_ENV !== 'production' ?
	'http://101.37.17.152:8088/api/v1'  :
	'/api/v1';

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
			store.commit('LOGIN_FAILURE', error);
			console.log('LOGIN_FAILURE');
			console.dir(error)
		}
		// console.dir(error)
		// TODO 500 必定显示 or 拦截器配置
		MessageBox.alert(`${error.response.data.retMsg || '请求发生错误'}`, `操作失败 ${error.response.status}`, {
			type: 'error'
		})
	}

	return Promise.reject(error);
}

export const http = axios.create({
	baseURL: API_HOST,
	timeout: 10000,
});

http.interceptors.request.use(onRequest, onRequestError);
http.interceptors.response.use(onResponse, onResponseError);
// 图片上传接口配置
export const USER_AVATAR = {
	action: `${API_HOST}/user/update/avatar`,
	method: 'put'
}













