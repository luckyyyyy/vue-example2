/*
* @Author: William Chan
* @Date:   2017-03-10 16:42:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 12:18:33
*/

'use strict';

import {
	im_init, im_disconnect, im_chatroom_address,
	im_chatroom_init, im_chatroom_send, im_chatroom_getHistory, im_chatroom_getMembers,
	im_chatroom_setGag, im_chatroom_setCommonMember, im_chatroom_setManager, im_chatroom_disconnect,
	im_chatroom_updateMyInfo
} from '../../api/im'

import { isDev } from '../../../utils/util'

import { IM, IM_CHATROOM } from '../../types'
// refreshMemberType
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
// filterMessageType
const filterMessageType = [
	'updateChatroom',
	'updateMemberInfo',
	'addTempMute',
	'removeTempMute',
]
// 需要显示的customMessageType
const customMessageType = [
	'LIVE_NOTICE'
]
const state = {
	im_init: false,
	lock: false,
	init: false,
	user: [],
	data: [],
	history: [],
	address: [],
	service: [],
}

const getters = {
	members: state => {
		const members = {};
		for (let member of state.user) {
			members[member.account.toString()] = member;
		}
		return members;
	}
}


const actions = {
	[IM.INIT_REQUEST] ({ commit, dispatch, rootState, state }, { im, chatroomId, oncustomsysmsg, onCustomServiceMsg, ondisconnect }) {
		return new Promise(async (resolve, reject) => {
			const init = {}
			init.account        = im.accid;
			init.token          = im.token;
			init.oncustomsysmsg = oncustomsysmsg;
			commit(IM.INIT_REQUEST);
			dispatch(IM_CHATROOM.MSG_SERVICE, 'IM_INIT');
			dispatch(IM_CHATROOM.MSG_SERVICE, { type: 'SYSTEM_TIPS', content: '开始初始化中控台' });
			im_init(init).then(() => {
				commit(IM.INIT_SUCCESS);
				dispatch(IM_CHATROOM.MSG_SERVICE, 'IM_INIT_SUCCESS');
				init.chatroomId = chatroomId;
				init.ondisconnect = ondisconnect;
				dispatch(IM_CHATROOM.MSG_SERVICE, 'IM_CHATROOM_ADDRESS');
				return im_chatroom_address(chatroomId)
			}).then(address => {
				commit(IM.ADDRESS, address);
				dispatch(IM_CHATROOM.MSG_SERVICE, 'IM_CHATROOM_ADDRESS_SUCCESS');
				dispatch(IM_CHATROOM.MSG_SERVICE, address.join(' | '));
				init.chatroomAddresses = state.address;
				commit(IM_CHATROOM.INIT_REQUEST);
				dispatch(IM_CHATROOM.MSG_SERVICE, 'IM_CHATROOM_INIT');
				init.onmsgs = msg => {
					for (let ret of msg) {
						if (ret.type == 'custom' && ret.fromClientType == 'Server') {
							const data = JSON.parse(ret.custom);
							// TODO
							data.content = JSON.parse(data.content);
							dispatch(IM_CHATROOM.MSG_SERVICE, data);
							if (customMessageType.includes(data.type)) {
								commit(IM_CHATROOM.MSG_GET, data);
							}
							onCustomServiceMsg(data);
						} else {
							commit(IM_CHATROOM.MSG_GET, ret);
							if (ret.type == 'notification' && refreshMemberType.includes(ret.attach.type)) {
								dispatch(IM_CHATROOM.MEMBERS);
							}
						}
					}
				}
				return im_chatroom_init(init);
			}).then(() => {
				commit(IM_CHATROOM.INIT_SUCCESS);
				dispatch(IM_CHATROOM.MSG_SERVICE, 'IM_CHATROOM.INIT_SUCCESS');
				dispatch(IM_CHATROOM.MSG_HISTORY);
				dispatch(IM_CHATROOM.MEMBERS);
				dispatch(IM_CHATROOM.MSG_SERVICE, { type: 'SYSTEM_TIPS', content: '中控台初始化完成' });
				resolve();
			}).catch(error => {
				commit(IM.INIT_FAILURE);
				commit(IM_CHATROOM.INIT_FAILURE);
				console.log(error)
				reject(error);
			})
		})
	},
	[IM_CHATROOM.MSG_HISTORY]  ({ commit, dispatch }, guest) {
		dispatch(IM_CHATROOM.MSG_SERVICE, 'CHATROOM_GET_HISTORY');
		im_chatroom_getHistory().then(obj => {
			commit(IM_CHATROOM.MSG_HISTORY, obj.msgs);
		}).catch(err => {
		})
	},
	[IM_CHATROOM.MEMBERS] ({ commit, dispatch }, guest) {
		dispatch(IM_CHATROOM.MSG_SERVICE, 'CHATROOM_GET_MEMBERS');
		im_chatroom_getMembers(guest || false).then(obj => {
			commit(IM_CHATROOM.MEMBERS, obj.members);
		}).catch(err => {
			console.log(err)
		})
	},
	[IM.DISCONNECT] ({ commit, dispatch }) {
		dispatch(IM_CHATROOM.DISCONNECT);
		im_disconnect();
		commit(IM.INIT_FAILURE);
	},
	[IM_CHATROOM.DISCONNECT] ({ commit }) {
		im_chatroom_disconnect();
		commit(IM_CHATROOM.INIT_FAILURE);
	},
	[IM_CHATROOM.MSG_SEND] ({ commit }, text) {
		return new Promise((resolve, reject) => {
			im_chatroom_send(text).then(msg => {
				commit(IM_CHATROOM.MSG_GET, msg);
				resolve(msg);
			}).catch(error => {
				reject(error);
			})
		})
	},
	[IM_CHATROOM.GAG] ({ commit, dispatch }, ...agrs) {
		return new Promise((resolve, reject) => {
			im_chatroom_setGag(...agrs).then(msg => {
				resolve(msg);
			}).catch(error => {
				console.log(error)
				reject(error);
			})
		})
	},
	[IM_CHATROOM.COMMON] ({ commit, dispatch }, ...agrs) {
		return new Promise((resolve, reject) => {
			im_chatroom_setCommonMember(...agrs).then(msg => {
				resolve(msg);
			}).catch(error => {
				console.log(error)
				reject(error);
			})
		})
	},
	[IM_CHATROOM.MANAGER] ({ commit, dispatch }, ...agrs) {
		return new Promise((resolve, reject) => {
			im_chatroom_setManager(...agrs).then(msg => {
				resolve(msg);
			}).catch(error => {
				console.log(error)
				reject(error);
			})
		})
	},
	[IM_CHATROOM.UPDATE_MY_INFO] ({ commit }, ...args) {
		return new Promise((resolve, reject) => {
			im_chatroom_updateMyInfo(...args).then(msg => {
				resolve(msg);
			}).catch(error => {
				console.log(error)
				reject(error);
			})
		})
	},
	[IM_CHATROOM.MSG_SERVICE] ({ commit, dispatch }, obj) {
		let dat = {}
		if (typeof obj == 'string') {
			dat.type    = 'DEBUG';
			dat.content = obj;
		} else {
			dat = obj;
		}
		dat.date = new Date();
		if (isDev() || dat.type != 'DEBUG') {
			commit(IM_CHATROOM.MSG_SERVICE, dat);
		}
	}
}

const mutations = {

	[IM.INIT_REQUEST] (state) {
		state.im_init = false;
		state.init    = false;
		state.lock    = false;
		state.data    = [];
		state.history = [];
		state.service = [];
	},
	[IM.INIT_SUCCESS] (state, nim) {
		state.im_init = true;
	},
	[IM.INIT_FAILURE] (state, err) {
		state.im_init = false;
		state.init    = false;
		state.lock    = false;
		state.data    = [];
		state.history = [];
		state.service = [];
	},
	[IM.ADDRESS] (state, address) {
		state.address = address;
	},
	[IM_CHATROOM.INIT_REQUEST] (state) {
		state.init    = false;
		state.lock    = false;
		state.data    = [];
		state.history = [];
	},
	[IM_CHATROOM.INIT_SUCCESS] (state, nim) {
		state.init = true;
		state.lock = false;
	},
	[IM_CHATROOM.INIT_FAILURE] (state, err) {
		state.init = false;
		state.lock = true;
	},
	[IM_CHATROOM.INIT_LOCK] (state, err) {
		state.init = true;
		state.lock = true;
		state.data = [];
	},
	[IM_CHATROOM.MEMBERS] (state, members) {
		state.user = members;
	},
	[IM_CHATROOM.MSG_REQUEST] (state, msg) {
		state.send = true;
	},
	[IM_CHATROOM.MSG_SUCCESS] (state, msg) {
		state.send = false;
	},
	[IM_CHATROOM.MSG_FAILURE] (state) {
		state.send = false;
	},
	[IM_CHATROOM.MSG_GET] (state, msg) {

		if (msg.type == 'notification' && filterMessageType.includes(msg.attach.type)) {
			return;
		}
		state.data.push(msg);
		if (state.data.length > 500) {
			state.data.splice(0, 200);
		}
	},
	[IM_CHATROOM.MSG_HISTORY] (state, msg) {
		const data = [];
		for (let ret of msg) {
			if (ret.fromClientType != 'Server' && ret.type != 'notification') {
				data.push(ret);
			}
		}
		state.history = data.reverse();
	},
	[IM_CHATROOM.MSG_SERVICE] (state, msg) {
		state.service.push(msg);
	}
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}























