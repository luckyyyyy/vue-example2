/*
* @Author: chuxiao
* @Date:   2017-04-18 10:28:42
* @Last Modified by:   cx
* @Last Modified time: 2017-05-25 16:39:08
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
/**
 * 金额格式化
 * @param {number} money 价格
 * @return {string} 格式化后的字符串
 */
export const moneyFormat = (money) => {
	return `￥${ (money/100).toFixed(2) }`;
}
/**
 * 时间格式化
 * @param {number} second 秒
 * @return {string} 格式化后的字符串
 */
export const secondsFormat = (time) => {
	time = time || 0
	let [h, m, s] = [
		parseInt(time / 3600),
		parseInt(time % 3600 / 60),
		parseInt(time % 60)
	]
	h = h < 10 ? '0' + h : h
	m = m < 10 ? '0' + m : m
	s = s < 10 ? '0' + s : s
	return `${h}:${m}:${s}`

}
