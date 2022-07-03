import { watch } from 'vue'
import store from '@/store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

/**
 * 监听系统主题变更
 */
let matchMedia
const watchSystemThemeChang = () => {
  //仅需初始化一次即可
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
  //监听主题变更
  matchMedia.onchange = function () {
    changeTheme(THEME_SYSTEM)
  }
}
/**
 * 变更主题
 */
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case 'THEME_LIGHT':
      themeClassName = 'light'
      break
    case 'THEME_DARK':
      themeClassName = 'dark'
      break
    case 'THEME_SYSTEM':
      watchSystemThemeChang()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}
/**
 * 初始化主题
 */
export default () => {
  watch(
    () => store.getters.themeType,
    changeTheme,
    //初始执行一次
    { immediate: true }
  )
}
