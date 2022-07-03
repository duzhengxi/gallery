import { THEME_LIGHT } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    //主题模式  默认THEME_LIGHT
    themeType: THEME_LIGHT
  }),
  mutations: {
    /**
     * @param {切换主题模式} state
     * @param {*} newTheme
     */
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}
