/*
* @Author: chuxiao
* @Date:   2017-04-18 10:28:42
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-03 12:05:38
*/
'use strict';
import moment from 'moment'
/**
 * 数量格式化
 * @param {number} value 数值
 * @returns {number} 格式化后的字符串
 */
export const numberFormat = (value) => {
	if (value >= 10000) {
		return Math.round(value / 100) / 100 + 'W';
	} else {
		return value;
	}
}
/**
 * 日期格式化
 * @param {number} date 时间戳
 * @param {string} fmt 格式
 * @returns {string} 格式化后的字符串
 */
export const dateFormat = (date, fmt) => {
	return moment(date).format(fmt);
}
