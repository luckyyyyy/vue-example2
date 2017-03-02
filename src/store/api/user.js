/*
* @Author: Administrator
* @Date:   2017-02-25 14:41:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-02 23:51:38
*/

'use strict';

// -----------------------------
// user 用户接口
// -----------------------------

import { http } from './'
// POST /api/v1/user/register/captcha 获取验证码
export const register_captcha = ({ phone }) => {
	return http.post(`user/register/captcha`, { phone }, { interceptors: false })
}
// POST /api/v1/user/register 用户使用手机号和短信验证码进行注册
export const register = ({ phone, password, captcha, nickName, email }) => {
	return http.post(`user/register`, { phone, password, captcha, nickName, email })
}
// POST /api/v1/user/login 用户登录
export const login = ({ phone, password }) => {
	return http.post(`user/login`, { phone, password })
}
// POST /api/v1/user/logout
export const logout = () => {
	return http.post(`user/logout`)
}
// POST /api/v1/user/reset_password/captcha
export const reset_password_captcha = ({ phone }) => {
	return http.post(`user/reset_password/captcha`, { phone })
}
// PUT /api/v1/user/reset_password
export const reset_password = ({ phone, password, captcha }) => {
	return http.put(`user/reset_password`, { phone, password, captcha })
}
// PUT /api/v1/user/update/user
export const update_user = ({ nickName, email, sex, description }) => {
	return http.put(`user/update_user`, { nickName, email, sex, description })
}
// POST /api/v1/user/update_password
export const password = ({ oldPassword, newPassword }) => {
	return http.put(`user/update_password`, { oldPassword, newPassword })
}
