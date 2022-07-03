import svgIcon from './svg-icon/index.vue'
import popup from './popup/index.vue'
import search from './search/index.vue'
import button from './button/index.vue'
import popover from './popover/index.vue'
import waterfall from './waterfall/index.vue'
import infinite from './infinite/index.vue'
import navbar from './navbar/index.vue'
import input from './input/index.vue'
import triggerMenu from './trigger-menu/index.vue'
import triggerMenuItem from './trigger-menu-item/index.vue'
import transitionRouterView from './transition-router-view/index.vue'
import dialog from './dialog/index.vue'
import countDown from './count-down/index.vue'
import message from './message/index.vue'
export { message } from './message/index'
import confirm from './confirm/index.vue'
export { confirm } from './confirm/index'

export default {
  install(app) {
    app.component('m-svg-icon', svgIcon)
    app.component('m-popup', popup)
    app.component('m-search', search)
    app.component('m-button', button)
    app.component('m-popover', popover)
    app.component('m-waterfall', waterfall)
    app.component('m-infinite', infinite)
    app.component('m-confirm', confirm)
    app.component('m-message', message)
    app.component('m-navbar', navbar)
    app.component('m-input', input)
    app.component('m-dialog', dialog)
    app.component('m-trigger-Menu', triggerMenu)
    app.component('m-trigger-menu-item', triggerMenuItem)
    app.component('m-transition-router-view', transitionRouterView)
    app.component('m-count-down', countDown)
  }
}
