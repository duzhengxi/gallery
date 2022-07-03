import { isMobileTerminal } from '@/utils/flexible'
export default {
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  currentCategory: (state) => state.app.currentCategory,
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex(
      (item) => item.id === getters.currentCategory.id
    )
  },
  /**
   * 搜索历史
   */
  history: (state) => state.search.history,
  searchText: (state) => state.app.searchText,
  // token
  token: (state) => state.user.token,
  //用户信息
  userInfo: (state) => state.user.userInfo,
  //路由跳转方式
  routerType: (state) => {
    // 在PC端下没有跳转动画
    if (!isMobileTerminal) {
      return 'none'
    }
    return state.app.routerType
  }
}
