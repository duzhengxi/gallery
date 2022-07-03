import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import { useRem } from './utils/flexible'
import useTheme from './utils/theme'
import mLibs from './libs'
import mDirective from './directives'
import 'virtual:svg-icons-register'
import './permission'

useRem()
useTheme()

createApp(App).use(router).use(store).use(mLibs).use(mDirective).mount('#app')
