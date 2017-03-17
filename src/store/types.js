/*
* @Author: William Chan
* @Date:   2016-12-03 20:43:22
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-18 01:56:39
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
export const LOGIN                  = export_var('LOGIN');
export const REGISTER               = export_var('REGISTER');
export const LOGOUT                 = export_var('LOGOUT');
export const REGISTER_CAPTCHA       = export_var('REGISTER_CAPTCHA', 'COUNTDOWN');
export const RESETPWD               = export_var('RESETPWD');
export const RESETPWD_CAPTCHA       = export_var('RESETPWD_CAPTCHA', 'COUNTDOWN');
export const UPDATE_USER            = export_var('UPDATE_USER');
export const PASSWORD               = export_var('PASSWORD');
export const COMMODITY_CATALOGS     = export_var('COMMODITY_CATALOGS');
// channel
export const CHANNEL_CREATE         = export_var('CHANNEL_CREATE');
export const CHANNEL_FIND           = export_var('CHANNEL_FIND');
export const CHANNEL_DELETE         = export_var('CHANNEL_DELETE');
export const CHANNEL_QUERY          = export_var('CHANNEL_QUERY');
// multimedia
export const MULTIMEDIA_FIND        = export_var('MULTIMEDIA_FIND', 'INSERT');
// live
export const LIVE_CREATE            = export_var('LIVE_CREATE');
export const LIVE_FIND              = export_var('LIVE_FIND');
export const LIVE_QUERY             = export_var('LIVE_QUERY');
export const LIVE_QUERY_STREAM      = export_var('LIVE_QUERY_STREAM');
export const LIVE_DELETE            = export_var('LIVE_DELETE');
export const LIVE_TRASH             = export_var('LIVE_TRASH');
export const LIVE_FINISH            = export_var('LIVE_FINISH');
export const LIVE_PUBLISH           = export_var('LIVE_PUBLISH');

// weixin
export const WEXIN_AUTH_URL         = export_var('WEXIN_AUTH_URL');

// 网易云信
export const IM                     = export_var('IM', 'DISCONNECT', 'ADDRESS');
export const IM_INIT                = export_var('IM_INIT');
export const IM_DISCONNECT          = export_var('IM_DISCONNECT');
// 聊天室
export const IM_CHATROOM            = export_var('IM_CHATROOM', 'DISCONNECT', 'MEMBERS', 'GAG', 'COMMON', 'MANAGER');
export const IM_CHATROOM_INIT       = export_var('IM_CHATROOM_INIT', 'LOCK');
export const IM_CHATROOM_MSG        = export_var('IM_CHATROOM_MSG', 'GET', 'HISTORY', 'SERVICE');















