<template>
  <div
    ref="containerTarget"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation-vue></navigation-vue>

    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
    <trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        >首页</trigger-menu-item
      >
      <trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
        >VIP</trigger-menu-item
      >
      <trigger-menu-item
        @click="onMyClick"
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        >{{ $store.getters.token ? '我的' : '去登陆' }}</trigger-menu-item
      >
    </trigger-menu>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import TriggerMenu from '../../libs/trigger-menu/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import TriggerMenuItem from '../../libs/trigger-menu-item/index.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { onActivated, ref } from 'vue'

const router = useRouter()
const store = useStore()
/**
 * 记录页面滚动位置
 */
const containerTarget = ref(null)
const { y: containerTargetScroll } = useScroll(containerTarget)
// 被缓存的组件再次可见，会回调 onActivated 方法
onActivated(() => {
  if (!containerTarget.value) return
  containerTarget.value.scrollTop = containerTargetScroll.value
})
/**
 * VIP click
 */
const onVipClick = () => {
  // 移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push('/member')
}
/**
 * MY click
 */
const onMyClick = () => {
  // 移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  if (store.getters.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}
</script>
