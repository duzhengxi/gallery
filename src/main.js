import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import { useREM } from '@/utils/flexible'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import mLibs from '@/libs'

useREM()
createApp(App).use(router).use(mLibs).mount('#app')
