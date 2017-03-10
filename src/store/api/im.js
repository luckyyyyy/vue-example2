/*
* @Author: William Chan
* @Date:   2017-03-08 23:18:57
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-10 17:42:26
*/

'use strict';
import { NIM, Chatroom } from '../../assets/NIM_Web_SDK/js/NIM_Web_SDK_v3.4.0'

const IM_APP_KEY = '29b61d49c94875017bd9855f082a7ec9';
let nim;
let chatroom;

export const im_init = init => {
	return new Promise((resolve, reject) => {
		if (nim) {
			resolve();
		} else {
			nim = NIM.getInstance({
				appKey: IM_APP_KEY,
				account: init.account,
				token: init.token,
				onconnect: obj => {
					resolve(obj);
				},
				onwillreconnect: init.onwillreconnect,
				ondisconnect: init.onwillreconnect,
				onerror: error => {
					reject(error);
				},
				onmsgs: init.onmsgs
			});
		}
	})
}

export const im_disconnect = () => {
	if (nim) {
		nim.disconnect();
		nim = undefined;
	}
	im_chatroom_disconnect();
}
export const im_chatroom_address = chatroomId => {
	return new Promise((resolve, reject) => {
		if (nim) {
			nim.getChatroomAddress({
				chatroomId,
				done: (error, obj) => {
					error ? reject(error) : resolve(obj.address);
				}
			});
		} else {
			reject('not connect');
		}
	})
}

// chatroom
export const im_chatroom_init = init => {
	return new Promise((resolve, reject) => {
		if (chatroom) {
			resolve();
		} else {
			chatroom = Chatroom.getInstance({
				appKey: IM_APP_KEY,
				account: init.account,
				token: init.token,
				chatroomId: init.chatroomId,
				chatroomAddresses: init.chatroomAddresses,
				onconnect: obj => {
					resolve(obj);
				},
				onwillreconnect: init.onwillreconnect,
				ondisconnect: init.onwillreconnect,
				onerror: error => {
					reject(error);
				},
				onmsgs: init.onmsgs
			});
		}
	})
}

export const im_chatroom_disconnect = () => {
	if (chatroom) {
		chatroom.disconnect();
		chatroom = undefined;
	}
}

export const im_chatroom_send = text => {
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

export const im_chatroom_getHistory = () => {
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

export const im_chatroom_getMembers = guest => {
	return new Promise((resolve, reject) => {
		if (chatroom) {
			chatroom.getChatroomMembers({
				limit: 1000,
				guest,
				done: (error, obj) => {
					error ? reject(error) : resolve(obj);
				}
			});
		} else {
			reject('not connect');
		}
	})
}

export const im_chatroom_setGag = ({ account, isAdd }) => {
	return new Promise((resolve, reject) => {
		if (chatroom) {
			chatroom.markChatroomGaglist({
				account, isAdd,
				done: (error, obj) => {
					error ? reject(error) : resolve(obj);
				}
			});
		} else {
			reject('not connect');
		}
	})
}

export const im_chatroom_setCommonMember = ({ account, level, isAdd }) => {
	return new Promise((resolve, reject) => {
		if (chatroom) {
			chatroom.markChatroomCommonMember({
				account, level, isAdd,
				done: (error, obj) => {
					error ? reject(error) : resolve(obj);
				}
			});
		} else {
			reject('not connect');
		}
	})
}

export const im_chatroom_setManager = ({ account, isAdd }) => {
	return new Promise((resolve, reject) => {
		if (chatroom) {
			chatroom.markChatroomManager({
				account, isAdd,
				done: (error, obj) => {
					error ? reject(error) : resolve(obj);
				}
			});
		} else {
			reject('not connect');
		}
	})
}



