/*
* @Author: Administrator
* @Date:   2017-01-06 02:28:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-06 03:38:59
*/

'use strict';

export const auth = state => {
	const token = `${state.token}:`;
	return `Basic ${new Buffer(token).toString('base64')}`;
}