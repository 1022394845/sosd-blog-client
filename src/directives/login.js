export let loginDialogInstance = null // 存储登录弹窗实例的变量

/**
 * 手动打开登录弹窗
 */
export const openLogin = () => {
  if (loginDialogInstance && typeof loginDialogInstance.open === 'function')
    loginDialogInstance.open()
}

// 指令定义对象
export const needLogin = {
  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  mounted(el) {
    // 添加点击事件监听
    el.addEventListener('click', openLogin)
  },

  // 只调用一次，在指令与元素解绑时调用
  unmounted(el) {
    // 移除事件监听，防止内存泄漏
    el.removeEventListener('click', () => {})
  }
}

/**
 * 注册登录弹窗实例
 * @param {any} instance 弹窗实例
 */
export const registerLoginDialog = (instance) => {
  loginDialogInstance = instance
}
