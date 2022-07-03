<template>
  <div class="sticky bg-white top-0 left-0 z-10 dark:bg-zinc-900 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"
        :style="sliderStyle"
      ></li>
      <!-- 面包屑 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!-- items -->
      <li
        :ref="setItemRef"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        @click="onItemClick(item)"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100 ': $store.getters.currentCategoryIndex === index
        }"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isOpenPopup">
      <menu-vue @onItemClick="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup>
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, ref, watch } from 'vue'
import MenuVue from '@/views/main/components/menu/index.vue'
import { useStore } from 'vuex'
const store = useStore()
const isOpenPopup = ref(false)

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 获取填充的所有 item 元素  由于item是多个动态出来的，所以ref不能用一个变量去获取而是用一个函数
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

// 数据改变之后，DOM变化之前被触发，上个函数定义的数据改变就会往数组里添加元素，所以在此函数中把数组清空
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)

// 通过vueuse中的useScroll方法获取响应式的scroll滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget)
//监听currentCategoryIndex的变化
watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    // 获取选中元素的 left、width
    const { left, width } = itemRefs[val].getBoundingClientRect()
    // 为 sliderStyle 设置属性
    sliderStyle.value = {
      // ul 横向滚动位置 + 当前元素的 left 偏移量 -ul的padding值
      transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
      width: width + 'px'
    }
  }
)
// item 点击事件
const onItemClick = (item) => {
  store.commit('app/changCurrentCategory', item)
  isOpenPopup.value = false
}
</script>
