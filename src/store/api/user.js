/*
* @Author: Administrator
* @Date:   2017-02-25 14:41:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-28 00:22:05
*/

'use strict';

// -----------------------------
// user 用户接口
// -----------------------------

import { API_HOST } from './'
import axios from 'axios'
// POST /api/v1/user/register/captcha 获取验证码
export const register_captcha = ({ phone }) => {
	return axios.post(`${API_HOST}/user/register/captcha`, { phone }, { interceptors: false })
}
// POST /api/v1/user/register 用户使用手机号和短信验证码进行注册
export const register = ({ phone, password, captcha, nickName, email }) => {
	return axios.post(`${API_HOST}/user/register`, { phone, password, captcha, nickName, email })
}
// POST /api/v1/user/login 用户登录
export const login = ({ phone, password }) => {
	return axios.post(`${API_HOST}/user/login`, { phone, password })
}
// POST /api/v1/user/logout
export const logout = () => {
	return axios.post(`${API_HOST}/user/logout`)
}
// POST /api/v1/user/reset_password/captcha
export const reset_password_captcha = ({ phone }) => {
	return axios.post(`${API_HOST}/user/reset_password/captcha`, { phone })
}
// POST /api/v1/user/reset_password
export const reset_password = ({ phone, password, captcha }) => {
	return axios.post(`${API_HOST}/user/reset_password`, { phone, password, captcha })
}
// POST /api/v1/user/update/user
export const update_user = ({ nickName, email, sex, description }) => {
	return axios.post(`${API_HOST}/user/update_user`, { nickName, email, sex, description })
}
// POST /api/v1/user/update_password
export const password = ({ oldPassword, newPassword }) => {
	return axios.put(`${API_HOST}/user/update_password`, { oldPassword, newPassword })
}