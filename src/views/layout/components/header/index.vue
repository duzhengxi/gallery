<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 dark:border-b-zinc-700 border-b border-b-zinc-200 px-2 py-1"
  >
    <div class="flex items-center">
      <img
        class="h-5 cursor-pointer mr-2 rounded-sm"
        src="@/assets/images/hearderleft.png"
        @click="onToHome"
      />
      <header-search-vue />
      <header-theme-vue />
      <header-my-vue />
    </div>
  </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme/index.vue'
import headerMyVue from './header-my/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped></style>
