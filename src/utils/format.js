/**
 * 字符串替换连续换行符为一个空格
 * @param {String} origin 源字符串
 * @returns {String} result 结果字符串
 */
export function replaceNewlinesWithSpace(origin = '') {
  return origin.replace(/\n+/g, ' ')
}
