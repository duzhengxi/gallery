<template>
  <div class="bg-white sticky top-0 z-10">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        @click="onShowPopup"
        class="z-20 fixed right-[-1px] top-0 h-4 px-1 bg-white flex items-center shadow-l-white"
      >
        <m-svg-icon class="h-1.5 w-1.5" name="hamburger"></m-svg-icon>
      </li>
      <!-- category item -->
      <li
        :ref="setItemRef"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        v-for="(item, index) in date"
        :key="item.id"
        :class="{ 'text-zinc-200': currentCategoryIndex === index }"
        @click="itemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <m-popup v-model="isVisible">
    <div>
      <!-- <ul>
        <li v-for="item in date" :key="item.id">{{ item.name }}</li>
      </ul> -->
      123
    </div>
  </m-popup>
</template>

<script setup>
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, ref, watch } from 'vue'

const props = defineProps({
  date: {
    type: Array,
    required: true
  }
})
// 数据更新之前要把数组滞空  否则会越加越多
onBeforeUpdate(() => {
  itemRefs = []
})
// 所有item元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
// ul横向滚动位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
// 点击事件
// 当前选中的item下标
const currentCategoryIndex = ref(0)
const itemClick = (index) => {
  currentCategoryIndex.value = index
}
// 滑块动态样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '60px'
})
watch(currentCategoryIndex, (val) => {
  // 获取选中元素的 left、width
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 为 sliderStyle 设置属性
  sliderStyle.value = {
    // ul 横向滚动位置 + 当前元素的 left 偏移量
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})
// ============================================================
// 控制popup是否显示
const isVisible = ref(false)
// 汉堡按钮事件
const onShowPopup = () => {
  isVisible.value = true
}
</script>
<style lang="scss" scoped></style>
