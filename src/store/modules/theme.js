import { THEME_LIGHT } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_LIGHT
  }),
  mutations: {
    // 切换主题模式
    changThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}
