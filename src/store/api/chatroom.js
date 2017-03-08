/*
* @Author: William Chan
* @Date:   2017-03-08 23:18:57
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-09 03:44:58
*/

'use strict';
import { Chatroom } from '../../assets/NIM_Web_SDK/js/NIM_Web_SDK_v3.4.0'

const IM_APP_KEY = '29b61d49c94875017bd9855f082a7ec9';
let chatroom;

export const chatroom_init = init => {
	return new Promise((resolve, reject) => {
		const example = Chatroom.getInstance({
			appKey: IM_APP_KEY,
			account: init.account,
			token: init.token,
			chatroomId: init.chatroomId,
			chatroomAddresses: init.chatroomAddresses,
			onconnect: obj => {
				chatroom = example;
				resolve();
			},
			onwillreconnect: init.onwillreconnect,
			ondisconnect: init.onwillreconnect,
			onerror: error => {
				reject(error);
			},
			onmsgs: init.onmsgs
		});
	})
}

export const chatroom_disconnect = () => {
	if (chatroom) {
		chatroom.disconnect();
		chatroom = undefined;
	}
}

export const chatroom_send = text => {
	return new Promise((resolve, reject) => {
		if (chatroom) {
			chatroom.sendText({
				text,
				done: (error, msg) => {
					error ? reject(error) : resolve(msg);
				}
			});
		} else {
			reject('not connect');
		}
	})
}

export const chatroom_getHistory = () => {
	return new Promise((resolve, reject) => {
		if (chatroom) {
			chatroom.getHistoryMsgs({
				limit: 100,
				done: (error, obj) => {
					error ? reject(error) : resolve(obj);
				}
			});
		} else {
			reject('not connect');
		}
	})
}








