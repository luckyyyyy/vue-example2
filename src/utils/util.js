/*
* @Author: William Chan
* @Date:   2017-03-09 04:13:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-23 01:20:26
*/

'use strict';
import moment from 'moment'
export const trim = text => text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
export const date = (date, format) => moment(date).format(format || "Y-MM-DD HH:mm:ss");
export const unix = date => moment(date).unix();

export const isiPad = () => window.navigator.userAgent.indexOf('iPad') > -1;

export const isDev = () => process.env.NODE_ENV !== 'production';

