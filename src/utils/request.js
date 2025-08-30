import axios from 'axios'
import { showMsg } from './common'
import { useUserStore } from '@/stores/user'

export const baseURL = import.meta.env.VITE_BASE_URL // 基地址

const request = axios.create({
  baseURL,
  timeout: 10000, // 连接超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // 发送请求之前
    const { token } = useUserStore()
    if (token) config.headers.token = token
    return config
  },
  (error) => {
    // 对请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 摘取核心响应数据
    if (response?.status >= 200 && response?.status < 300) {
      return response.data
    }
    // 处理业务失败
    showMsg(response?.data.msg || '服务异常', 'error')
    return Promise.reject(response.data)
  },
  (error) => {
    if (error.status === 401) {
      // token失效/无权限
      showMsg('登录过期，请重新登录', 'error')
    }
    // 默认错误
    else showMsg(error.response?.data.msg || '服务异常', 'error')
    return Promise.reject(error)
  }
)

export default request
