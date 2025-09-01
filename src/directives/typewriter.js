// 文本打字机效果
export default {
  mounted(el, binding) {
    // 保存原始文本内容，包括换行符
    const originalText = el.textContent
    // 清空元素内容，准备开始打字效果
    el.textContent = ''

    // 获取用户配置或使用默认值
    const speed = binding.value?.speed || 100 // 打字速度，默认100ms/字
    const onComplete = binding.value?.onComplete || (() => {}) // 完成回调

    let index = 0

    // 打字函数
    const typeWriter = () => {
      if (index < originalText.length) {
        // 逐个添加字符
        el.textContent += originalText.charAt(index)
        index++
        // 递归调用，创建打字效果
        setTimeout(typeWriter, speed)
      } else {
        // 打字完成，触发回调
        onComplete()
      }
    }

    // 开始打字效果
    typeWriter()
  },

  // 当元素更新时重新执行打字效果
  updated(el, binding) {
    // 只有当内容变化时才重新执行
    if (binding.value?.text !== binding.oldValue?.text) {
      // 清除可能存在的定时器
      if (el._typewriteTimer) {
        clearTimeout(el._typewriteTimer)
      }

      // 保存新的文本内容
      const newText = binding.value?.text || el.textContent
      el.textContent = ''

      // 获取配置
      const speed = binding.value?.speed || 100
      const onComplete = binding.value?.onComplete || (() => {})

      let index = 0

      // 定义新的打字函数
      const typeWriter = () => {
        if (index < newText.length) {
          el.textContent += newText.charAt(index)
          index++
          // 保存定时器引用，以便后续清除
          el._typewriteTimer = setTimeout(typeWriter, speed)
        } else {
          onComplete()
        }
      }

      // 开始打字
      el._typewriteTimer = setTimeout(typeWriter, speed)
    }
  },

  // 解绑时清除定时器
  unmounted(el) {
    if (el._typewriteTimer) {
      clearTimeout(el._typewriteTimer)
    }
  }
}
