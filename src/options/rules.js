/*
* @Author: William Chan
* @Date:   2017-03-02 14:29:37
* @Last Modified by:   William Chan
* @Last Modified time: 2017-03-11 01:07:12
*/

'use strict';
// 登录
export const LOGIN_RULES = {
	phone: [
		{ required: true, max: 20, message: '请填写正确的用户名' }
	],
	password: [
		{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
	]
}
// 注册
export const REGISTER_RULES = {
	phone: [
		{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
	],
	captcha: [
		{ required: true, min: 6, max: 6, message: '请输入正确的短信验证码' }
	],
	nickName: [
		{ max: 20, message: '昵称请小于20个字符' }
	],
	password: [
		{ required: true, min: 6, max: 16, message: '请输入6-16位密码' }
	],
	email: [
		{ type: 'email', message: '请输入正确的邮箱' }
	]
}
// 找回密码
export const RESET_PASSWORD_RULES = {
	phone: [
		{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
	],
	captcha: [
		{ required: true, min: 6, max: 6, message: '请输入正确的短信验证码' }
	],
	password: [
		{ required: true, min: 6, max: 16, message: '请输入6-16位密码' }
	]
}
// 创建频道
export const CHANNEL_CREATE_RULES = {
	name: [
		{ required: true, max: 12, message: '频道名称小于12个字符' }
	],
	area: [
		{ required: true, message: '请选择联系地址' }
	],
	commodityCatalog: [
		{ required: true, type: 'number', message: '请选择正确的分类' }
	]
}
// 修改个人信息
export const PROFILE_UPDATE_RULES = {
	email: [
		{ type: 'email', message: '请输入正确的邮箱' }
	],
	nickName: [
		{ max: 20, message: '昵称请小于20个字符' }
	],
	sex: [
		{ type: 'number', message: '请选择正确的性别' }
	],
	description: [
		{ max: 300, message: '个性签名少于300字符' }
	]
}
// 修改密码
export const UPDATE_PASSWORD_RULES = {
	oldPassword: [
		{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
	],
	newPassword: [
		{ required: true, min: 6, max: 16, message: '请填写正确的密码' }
	],
}

// 创建直播
export const LIVE_CREATE_RULES = {
	name: [
		{ required: true, message: '请填写直播名称' },
		{ max: 20, message: '直播请名称小于20个字符' }
	],
}

// 直播公告
export const LIVE_NOTICE_RULES = {
	text: [
		{ required: true, message: '请填写公告' },
		{ max: 50, message: '公告小于50个字符' }
	],
}


