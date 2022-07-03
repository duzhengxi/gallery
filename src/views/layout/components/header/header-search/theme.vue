<template>
  <div class="">
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themesData.list.length">
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randomRGB()
        }"
      >
        <img
          :src="themesData.big.photo"
          class="h-full w-full object-cover rounded"
        />
        <p
          class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"
        >
          # {{ themesData.big.title }}
        </p>
      </div>
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themesData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded"
          :style="{
            backgroundColor: randomRGB
          }"
        >
          <img
            :src="item.photo"
            v-lazy
            class="h-full w-full object-cover rounded"
          />
          <p
            class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none"
          >
            # {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getThemes } from '@/api/pexels'
import { ref } from 'vue'
import { randomRGB } from '@/utils/color'
import lazy from '@/directives/modules/lazy'
lazy

// 数据
const themesData = ref({
  big: {},
  list: []
})
// 获取数据
const getThemesData = async () => {
  const { themes } = await getThemes()
  themesData.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
}
getThemesData()
</script>

<style></style>
