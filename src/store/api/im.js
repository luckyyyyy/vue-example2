/*
* @Author: William Chan
* @Date:   2017-03-08 23:18:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-14 16:34:24
*/

'use strict';
// import { http } from './'
import { NIM, Chatroom } from '@/assets/libs/NIM_Web_SDK/js/NIM_Web_SDK_v3.4.0'

const IM_APP_KEY = '29b61d49c94875017bd9855f082a7ec9';
const instance = {}
export const im_init = init => {
	return new Promise((resolve, reject) => {
		init.appKey = IM_APP_KEY;
		init.onconnect = obj => {
			resolve(obj);
		};
		init.onerror = error => {
			reject(error);
		};
		if (instance.nim) {
			instance.nim.disconnect();
			instance.nim.setOptions(init);
			instance.nim.connect();
		} else {
			instance.nim = NIM.getInstance(init);
		}
	})
}

export const im_disconnect = () => {
	if (instance.nim) {
		instance.nim.disconnect();
		delete instance.nim;
	}
}
export const im_chatroom_address = chatroomId => {
	return new Promise((resolve, reject) => {
		if (instance.nim) {
			instance.nim.getChatroomAddress({
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

export const im_update_myinfo = nick => {
	return new Promise((resolve, reject) => {
		if (instance.nim) {
			instance.nim.updateMyInfo({
				nick,
				avatar: '',
				done: (error, msg) => {
					error ? reject(error) : resolve(msg);
				}
			});
		} else {
			reject('not connect');
		}
	});
}

// chatroom
export const im_chatroom_init = init => {
	return new Promise((resolve, reject) => {
		init.appKey = IM_APP_KEY;
		init.onconnect = obj => {
			resolve(obj);
		};
		init.onerror = error => {
			reject(error);
		};
		if (instance.chatroom) {
			instance.chatroom.disconnect();
			instance.chatroom.setOptions(init);
			instance.chatroom.connect();
		} else {
			instance.chatroom = Chatroom.getInstance(init);
		}
	})
}

export const im_chatroom_disconnect = () => {
	if (instance.chatroom) {
		instance.chatroom.disconnect();
		delete instance.chatroom;
	}
}

export const im_chatroom_send = text => {
	return new Promise((resolve, reject) => {
		if (instance.chatroom) {
			instance.chatroom.sendText({
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
		if (instance.chatroom) {
			instance.chatroom.getHistoryMsgs({
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
		if (instance.chatroom) {
			instance.chatroom.getChatroomMembers({
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
		if (instance.chatroom) {
			instance.chatroom.markChatroomGaglist({
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
		if (instance.chatroom) {
			instance.chatroom.markChatroomCommonMember({
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
		if (instance.chatroom) {
			instance.chatroom.markChatroomManager({
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

export const im_chatroom_updateMyInfo = ({ nick }) => {
	return new Promise((resolve, reject) => {
		if (instance.chatroom) {
			im_update_myinfo(nick).then(() => {
				instance.chatroom.updateMyChatroomMemberInfo({
					member: { nick, avatar: '', custom: '' },
					needNotify: true,
					done: (error, obj) => {
						console.log(obj)
						error ? reject(error) : resolve(obj);
					}
				});
			})
		} else {
			reject('not connect');
		}
	})
}

