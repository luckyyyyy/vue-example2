/*
* @Author: William Chan
* @Date:   2016-12-03 20:43:22
* @Last Modified by:   cx
* @Last Modified time: 2017-06-19 17:48:24
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
	'GET', 'LOGIN', 'LOGOUT', 'REGISTER', 'REGISTER_CAPTCHA', 'RESETPWD', 'RESETPWD_CAPTCHA', 'PASSWORD',
	'CLEAR', 'UPDATE', 'UPDATE_AVATAR'
);
// COMMODITY_CATALOGS
export const COMMODITY_CATALOGS = export_var('COMMODITY_CATALOGS', 'REQUEST', 'SUCCESS', 'FAILURE');
// channel
export const CHANNEL = export_var('CHANNEL',
	'GET', 'SET', 'SELECT', 'CLEAR', 'QUERY', 'CHECK', 'UPDATE',
	'CREATE', 'DELETE', 'FIND_REQUEST', 'FIND_SUCCESS', 'FIND_FAILURE', 'LIVE'
);

// multimedia
export const MULTIMEDIA = export_var('MULTIMEDIA',
	'INSERT', 'DELETE',
	'FIND_REQUEST', 'FIND_SUCCESS', 'FIND_FAILURE'
);
export const ACCOUNT = export_var('ACCOUNT',
	'ORDER_FIND', 'ORDER_PAY',
	'BUY_FLOW', 'BUY_EDITION',
	'RECHARGE'
);

// live
export const LIVE = export_var('LIVE',
	'QUERY','CREATE', 'QUERY_STREAM', 'NOTICE',
	'DELETE', 'TRASH', 'FINISH', 'PUBLIC',
	'FIND_REQUEST', 'FIND_SUCCESS', 'FIND_FAILURE',
	'COUNTDOWN', 'GUIDE', 'SHARE', 'UPDATE', 'AUTH'
);

//template频道模板
export const TEMPLATE = export_var('TEMPLATE',
	'QUERY',//查询
	'FIND_ABOUT', 'FIND_BEING', 'FIND_FINISHED',//分页
	'SORT_ABOUT', 'SORT_BEING', 'SORT_FINISHED',//是否自定义排序
	'FIRST_ABOUT', 'FIRST_BEING', 'FIRST_FINISHED',//置顶
	'ABOUT_REQUEST', 'ABOUT_SUCCESS', 'ABOUT_FAILURE',
	'BEING_REQUEST', 'BEING_SUCCESS', 'BEING_FAILURE',
	'FINISHED_REQUEST', 'FINISHED_SUCCESS', 'FINISHED_FAILURE',
)

// VIDEO
export const VIDEO = export_var('VIDEO',
	'QUERY',
	'DELETE', 'TRASH', 'MEDIA_DELETE',
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

// 钱包wallet
export const WALLET = export_var('WALLET',
	'QUERY'
)
