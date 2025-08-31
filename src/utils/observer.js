import { onMounted, onUnmounted } from 'vue'

/**
 * 监听元素进入视口并执行回调函数
 * @param {Ref<any>} target 观察的元素ref对象
 * @param {Function} callback 当元素可见时要执行的回调函数
 * @param {Object} [config] 配置对象
 * @param {Ref<any>} config.root 指定根元素容器 不传为window
 * @param {String} config.rootMargin 根容器外边距 px/% 支持4个不同值
 * @param {Number} config.threshold 触发相交阈值 0 ~ 1 0-刚进入容器
 * @param {Boolean} [once] 仅监听一次 默认为false
 * @returns {Object} 观察器对象
 * @returns {Function} disconnect 手动卸载监听
 */
export function useObserver(target, callback, config = {}, once = false) {
  let observer = null // 观察器实例

  /**
   * 卸载监听
   */
  function disconnect() {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    // 创建实例
    observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries // 仅观察一个元素

        if (entry.isIntersecting) {
          await callback()
          if (once) disconnect() // 仅监听一次 直接卸载
        }
      },
      { ...config }
    )

    if (target.value) observer.observe(target.value)
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    disconnect
  }
}
