import { useUserStore } from '@/stores/user'

export let loginDialogInstance = null // 存储登录弹窗实例的变量

/**
 * 手动打开登录弹窗
 */
export const openLogin = () => {
  if (loginDialogInstance && typeof loginDialogInstance.open === 'function') {
    loginDialogInstance.open()
  }
}

// 指令定义对象
export const needLogin = {
  // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  mounted(el, binding) {
    // 保存原始事件处理函数
    const originalHandler = binding.value

    // 定义新的事件处理函数
    const handleClick = (e) => {
      // 检查token是否存在
      const { token } = useUserStore()
      if (!token) {
        // 没有token，阻止原事件并打开登录框
        e.stopPropagation()
        openLogin()
        return
      }

      // token存在，执行原事件处理函数
      if (typeof originalHandler === 'function') {
        originalHandler(e)
      }
    }

    // 存储处理函数以便解绑时使用
    el._loginHandler = handleClick

    // 添加点击事件监听
    el.addEventListener('click', handleClick)
  },

  // 只调用一次，在指令与元素解绑时调用
  unmounted(el) {
    // 移除事件监听，防止内存泄漏
    if (el._loginHandler) {
      el.removeEventListener('click', el._loginHandler)
      delete el._loginHandler
    }
  }
}

/**
 * 注册登录弹窗实例
 * @param {any} instance 弹窗实例
 */
export const registerLoginDialog = (instance) => {
  loginDialogInstance = instance
}
