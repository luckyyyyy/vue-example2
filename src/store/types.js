/*
* @Author: William Chan
* @Date:   2016-12-03 20:43:22
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-21 19:31:00
*/

'use strict';

const STATUS_TYPE = ['REQUEST', 'SUCCESS', 'FAILURE'];
const export_var = (str, ...args) => {
	let data = {};
	const type = STATUS_TYPE.concat(...args);
	type.map( status => {
		data[status] = `${str}_${status}`;
	})
	return data;
}

export const LOGIN            = export_var('LOGIN');
export const REGISTER         = export_var('REGISTER');
export const LOGOUT           = export_var('LOGOUT');
export const REGISTER_CAPTCHA = export_var('REGISTER_CAPTCHA', 'COUNTDOWN');
export const RESETPWD         = export_var('RESETPWD');
export const RESETPWD_CAPTCHA = export_var('RESETPWD_CAPTCHA', 'COUNTDOWN');
export const UPDATE_USER      = export_var('UPDATE_USER');
export const PASSWORD         = export_var('PASSWORD');

