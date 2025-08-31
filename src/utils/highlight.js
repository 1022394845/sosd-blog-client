/**
 * 返回高亮后的html字符串
 * @param {String} text 源文本
 * @param {String} keyword 高亮关键词
 * @param {String} [color] 高亮颜色 默认#e8001c
 * @returns {String} html字符串
 */
export function highlightText(text, keyword, color = '#e8001c') {
  if (!keyword) return text // 无关键词

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 特殊字符转义
  const regex = new RegExp(`(${escapedKeyword})`, 'gi')
  return text.replace(
    regex,
    `<em style="color: ${color}; font-style: normal;">$1</em>`
  )
}
