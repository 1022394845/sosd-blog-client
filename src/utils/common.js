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
 * 使用ElMessageBox确认操作
 * @param {String} content 询问内容
 * @param {String} [title] 标题 默认-温馨提示
 * @returns {Promise<Boolean>} cancel 是否取消
 */
export async function showConfirm(content, title = '温馨提示') {
  try {
    await ElMessageBox.confirm(content, title, {
      type: 'warning',
      center: true,
      'show-close': false
    })
    return false
  } catch {
    return true
  }
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
export const defaultSuccess = result(0, '请求成功')
export const requiredError = result(400, '参数缺失')
export const unknowError = result(500, '服务器错误')
