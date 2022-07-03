<template>
  <div
    class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800 dark:border-b-zinc-700 duration-500"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="h-4 cursor-pointer mr-2 guide-home"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <header-search-vue class="mr-1"></header-search-vue>
      <header-them-vue class="mr-1"></header-them-vue>
      <header-my-vue></header-my-vue>
    </div>
  </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue'
import headerThemVue from './header-them.vue'
import headerMyVue from './header-my.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
/**
 * 点击图标跳转主页
 */
const onToHome = () => {
  router.push('/')
}
</script>

<style></style>
