/**
 * 搜索历史
 */
export default {
  namespaced: true,
  state: () => ({
    history: []
  }),
  mutations: {
    /**
     * 1.新增的历史记录为头部
     * 2.不可出现重复数据
     */
    addHistory(state, newHistory) {
      const isFindIndex = state.history.findIndex((item) => {
        item === newHistory
      })
      // 剔除旧数据
      if (isFindIndex !== -1) {
        state.history.splice(isFindIndex, 1)
      }
      // 新增记录
      state.history.unshift(newHistory)
    },
    // 删除一个搜索记录
    deleteHistory(state, index) {
      state.history.splice(index, 1)
    },
    // 删除全部搜索记录
    deleteAllHistory(state) {
      state.history = []
    }
  }
}
