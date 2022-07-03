<template>
  <div class="sticky top-0 left-0 w-full z-10 dark:bg-zinc-800 duration-500">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <!-- 下拉箭头 -->
      <div
        class="absolute right-1 bottom-1 mb-1 rounded z-20rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      >
        <m-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300 "
          @click="triggerState"
        ></m-svg-icon>
      </div>
      <li
        class="text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-900 text-base shrink-0 px-1.5 py-0 z-10 cursor-pointer duration-200 font-bold h-4 last:mr-4 leading-4 hover:bg-zinc-200 rounded mr-1 mb-1"
        :class="{
          'text-zinc-900 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-900':
            $store.getters.currentCategoryIndex === index
        }"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
/**
 * 切换状态处理
 */
const isOpenCategory = ref(false)
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}
/**
 * 选中状态处理
 */
const onItemClick = (item) => {
  store.commit('app/changCurrentCategory', item)
}
</script>
<style></style>
