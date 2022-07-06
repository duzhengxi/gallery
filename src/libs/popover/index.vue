<template>
  <div class="relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <!-- 具名插槽 -->
    <div ref="referenceTarget">
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-if="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
        :style="contentStyle"
      >
        <!-- 匿名插槽 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
// 延迟关闭时长
const DELAY_TIME = 100
// 指定所有的可选位置常量，并生成 enum：
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BUTTOM_LEFT = 'buttom-left'
const PROP_BUTTOM_RIGHT = 'buttom-right'
// 定义指定位置的enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BUTTOM_LEFT,
  PROP_BUTTOM_RIGHT
]
</script>
<script setup>
import { ref, watch, nextTick } from 'vue'
// 控制气泡是否展示
const isVisable = ref(false)
const props = defineProps({
  placement: {
    type: String,
    default: 'buttom-left',
    validator(val) {
      const res = placementEnum.includes(val)
      if (!res) {
        throw new Error(`您的位置类型只能是${placementEnum.join('、')}中的一种`)
      }
      return res
    }
  }
})
/**
 * 计算气泡框的展示位置
 * 1.气泡框的动态样式
 * 2. 定义一个方法计算传入的气泡内容宽高
 * 3.监听是否isVisable 有就计算位置
 */
const contentStyle = ref({
  left: 0,
  top: 0
})
const contentTarget = ref(null)
const referenceTarget = ref(null)
const getElementSize = (target) => {
  if (!target) return
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
watch(isVisable, (val) => {
  if (!val) return
  // 数据改变之后，Dom改变之前
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          getElementSize(contentTarget.value).width + 'px'
        break
      case PROP_BUTTOM_LEFT:
        contentStyle.value.top = contentTarget.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case PROP_BUTTOM_RIGHT:
        contentStyle.value.top = contentTarget.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          getElementSize(contentTarget.value).width + 'px'
        break
    }
  })
})
// 控制延迟关闭
let timer = null
// 鼠标离开
const onMouseleave = () => {
  timer = setTimeout(() => {
    isVisable.value = false
    timer = null
  }, DELAY_TIME)
}
// 鼠标进入
const onMouseenter = () => {
  isVisable.value = true
  if (timer) {
    clearTimeout(timer)
  }
}
</script>
<style lang="scss" scoped>
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-emter-from,
.slide-emter-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
