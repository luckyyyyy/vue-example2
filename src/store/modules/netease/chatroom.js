/*
* @Author: William Chan
* @Date:   2017-03-09 00:34:27
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-10 02:21:40
*/
// TODO 性能研究 这里是个坑 concat和push
'use strict';

import {
	chatroom_init, chatroom_disconnect, chatroom_send, chatroom_getHistory, chatroom_getMembers,
	chatroom_setGag, chatroom_setCommonMember, chatroom_setManager
} from '../../api/chatroom'
import { CHATROOM, CHATROOM_INIT, CHATROOM_DISCONNECT, CHATROOM_MSG } from '../../types'
import { MessageBox } from 'element-ui'

const refreshMemberType = [
	'addManager',
	'removeManager',
	'addCommon',
	'removeCommon',
	'blackMember',
	'unblackMember',
	'gagMember',
	'ungagMember',
	'kickMember',
	'updateChatroom',
	'updateMemberInfo',
	'addTempMute',
	'removeTempMute',
]

const state = {
	lock: false,
	init: false,
	sned: false,
	user: [],
	data: [],
	history: [],
}

const getters = {
	chatroom_members: state => {
		const members = {};
		for (let member of state.user) {
			members[member.account.toString()] = member;
		}
		return members;
	}
}

const actions = {
	async [CHATROOM_INIT.REQUEST] ({ commit, dispatch }, init) {
		init.onmsgs = msg => {
			commit(CHATROOM_MSG.GET, msg);
			for (let ret of msg) {
				if (ret.type == 'notification' && refreshMemberType.includes(ret.attach.type)) {
					dispatch(CHATROOM.MEMBERS);
					break;
				}
			}
		}
		init.onwillreconnect = error => {
			commit(CHATROOM_INIT.LOCK);
			console.log('IM错误', error)
			if (error) {
				let msg = error.message;
				if (!msg) {
					switch (error.code) {
						// 账号或者密码错误, 请跳转到登录页面并提示错误
						case 302:
							msg = '账号或者密码错误。';
							break;
						// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
						case 417:
							msg = '您的账号已在其他终端登录。';
							break;
						// 被踢, 请提示错误后跳转到登录页面
						case 'kicked':
							msg = '您的账号被系统强制下线。';
							break;
						default:
							break;
					}
				}
				if (error.code != 'logout') {
					MessageBox.alert(msg || '聊天连接丢失，请尝试重新连接。', '聊天室', {
						type: 'error',
					})
				}
			}
		}
		commit(CHATROOM_INIT.REQUEST);
		await chatroom_init(init).then(() => {
			commit(CHATROOM_INIT.SUCCESS);
		}).catch(error => {
			commit(CHATROOM_INIT.FAILURE);
		})
		chatroom_getHistory().then(obj => {
			commit(CHATROOM_MSG.HISTORY, obj.msgs);
		}).catch(err => {

		})
		dispatch(CHATROOM.MEMBERS);
	},
	[CHATROOM.MEMBERS] ({ commit }, guest) {
		chatroom_getMembers(guest || false).then(obj => {
			commit(CHATROOM.MEMBERS, obj.members);
		}).catch(err => {
			console.log(err)
		})
	},

	[CHATROOM_DISCONNECT.REQUEST] ({ commit }) {
		chatroom_disconnect();
		commit(CHATROOM_DISCONNECT.SUCCESS);
		commit(CHATROOM_INIT.FAILURE);
	},
	[CHATROOM_MSG.REQUEST] ({ commit }, text) {
		commit(CHATROOM_MSG.REQUEST);
		return new Promise((resolve, reject) => {
			chatroom_send(text).then(msg => {
				commit(CHATROOM_MSG.SUCCESS, msg);
				resolve(msg);
			}).catch(error => {
				commit(CHATROOM_MSG.FAILURE);
				reject(error);
			})
		})
	},
	[CHATROOM.GAG] ({ commit, dispatch }, ...agrs) {
		return new Promise((resolve, reject) => {
			chatroom_setGag(...agrs).then(msg => {
				resolve(msg);
			}).catch(error => {
				console.log(error)
				reject(error);
			})
		})
	},
	[CHATROOM.COMMON] ({ commit, dispatch }, ...agrs) {
		return new Promise((resolve, reject) => {
			chatroom_setCommonMember(...agrs).then(msg => {
				resolve(msg);
			}).catch(error => {
				console.log(error)
				reject(error);
			})
		})
	},
	[CHATROOM.MANAGER] ({ commit, dispatch }, ...agrs) {
		return new Promise((resolve, reject) => {
			chatroom_setManager(...agrs).then(msg => {
				resolve(msg);
			}).catch(error => {
				console.log(error)
				reject(error);
			})
		})
	},
}

const mutations = {
	[CHATROOM_INIT.REQUEST] (state) {
		state.init    = false
		state.lock    = false;
		state.data    = [];
		state.history = [];
	},
	[CHATROOM_INIT.SUCCESS] (state, nim) {
		state.init = true;
	},
	[CHATROOM_INIT.FAILURE] (state, err) {
		state.init = false;
	},
	[CHATROOM_INIT.LOCK] (state, err) {
		state.lock = true;
		state.data = [];
	},
	[CHATROOM.MEMBERS] (state, members) {
		state.user = members;
	},
	[CHATROOM_DISCONNECT.SUCCESS] (state) {
		state.data = [];
	},
	[CHATROOM_MSG.REQUEST] (state, msg) {
		state.send = true;
	},
	[CHATROOM_MSG.SUCCESS] (state, msg) {
		state.send = false;
		state.data.push(msg);
	},
	[CHATROOM_MSG.FAILURE] (state, msg) {
		state.send = false;
	},
	[CHATROOM_MSG.GET] (state, msg) {
		state.data = state.data.concat(msg);
		if (state.data.length > 500) {
			state.data.splice(0, 200);
		}
		// console.log('新消息', state.data);
	},
	[CHATROOM_MSG.HISTORY] (state, msg) {
		state.history = msg.reverse();
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}
