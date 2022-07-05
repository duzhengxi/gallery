import { createRouter, createWebHashHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import mobileTerminalRoutes from './modules/mobile-routes'
import pcTerminalRoutes from './modules/pc-routes'
// 创建vueRouter实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})
export default router
