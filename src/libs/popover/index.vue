<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <!-- 具名插槽 -->
    <div ref="referenceTarget">
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        v-if="isVisable"
        class="absolute p-1 z-20 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
        ref="contentTarget"
        :style="contentStyle"
      >
        <!-- 匿名插槽 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// 延迟时间
const DELAY_TIME = 100
// 1.指定所有的可选位置常量，并生成 enum
const PROP_TOP_LEFT = 'top_left'
const PROP_TOP_RIGHT = 'top_right'
const PROP_BOTTOM_LEFT = 'bottom_left'
const PROP_BOTTOM_RIGHT = 'bottom_right'

// 1-1定义指定位置的Enum
const placeMentEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>

<script setup>
import { nextTick, ref, watch } from 'vue'

const isVisable = ref(false)
// 控制延迟时间
let timeout = null
/**
 * 鼠标进入
 */
const onMouseEnter = () => {
  isVisable.value = true
  // 再次触发时，清理延时装置
  if (timeout) {
    clearTimeout(timeout)
  }
}
/**
 * 鼠标离开
 */
const onMouseLeave = () => {
  // 延时装置
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}

// 2.创建 prop，控制气泡位置
const props = defineProps({
  // 控制气泡弹出位置,并给开发者错误提示
  placement: {
    type: String,
    default: 'bottom_left',
    validator(val) {
      const result = placeMentEnum.includes(val)
      if (!result) {
        throw new Error(
          `你的placement必须是${placeMentEnum.join('、')}中的一个`
        )
      }
      return result
    }
  }
})

// 3.获取元素的 DOM，创建读取元素尺寸的方法
const referenceTarget = ref(null)
const contentTarget = ref(null)
/**
 * 计算元素尺寸
 */
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

/**
 * 4.生成气泡的样式对象，用来控制每个位置的对应样式
 */
const contentStyle = ref({
  top: 0,
  left: 0
})
/**
 * 5.监听展示的变化，计算 contentStyle
 */
watch(isVisable, (val) => {
  if (!val) return
  //等待渲染成功之后
  nextTick(() => {
    switch (props.placement) {
      // 左上
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右上
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + 'px'
        break
      //左下
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + 'px'
        break
      // 右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          useElementSize(contentTarget.value).width + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
