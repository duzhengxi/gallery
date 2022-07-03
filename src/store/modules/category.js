import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
export default {
  // 独立作用域
  namespaced: true, //  解决不同模块命名冲突的问题，将不同模块的 之后在不同页⾯中引⼊getter、actions、mutations时，需要加上所属的模块名
  state: () => {
    //   navigationBar展示的数据源
    return {
      categorys: CATEGORY_NOMAR_DATA
    }
  },
  mutations: {
    /**
     * 为state中的categorys赋值
     */
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    /**
     * 获取category数据 并自动保存到vuex中
     */
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
