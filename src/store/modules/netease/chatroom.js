/*
* @Author: William Chan
* @Date:   2017-03-09 00:34:27
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-09 04:41:22
*/
// TODO 性能研究 这里是个坑 concat和push
'use strict';

import { chatroom_init, chatroom_disconnect, chatroom_send, chatroom_getHistory } from '../../api/chatroom'
import { CHATROOM_INIT, CHATROOM_DISCONNECT, CHATROOM_MSG } from '../../types'
import { MessageBox } from 'element-ui'

const state = {
	lock: false,
	init: false,
	sned: false,
	data: [],
	history: [],
}

const getters = {}

const actions = {
	async [CHATROOM_INIT.REQUEST] ({ commit, dispath }, init) {
		init.onmsgs = msg => {
			commit(CHATROOM_MSG.GET, msg);
		}
		init.onwillreconnect = error => {
			commit(CHATROOM_INIT.LOCK);
			console.log(error)
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
					MessageBox.alert(msg, '聊天室', {
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
		}).catch(() => {

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
				resolve();
			}).catch(() => {
				commit(CHATROOM_MSG.FAILURE);
				reject();
			})
		})
	}
}

const mutations = {
	[CHATROOM_INIT.REQUEST] (state) {
		state.init = false
		state.lock = false;
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
		console.log('新消息', state.data);
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
