import { userLoginAPI, userRegisterAPI } from '@/apis/user'
import { defaultSuccess, requiredError, unknowError } from '@/utils/common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref(null)
    const emptyUserInfo = {
      id: null, // 用户id
      username: '', // 用户名
      image: '', // 头像
      email: '', // 邮箱
      gender: null // 性别
    }
    const userInfo = ref({ ...emptyUserInfo })

    /**
     * 用户登录
     * @param {String} account 账号
     * @param {String} password 密码
     * @returns {Promise<Object>} result
     */
    async function login(account, password) {
      if (!account || !password) return requiredError

      try {
        const data = await userLoginAPI(account, password)

        token.value = data.token
        userInfo.value.id = data.id
        return defaultSuccess
      } catch {
        return unknowError
      }
    }

    /**
     * 用户退出 清除token与用户信息
     */
    function logout() {
      token.value = null
      userInfo.value = { ...emptyUserInfo }
    }

    /**
     * 用户注册
     * @param {String} account 账号
     * @param {String} password 密码
     * @returns {Promise<Object>} result
     */
    async function register(account, password) {
      if (!account || !password) return requiredError

      try {
        await userRegisterAPI(account, password)
        return defaultSuccess
      } catch {
        return unknowError
      }
    }

    return {
      token,
      userInfo,
      login,
      logout,
      register
    }
  },
  {
    persist: {
      key: 'sosd-blog-client-user',
      pick: ['token', 'userInfo']
    }
  }
)
