import { loginUser, getProfile, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs/message'
export default {
  namespaced: true,
  state: () => {
    return {
      // 登录之后的token
      token: '',
      userInfo: {}
    }
  },

  mutations: {
    setToken(state, newToken) {
      // 设置token
      state.token = newToken
    },
    // 存储用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录
     */
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data)
      // 获取用户信息
      context.dispatch('profile')
    },
    /**
     * 获取用户信息
     */
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      // 欢迎
      message(
        'success',
        `欢迎您${
          data.vipLevel
            ? '尊贵的VIP' + data.vipLevel + '用户' + data.nickname
            : data.nickname
        }`,
        6000
      )
    },
    /**
     * 退出登录
     */
    loginOut(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    },
    /**
     * 注册
     */
    async register(context, payload) {
      const { password } = payload
      const data = await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      message('success', '注册成功', 3000)
    }
  }
}
