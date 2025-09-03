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
 * 上传头像
 * @param {File} file 头像文件
 * @param {Function} [getProgress] 获取进度回调
 */
export const uploadAvatarAPI = async (file, getProgress) => {
  const formData = new FormData()
  formData.append('file', file)

  // 判定超时
  let lastLoaded = 0
  let maxLimit = 10 // 超过10次无变化判定超时
  const abortController = new AbortController() // 中断器

  const requestPromise = request.post('/user/common/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    signal: abortController.signal, // 关联中断信号
    onUploadProgress: (progress) => {
      if (progress.loaded === lastLoaded) {
        maxLimit--
        if (maxLimit === 0) abortController.abort(new Error('上传超时'))
      } else {
        maxLimit = 10 // 重置limit
        const percentage = Math.round((progress.loaded * 100) / progress.total)
        if (typeof getProgress === 'function') getProgress(percentage)
      }
    }
  })

  return requestPromise.catch((error) => {
    if (error.name === 'AbortError') {
      // 主动中断的错误
      throw new Error('上传超时，请检查网络')
    }
    // 其他错误原样抛出
    throw error
  })
}

/**
 * 修改个人信息
 * @param {Object} data 信息表单
 */
export const modifyUserInfoAPI = (data) => request.put('/user/person', data)
