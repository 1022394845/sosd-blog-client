import request from '@/utils/request'

/**
 * 用户登录
 * @param {String} account 账号
 * @param {String} password 密码
 */
export const userLoginAPI = (account, password) =>
  request.post('/user/login', { account, password })
