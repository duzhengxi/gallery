<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        :name="svgIconName"
        class="guide-theme w-2.5 h-2.5 cursor-pointer rounded-sm duration-200 outline-none dark:hover:bg-zinc-900 hover:bg-zinc-100/60"
        fillClass="dark:fill-zinc-300"
      ></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script></script>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
//构建渲染主题
const themeArr = [
  {
    id: 0,
    type: 'THEME_LIGHT',
    icon: 'theme-light',
    name: '极夜白'
  },
  {
    id: 1,
    type: 'THEME_DARK',
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: 2,
    type: 'THEME_SYSTEM',
    icon: 'theme-system',
    name: '跟随系统'
  }
]
const store = useStore()
/**
 * 主题切换
 */
const onItemClick = (themeItem) => {
  store.commit('theme/changeThemeType', themeItem.type)
}
/**
 * 展示图标
 */
const svgIconName = computed(() => {
  // 根据当前的themeType返回当前选中icon
  const findiconName = themeArr.find((item) => {
    return item.type === store.getters.themeType
  })
  return findiconName?.icon || 'THEME_LIGHT'
})
</script>

<style></style>
