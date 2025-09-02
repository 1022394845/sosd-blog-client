/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {Number} wait - 等待时间(ms) 默认100ms
 * @returns {Function} 防抖处理后的函数
 */
export function debounce(func, wait = 100) {
  let timer = null

  return function (...args) {
    // 清除之前的定时器
    clearTimeout(timer)

    // 设定新的定时器，延迟执行函数
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
