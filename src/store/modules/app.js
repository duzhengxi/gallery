import { ALL_CATEGORY_ITEM } from '@/constants'
export default {
  namespaced: true,
  state: () => {
    // 默认选中全部
    return {
      // 当前选中的分类
      currentCategory: ALL_CATEGORY_ITEM,
      // 搜索文本
      searchText: '',
      // 路由跳转类型
      routerType: 'none'
    }
  },
  mutations: {
    /**
     * 切换选中分类
     */
    changCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    /**
     * 修改search Text
     */
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },
    /**
     * 修改routerType
     */
    changeRouterType(state, newRouterType) {
      state.routerType = newRouterType
    }
  },
  actions: {}
}
