import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = '2985B83E292DB041'
    // 如果token存在 注入token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, message, success } = response.data
    //请求成功
    if (success) {
      return data
    }
    //TODO业务错误
    return Promise.reject(new Error(message))
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // TODO :token超时
      store.dispatch('user/loginOut')
    }
    return Promise.reject(error)
  }
  //TODO:错误提示信息
)
export default service
