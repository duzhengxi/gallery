import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import { useREM } from '@/utils/flexible'
import useTheme from './utils/theme'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import mLibs from '@/libs'

useREM()
// 初始化主题
useTheme()
createApp(App).use(router).use(store).use(mLibs).mount('#app')
