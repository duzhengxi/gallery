<template>
  <button
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
  >
    <!-- loading展示 -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
      class="m-auto"
    ></m-svg-icon>
    <!-- 文字按钮 -->
    <slot v-else></slot>
  </button>
</template>

<script>
const EMITS_CLICK = 'click'
// type可选项，表示按钮风格
const typeEnum = {
  primary:
    'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-znc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 active:bg-zinc-200 dark:active:bg-zinc-700'
}
// size 表示按钮大小，区分文字按钮和icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  // 图标名字
  icon: {
    type: String
  },
  // 图标颜色
  iconColor: {
    type: String
  },
  // icon图标类名
  iconClass: {
    type: String
  },
  //   按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 获取所有可选按钮
      const keys = Object.keys(typeEnum)
      // 开发者指定风格是否在可选按钮中
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`你的type必须是${keys.join('、')}中的一种`)
      }
      return res
    }
  },
  //   按钮大小
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 获取所有的可选按钮大小，（注意icon开头的元素）
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`你的size必须是${keys.join('、')}中的一种`)
      }
      return res
    }
  },
  //   获取按钮是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  //   加载状态
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits([EMITS_CLICK])
// 处理大小的key值
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
/**
 *按钮事件的点击
 */
const onBtnClick = () => {
  if (props.loading) {
    return
  }
  emits(EMITS_CLICK)
}
</script>
<style lang="scss" scoped></style>
