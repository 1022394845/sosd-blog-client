import { ElMessage } from 'element-plus'

/**
 * 使用ElMessage显示操作信息
 * @param {String} message 提示内容
 * @param {'success' | 'error' | 'warning' | 'message'} type 显示类型
 * @param {Boolean} [grouping=true] 是否合并相同信息 默认true
 */
export function showMsg(message, type, grouping = true) {
  ElMessage({
    message,
    type,
    grouping
  })
}
