import {
  getUserInfoAPI,
  updatePasswordAPI,
  userLoginAPI,
  userRegisterAPI
} from '@/apis/user'
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
      getUserInfo(data.id) // 获取用户信息
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

    const getInfoLoading = ref(false)
    /**
     * 获取用户信息
     * @param {Number} id 用户id
     */
    async function getUserInfo(id) {
      if (typeof id !== 'number') return requiredError

      getInfoLoading.value = true
      const data = await getUserInfoAPI(id)
      userInfo.value = { ...data }
      getInfoLoading.value = false
      return defaultSuccess
    }

    /**
     * 获取当前用户id
     */
    function getCurrentUserId() {
      return userInfo.value.id || undefined
    }

    /**
     * 获取当前用户头像
     */
    function getCurrentUserAvatar() {
      return userInfo.value.image || null
    }

    return {
      token,
      userInfo,
      login,
      logout,
      register,
      updatePassword,
      getCurrentUserId,
      getCurrentUserAvatar,
      getInfoLoading,
      getUserInfo
    }
  },
  {
    persist: {
      key: 'sosd-blog-client-user',
      pick: ['token', 'userInfo']
    }
  }
)
