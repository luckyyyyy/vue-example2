/*
* @Author: William Chan
* @Date:   2017-03-09 04:13:54
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-03 12:07:18
*/

'use strict';
import moment from 'moment'

export const trim = text => {
	return text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
export const date = (date, format) => {
	return moment(date).format(format || "Y-MM-DD HH:mm:ss");
}
export const unix = date => {
	return moment(date).unix();
}

export const isiPad = () => {
	return window.navigator.userAgent.indexOf('iPad') > -1;
}

export const isDevelop = () => {
	return process.env.NODE_ENV !== 'production';
}

