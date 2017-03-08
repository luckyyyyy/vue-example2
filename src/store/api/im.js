/*
* @Author: William Chan
* @Date:   2017-03-08 23:18:57
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-09 02:42:23
*/

'use strict';
import { NIM } from '../../assets/NIM_Web_SDK/js/NIM_Web_SDK_v3.4.0'

const IM_APP_KEY = '29b61d49c94875017bd9855f082a7ec9';
let nim;

export const im_init = init => {
	return new Promise((resolve, reject) => {
		const example = NIM.getInstance({
			debug: false,
			appKey: IM_APP_KEY,
			account: init.account,
			token: init.token,
			onconnect: obj => {
				nim = example;
				resolve();
			},
			onwillreconnect: init.onwillreconnect,
			ondisconnect: error => {
				console.log('IM丢失连接', error);
				if (error) {
					switch (error.code) {
					// 账号或者密码错误, 请跳转到登录页面并提示错误
					case 302:
					    break;
					// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
					case 417:
					    break;
					// 被踢, 请提示错误后跳转到登录页面
					case 'kicked':
					    break;
					default:
					    break;
					}
				}
			},
			onerror: error => {
				reject(error);
			}
		});
	})
}

export const im_disconnect = () => {
	if (nim) {
		nim.disconnect();
		nim = undefined;
	}
}










