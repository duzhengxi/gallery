<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        class="dark:hover:bg-zinc-900 w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
      ></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        @click="onItemClick(item)"
        v-for="item in themeArr"
        :key="item.id"
        class="dark:hover:bg-zinc-800 flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
      >
        <m-svg-icon
          fillClass="fill-zinc-900 dark:fill-zinc-300"
          class="w-1.5 h-1.5 mr-1 dark:fill-zinc-300"
          :name="item.icon"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
// 构建渲染数据源
const themeArr = [
  {
    id: 0,
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: 1,
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: 2,
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]
/**
 * 主题切换事件
 */
const onItemClick = (item) => {
  store.commit('theme/changThemeType', item.type)
}
const svgIconName = computed(() => {
  const findTheme = themeArr.find((item) => {
    return item.type === store.getters.themeType
  })
  return findTheme.icon
})
</script>
<style lang="scss" scoped></style>
