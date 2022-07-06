import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATE } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    catgorys: CATEGORY_NOMAR_DATE
  }),
  mutations: {
    setCtegorys(state, newCategory) {
      state.catgorys = [ALL_CATEGORY_ITEM, ...newCategory]
    }
  },
  actions: {
    async useCategoryDate(context) {
      const { categorys } = await getCategory()
      context.commit('setCtegorys', categorys)
    }
  }
}
