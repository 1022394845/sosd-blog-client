import { updatePasswordAPI, userLoginAPI, userRegisterAPI } from '@/apis/user'
import { defaultSuccess, requiredError } from '@/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(null)
    const userInfo = ref({})

    /**
     * 用户登录
     * @param {String} account 账号
     * @param {String} password 密码
     * @returns {Promise<Object>} result
     */
    async function login(account, password) {
      if (!account || !password) return requiredError

      const data = await userLoginAPI(account, password)
      token.value = data.token
      userInfo.value.id = data.id
      return defaultSuccess
    }

    /**
     * 用户退出 清除token与用户信息
     */
    function logout() {
      token.value = null
      userInfo.value = {}
    }

    /**
     * 用户注册
     * @param {String} account 账号
     * @param {String} password 密码
     * @returns {Promise<Object>} result
     */
    async function register(account, password) {
      if (!account || !password) return requiredError

      await userRegisterAPI(account, password)
      return defaultSuccess
    }

    /**
     * 修改密码
     * @param {String} email 邮箱
     * @param {String} password 密码
     * @returns {Promise<Object>} result
     */
    async function updatePassword(email, password) {
      if (!email || !password) return requiredError

      await updatePasswordAPI(email, password)
      logout() // 退出登录
      return defaultSuccess
    }

    return {
      token,
      userInfo,
      login,
      logout,
      register,
      updatePassword
    }
  },
  {
    persist: {
      key: 'sosd-blog-client-user',
      pick: ['token', 'userInfo']
    }
  }
)
