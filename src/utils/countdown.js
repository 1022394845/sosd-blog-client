import { ref, computed, onUnmounted } from 'vue'
/**
 * 倒计时 常用于获取验证码操作
 * @param {Number} delay 倒计时时间(s)
 * @returns {Object} 倒计时控制对象
 * @returns {Function} return.start - 开始倒计时的函数
 * @returns {Function} return.end - 终止倒计时的函数
 * @returns {Ref<Number>} return.remain
 */
export const useCountdown = (delay) => {
  const remain = ref(0) // 剩余时间
  let timer = null // 计时器

  // 禁用状态
  const disabled = computed(() => remain.value > 0)

  /**
   * 开始倒计时
   */
  function start() {
    if (disabled.value) return

    if (timer) clearInterval(timer)
    remain.value = delay

    timer = setInterval(() => {
      remain.value--
      if (remain.value <= 0) {
        clearInterval(timer)
        timer = null
      }
    }, 1000)
  }

  /**
   * 手动终止倒计时
   */
  function end() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    remain.value = 0
  }

  // 组件卸载自动清除计时器
  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    remain,
    disabled,
    start,
    end
  }
}
