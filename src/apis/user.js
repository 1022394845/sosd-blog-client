import request from '@/utils/request'

/**
 * 用户登录
 * @param {String} account 账号
 * @param {String} password 密码
 */
export const userLoginAPI = (account, password) =>
  request.post('/user/login', { account, password })

/**
 * 用户注册
 * @param {String} account 账号
 * @param {String} password 密码
 */
export const userRegisterAPI = (account, password) =>
  request.post('/user/login/register', { account, password })

/**
 * 发送验证码
 * @param {String} email 邮箱
 */
export const getCodeAPI = (email) =>
  request.get('/user/login/phrase', { params: { email } })

/**
 * 验证码校验
 * @param {String} email 邮箱
 * @param {String} code 验证码
 */
export const validateCodeAPI = (email, code) =>
  request.get('/user/login/verify', { params: { email, code } })

/**
 * 修改密码
 * @param {String} email 邮箱
 * @param {String} password 密码
 */
export const updatePasswordAPI = (email, password) =>
  request.put('/user/login/password', {}, { params: { email, password } })
