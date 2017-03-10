/*
* @Author: William Chan
* @Date:   2017-03-10 16:42:39
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-11 02:17:21
*/

'use strict';

import {
	im_init, im_disconnect, im_chatroom_address,
	im_chatroom_init, im_chatroom_send, im_chatroom_getHistory, im_chatroom_getMembers,
	im_chatroom_setGag, im_chatroom_setCommonMember, im_chatroom_setManager, im_chatroom_disconnect
} from '../../api/im'

import {
	IM, IM_INIT,
	IM_CHATROOM, IM_CHATROOM_INIT, IM_CHATROOM_MSG
} from '../../types'
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
	im_init: false,
	lock: false,
	init: false,
	sned: false,
	user: [],
	data: [],
	history: [],
	address: [],
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
	async [IM_INIT.REQUEST] ({ commit, dispatch, rootState }, { chatroomId, oncustomsysmsg }) {
		const init = {}
		const im            = rootState.user.userImInfo;
		init.account        = im.accid;
		init.token          = im.token;
		init.oncustomsysmsg = oncustomsysmsg;
		console.log('IM_INIT');
		commit(IM_INIT.REQUEST);
		await im_init(init).then(() => {
			commit(IM_INIT.SUCCESS);
			console.log('%cIM_INIT_SUCCESS', 'color:green');
		}).catch(error => {
			commit(IM_INIT.FAILURE);
		})
		if (chatroomId) {
			init.chatroomId = chatroomId;
			init.ondisconnect = error => {
				if (error) {
					commit(IM_CHATROOM_INIT.LOCK);
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
			console.log('IM_CHATROOM_ADDRESS');
			await im_chatroom_address(chatroomId).then(address => {
				commit(IM.ADDRESS, address);
				console.log('%cIM_CHATROOM_ADDRESS_SUCCESS', 'color:green');
			}).catch(error => {
			})

			init.chatroomAddresses = rootState.im.address;
			console.log('IM_CHATROOM_INIT');
			commit(IM_CHATROOM_INIT.REQUEST);
			init.onmsgs = msg => {
				commit(IM_CHATROOM_MSG.GET, msg);
				for (let ret of msg) {
					if (ret.type == 'notification' && refreshMemberType.includes(ret.attach.type)) {
						dispatch(IM_CHATROOM.MEMBERS);
						break;
					}
				}
			}

			await im_chatroom_init(init).then(() => {
				console.log('%cIM_CHATROOM_INIT_SUCCESS', 'color:green');
				commit(IM_CHATROOM_INIT.SUCCESS);
			}).catch(error => {
				commit(IM_CHATROOM_INIT.FAILURE);
			})
			console.log('CHATROOM_GET_HISTORY');
			im_chatroom_getHistory().then(obj => {
				commit(IM_CHATROOM_MSG.HISTORY, obj.msgs);
			}).catch(err => {

			})
			console.log('CHATROOM_GET_MEMBERS');
			dispatch(IM_CHATROOM.MEMBERS);
		}
	},
	[IM_CHATROOM.MEMBERS] ({ commit }, guest) {
		im_chatroom_getMembers(guest || false).then(obj => {
			commit(IM_CHATROOM.MEMBERS, obj.members);
		}).catch(err => {
			console.log(err)
		})
	},
	[IM.DISCONNECT] ({ commit, dispatch }) {
		dispatch(IM_CHATROOM.DISCONNECT);
		im_disconnect();
		commit(IM_INIT.FAILURE);
	},
	[IM_CHATROOM.DISCONNECT] ({ commit }) {
		im_disconnect();
		commit(IM_CHATROOM_INIT.FAILURE);
	},
	[IM_CHATROOM_MSG.REQUEST] ({ commit }, text) {
		commit(IM_CHATROOM_MSG.REQUEST);
		return new Promise((resolve, reject) => {
			im_chatroom_send(text).then(msg => {
				commit(IM_CHATROOM_MSG.SUCCESS, msg);
				resolve(msg);
			}).catch(error => {
				commit(IM_CHATROOM_MSG.FAILURE);
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
}

const mutations = {

	[IM_INIT.REQUEST] (state) {
		state.im_init = false;
		state.lock    = false;
	},
	[IM_INIT.SUCCESS] (state, nim) {
		state.im_init = true;
	},
	[IM_INIT.FAILURE] (state, err) {
		state.im_init = false;
		state.init    = false;
		state.lock    = false;
		state.data    = [];
		state.history = [];
	},
	[IM.ADDRESS] (state, address) {
		state.address = address;
	},
	[IM_CHATROOM_INIT.REQUEST] (state) {
		state.init    = false;
		state.lock    = false;
		state.data    = [];
		state.history = [];
	},
	[IM_CHATROOM_INIT.SUCCESS] (state, nim) {
		state.init = true;
		state.lock = false;
	},
	[IM_CHATROOM_INIT.FAILURE] (state, err) {
		state.init = false;
		state.lock = true;
	},
	[IM_CHATROOM_INIT.LOCK] (state, err) {
		state.init = true;
		state.lock = true;
		state.data = [];
	},
	[IM_CHATROOM.MEMBERS] (state, members) {
		state.user = members;
	},
	[IM_CHATROOM_MSG.REQUEST] (state, msg) {
		state.send = true;
	},
	[IM_CHATROOM_MSG.SUCCESS] (state, msg) {
		state.send = false;
		state.data.push(msg);
	},
	[IM_CHATROOM_MSG.FAILURE] (state, msg) {
		state.send = false;
	},
	[IM_CHATROOM_MSG.GET] (state, msg) {
		state.data = state.data.concat(msg);
		if (state.data.length > 500) {
			state.data.splice(0, 200);
		}
		// console.log('新消息', state.data);
	},
	[IM_CHATROOM_MSG.HISTORY] (state, msg) {
		state.history = msg.reverse();
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}























