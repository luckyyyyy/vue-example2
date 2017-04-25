/*
* @Author: William Chan
* @Date:   2016-12-03 20:43:22
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-25 10:35:50
*/

'use strict';

const STATUS_TYPE = ['REQUEST', 'SUCCESS', 'FAILURE'];
const export_var = (enumerate, ...args) => {
	let data = {};
	const type = STATUS_TYPE.concat(...args);
	type.map(status => {
		data[status] = `${enumerate}_${status}`;
	})
	return data;
}
// user
export const USER                   = export_var('USER', 'LOGIN', 'LOGOUT', 'CLEAR', 'UPDATE', 'UPDATE_AVATAR');
export const LOGIN                  = export_var('LOGIN');
export const REGISTER               = export_var('REGISTER');
export const REGISTER_CAPTCHA       = export_var('REGISTER_CAPTCHA', 'COUNTDOWN');
export const RESETPWD               = export_var('RESETPWD');
export const RESETPWD_CAPTCHA       = export_var('RESETPWD_CAPTCHA', 'COUNTDOWN');
export const UPDATE_USER            = export_var('UPDATE_USER');
export const PASSWORD               = export_var('PASSWORD');
export const COMMODITY_CATALOGS     = export_var('COMMODITY_CATALOGS');
// channel
export const CHANNEL                = export_var('CHANNEL', 'SELECT', 'CLEAR', 'QUERY', 'CHECK', 'UPDATE');
export const CHANNEL_CREATE         = export_var('CHANNEL_CREATE');
export const CHANNEL_FIND           = export_var('CHANNEL_FIND');
export const CHANNEL_DELETE         = export_var('CHANNEL_DELETE');
// multimedia
export const MULTIMEDIA_FIND        = export_var('MULTIMEDIA_FIND', 'DELETE');
export const MULTIMEDIA             = export_var('MULTIMEDIA', 'INSERT', 'DELETE');

// ORDER
export const ORDER                  = export_var('ORDER', 'QUERY');
export const ORDER_FIND             = export_var(
	'ORDER_FIND', 'CONSUME', 'FLOW', 'RECHARGE'
);
export const ORDER_CREATE           = export_var(
	'ORDER_CREATE', 'CONSUME', 'FLOW'
);

// live
export const LIVE                   = export_var(
	'LIVE', 'QUERY','CREATE', 'QUERY_STREAM', 'NOTICE',
	'DELETE', 'TRASH', 'FINISH', 'PUBLIC'
);

// export const LIVE_CREATE            = export_var('LIVE_CREATE');
export const LIVE_FIND              = export_var('LIVE_FIND');
// export const LIVE_QUERY_STREAM      = export_var('LIVE_QUERY_STREAM');
// export const LIVE_DELETE            = export_var('LIVE_DELETE');
// export const LIVE_TRASH             = export_var('LIVE_TRASH');
// export const LIVE_FINISH            = export_var('LIVE_FINISH');
// export const LIVE_PUBLIC            = export_var('LIVE_PUBLIC');
export const LIVE_DETAIL            = export_var(
	'LIVE_DETAIL', 'COUNTDOWN', 'GUIDE', 'SHARE', 'UPDATE', 'AUTH'
);

// VIDEO
export const VIDEO                   = export_var('VIDEO', 'QUERY');

export const VIDEO_FIND              = export_var('VIDEO_FIND');
export const VIDEO_DELETE            = export_var('VIDEO_DELETE');
export const VIDEO_TRASH             = export_var('VIDEO_TRASH');
export const VIDEO_DETAIL            = export_var(
	'VIDEO_DETAIL', 'COUNTDOWN', 'GUIDE', 'SHARE', 'UPDATE', 'AUTH'
);

// weixin
export const WEXIN_AUTH_URL         = export_var('WEXIN_AUTH_URL');

// 网易云信
export const IM                     = export_var('IM', 'DISCONNECT', 'ADDRESS');
export const IM_INIT                = export_var('IM_INIT');
export const IM_DISCONNECT          = export_var('IM_DISCONNECT');
// 聊天室
export const IM_CHATROOM            = export_var('IM_CHATROOM', 'DISCONNECT', 'MEMBERS', 'GAG', 'COMMON', 'MANAGER', 'UPDATE_MY_INFO');
export const IM_CHATROOM_INIT       = export_var('IM_CHATROOM_INIT', 'LOCK');
export const IM_CHATROOM_MSG        = export_var('IM_CHATROOM_MSG', 'GET', 'HISTORY', 'SERVICE');














