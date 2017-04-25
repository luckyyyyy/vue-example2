/*
* @Author: William Chan
* @Date:   2016-12-03 20:43:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-25 12:24:30
*/

'use strict';

const export_var = (enumerate, ...args) => {
	let data = {};
	const type = [].concat(...args);
	type.map(action => {
		data[action] = `${enumerate}_${action}`;
	})
	return data;
}

// user
export const USER = export_var('USER',
	'LOGIN', 'LOGOUT', 'REGISTER', 'REGISTER_CAPTCHA', 'RESETPWD', 'RESETPWD_CAPTCHA', 'PASSWORD',
	'CLEAR', 'UPDATE', 'UPDATE_AVATAR'
);
// COMMODITY_CATALOGS
export const COMMODITY_CATALOGS = export_var('COMMODITY_CATALOGS', 'REQUEST', 'SUCCESS', 'FAILURE');
// channel
export const CHANNEL = export_var('CHANNEL',
	'SELECT', 'CLEAR', 'QUERY', 'CHECK', 'UPDATE',
	'CREATE', 'DELETE', 'FIND_REQUEST', 'FIND_SUCCESS', 'FIND_FAILURE'
);

// multimedia
export const MULTIMEDIA = export_var('MULTIMEDIA',
	'INSERT', 'DELETE',
	'FIND_REQUEST', 'FIND_SUCCESS', 'FIND_FAILURE'
);

// ORDER
export const ORDER = export_var('ORDER',
	'QUERY'
);
export const ORDER_FIND = export_var('ORDER_FIND',
	'CONSUME', 'FLOW', 'RECHARGE'
);
export const ORDER_CREATE = export_var('ORDER_CREATE',
	'CONSUME', 'FLOW'
);

// live
export const LIVE = export_var('LIVE',
	'QUERY','CREATE', 'QUERY_STREAM', 'NOTICE',
	'DELETE', 'TRASH', 'FINISH', 'PUBLIC',
	'FIND_REQUEST', 'FIND_SUCCESS', 'FIND_FAILURE',
	'COUNTDOWN', 'GUIDE', 'SHARE', 'UPDATE', 'AUTH'
);

// VIDEO
export const VIDEO = export_var('VIDEO',
	'QUERY',
	'DELETE', 'TRASH',
	'FIND_REQUEST', 'FIND_SUCCESS', 'FIND_FAILURE',
	'COUNTDOWN', 'GUIDE', 'SHARE', 'UPDATE', 'AUTH',
);

// weixin
export const WEXIN = export_var('WEXIN',
	'AUTH_URL'
);

// 网易云信
export const IM = export_var('IM',
	'DISCONNECT', 'ADDRESS',
	'INIT_REQUEST', 'INIT_SUCCESS', 'INIT_FAILURE',
);
// 聊天室
export const IM_CHATROOM = export_var('IM_CHATROOM',
	'DISCONNECT', 'MEMBERS', 'GAG', 'COMMON', 'MANAGER', 'UPDATE_MY_INFO',
	'INIT_REQUEST', 'INIT_SUCCESS', 'INIT_FAILURE', 'IMIT_LOCK',
	'MSG_SEND', 'MSG_GET', 'MSG_HISTORY', 'MSG_SERVICE',
);













