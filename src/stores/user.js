import { updatePasswordAPI, userLoginAPI, userRegisterAPI } from '@/apis/user'
import {
  defaultSuccess,
  requiredError,
  result,
  unknowError
} from '@/utils/common'
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
        const { code, msg, data } = await userLoginAPI(account, password)
        if (code === 0) return result(1, msg)
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
        const { code, msg } = await userRegisterAPI(account, password)
        if (code === 0) return result(1, msg)
        return defaultSuccess
      } catch {
        return unknowError
      }
    }

    /**
     * 修改密码
     * @param {String} email 邮箱
     * @param {String} password 密码
     * @returns {Promise<Object>} result
     */
    async function updatePassword(email, password) {
      if (!email || !password) return requiredError

      try {
        const { code, msg } = await updatePasswordAPI(email, password)
        if (code === 0) return result(1, msg)
        logout() // 退出登录
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
