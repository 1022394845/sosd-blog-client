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

/**
 * 获取用户个人信息
 * @param {Number} id 用户id
 */
export const getUserInfoAPI = (id) =>
  request.get('/user/person', { params: { id } })

/**
 * 修改个人信息
 * @param {Object} data 信息表单
 */
export const modifyUserInfoAPI = (data) => request.put('/user/person', data)

/**
 * 获取我的收藏列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 * @param {Object} config 配置项
 * @param {Number} config.userId 用户id
 */
export const getStarListAPI = (page, pageSize, config = {}) =>
  request.get('/user/person/likes', {
    params: { page, pageSize, id: config.userId }
  })

/**
 * 获取历史足迹列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 * @param {Object} config 配置项
 * @param {Number} config.userId 用户id
 */
export const getHistoryListAPI = (page, pageSize, config = {}) =>
  request.get('/user/person/history', {
    params: { page, pageSize, id: config.userId }
  })

/**
 * 获取个人文章列表
 * @param {Number} page 当前页码
 * @param {Number} pageSize 页容量
 * @param {Object} config 配置项
 * @param {Number} config.userId 用户id
 */
export const getUserArticleListAPI = (page, pageSize, config = {}) =>
  request.get('/user/person/articles', {
    params: { page, pageSize, id: config.userId }
  })
