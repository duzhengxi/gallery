import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import catePersistedState from 'vuex-persistedstate'
const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    catePersistedState({
      // 保存到localStoreage中的key
      key: 'gallery',
      // 需要保存的模块
      paths: ['category', 'theme']
    })
  ]
})
export default store
