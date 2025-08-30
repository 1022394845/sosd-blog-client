// import { ElMessage } from 'element-plus'

/**
 * 使用ElMessage显示操作信息
 * @param {String} message 提示内容
 * @param {'success' | 'error' | 'warning' | 'message'} type 显示类型
 * @param {Boolean} [grouping=true] 是否合并相同信息 默认true
 */
export function showMsg(message, type, grouping = true) {
  return ElMessage({
    message,
    type,
    grouping
  })
}

/**
 * 前端返回请求结果
 * @param {Number} errCode 请求响应码
 * @param {String} errMsg 请求响应信息
 * @param {String} [custom] 自定义信息
 * @returns {Promise} result 结果对象
 * @returns {Number} result.errCode 请求响应码
 * @returns {String} result.errMsg 请求响应信息
 */
export function result(errCode, errMsg, custom = '') {
  if (custom) errMsg = `${custom},${errMsg}`
  return Promise.resolve({ errCode, errMsg })
}
export const requiredError = result(400, '参数缺失')
export const unknowError = result(500, '服务器错误')
