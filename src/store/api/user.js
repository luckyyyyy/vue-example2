/*
* @Author: Administrator
* @Date:   2017-02-25 14:41:16
* @Last Modified by:   William Chan
* @Last Modified time: 2017-05-02 23:50:26
*/

'use strict';

// -----------------------------
// user 用户接口
// -----------------------------

import { http } from '@/store/api'
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
// POST /api/v1/user/reset/captcha
export const reset_password_captcha = ({ phone }) => {
	return http.post(`user/reset/captcha`, { phone })
}
// PUT /api/v1/user/reset
export const reset_password = ({ phone, password, captcha }) => {
	return http.put(`user/reset`, { phone, password, captcha })
}
// PUT /api/v1/user/profile
export const update_user = ({ nickName, email, sex, description }) => {
	return http.put(`user/profile`, { nickName, email, sex, description })
}
// GET /api/v1/user/profile
export const get_user = () => {
	return http.get(`user/profile`)
}
// POST /api/v1/user/password
export const password = ({ oldPassword, newPassword }) => {
	return http.put(`user/password`, { oldPassword, newPassword })
}
