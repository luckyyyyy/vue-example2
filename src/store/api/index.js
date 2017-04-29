/*
* @Author: William Chan
* @Date:   2016-12-02 11:31:24
* @Last Modified by:   Webster
* @Last Modified time: 2017-04-29 16:32:08
*/

// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])


'use strict';

import { clearAuthorization } from '../'
import { Modal, Notice } from 'iview'
import { isDevelop } from '../../utils/util'
import axios from 'axios'  // rainbowcloud.tv/api
export const API_HOST = isDevelop() ? 'https://rainbowcloud.tv/api/v1' : '/api/v1';

if (localStorage.getItem('debug')) {
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
		Modal.error({
			content: msg,
			title: 'JavaScript catch'
		})
		return false;
	};
}
export const onRequest = req => {
	// if (req.url.indexOf(API_HOST) >= 0) { // self api auto add ChannelID

	// }
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
			Modal.error({
				title: res.data.retCode && `操作失败` || '错误',
				content: res.data.retMsg || '数据格式异常'
			})
		}
		return Promise.reject(res);
	}

	return Promise.resolve(res)
}

export const onResponseError = error => {
	if (!error.response) {
		Notice.error({
			title: error.message,
			desc: error.stack
		})
	} else {
		if (error.response.status === 401) {
			clearAuthorization();
		} else {
			// console.dir(error)
			// TODO 500 必定显示 or 拦截器配置
			Notice.error({
				title: `服务器错误 ${error.response.status}`,
				desc: `${error.response.data.retMsg || '请求发生错误'}`
			})
		}
	}
	return Promise.reject(error);
}

export const http = axios.create({
	baseURL: API_HOST,
	withCredentials: true,
	timeout: !isDevelop() && 10000,
});

http.interceptors.request.use(onRequest, onRequestError);
http.interceptors.response.use(onResponse, onResponseError);
// 头像接口
export const USER_AVATAR = {
	action: `${API_HOST}/user/avatar`,
	method: 'PUT',
	type: 1
}
// 图片上传接口配置
export const MULTIMEDIA_UPLOAD = {
	action: `${API_HOST}/multimedia/upload/images`,
	method: 'POST',
	multiple: true,
}










