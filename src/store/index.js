import { createStore } from 'vuex'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: { category, theme, app, search, user },
  plugins: [
    createPersistedState({
      //保存到localStoreage中的key
      key: 'imooc-front',
      //需要保存的模块
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store
