/*
* @Author: William Chan
* @Date:   2016-12-03 20:43:22
* @Last Modified by:   William Chan
* @Last Modified time: 2017-01-10 11:50:16
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

export const SIGNIN           = export_var('SIGNIN', 'CHECK');
export const SIGNUP           = export_var('SIGNUP');
export const SIGNOUT          = export_var('SIGNOUT');
export const SIGNUP_SMSCODE   = export_var('SIGNUP_SMSCODE', 'COUNTDOWN');
export const RESETPWD         = export_var('RESETPWD');
export const RESETPWD_SMSCODE = export_var('RESETPWD_SMSCODE', 'COUNTDOWN');

