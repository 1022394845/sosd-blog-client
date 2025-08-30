import { userLoginAPI } from '@/apis/user'
import { requiredError, result, unknowError } from '@/utils/common'
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
     * @returns {Number} result.code 请求响应码
     * @returns {Number} result.id 用户id
     * @returns {String} result.token 令牌
     */
    async function login(account, password) {
      if (!account || !password) return requiredError

      try {
        const { code, msg, data } = await userLoginAPI(account, password)
        if (code !== 1) return result(1, msg)

        token.value = data.token
        userInfo.value.id = data.id
        return result(0, msg)
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

    return {
      token,
      userInfo,
      login,
      logout
    }
  },
  {
    persist: {
      key: 'sosd-blog-client-user',
      pick: ['token', 'userInfo']
    }
  }
)
