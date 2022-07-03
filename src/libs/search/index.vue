<template>
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
    ref="containerTarget"
  >
    <div>
      <!-- 搜索icon -->
      <m-svg-icon
        name="search"
        class="w-1.5 h-1.5 absolute left-2 translate-y-[-50%] top-[50%]"
        color="#707070"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandlder"
        @blur="onBlurHandlder"
        @focus="onFocusHandlder"
      />
      <!-- 清空 -->
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        class="h-1.5 w-1.5 absolute cursor-pointer translate-y-[-50%] top-[50%] right-9"
        @click="onClearClick"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] bg-zinc-200 right-[62px] duration-500 group-hover:opacity-100"
      ></div>
      <!-- TODO搜索按钮（通用组件） -->
      <m-button
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 rounded-full group-hover:opacity-100 duration-500"
        icon="search"
        iconColor="#ffffff"
        @click="onSearchHandlder"
      ></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFoucs"
        class="max-h-[368px] w-full text-base overflow-auto dark:bg-zinc-800 dark:border-zinc-600 bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-3xl scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<!--1. 输入内容实现双向数据绑定
    2.搜索按钮在 hover 时展示，并为圆角
    3.一键清空文本功能
      3-1 存在文本时展示
      3-2 一键清空
    4.搜索触发功能
    5.可控制，可填充的下拉展示区
    6.处理所有事件通知
 -->

<script>
// -------------------------指定事件
// 更新事件
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// 搜索事件
const EMIT_SEARCH = 'search'
// 获取焦点事件
const EMIT_FOCUS = 'focus'
// 失去焦点事件
const EMIT_BLUR = 'blur'
// 删除所有文本事件
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
</script>

<script setup>
import { onClickOutside, useVModel } from '@vueuse/core'
import { ref, watch } from 'vue-demi'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
// 注册事件
const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_FOCUS,
  EMIT_BLUR,
  EMIT_CLEAR,
  EMIT_INPUT
])

// 输入文本
const inputValue = useVModel(props)

/**
 *清空文本
 */
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}
/**
 * 搜索按钮触发
 */
const onSearchHandlder = () => {
  emits(EMIT_SEARCH, inputValue.value)
}
// input是否获取到焦点
const isFoucs = ref(false)
/**
 * 输入框获取到焦点
 */
const onFocusHandlder = () => {
  isFoucs.value = true
  emits(EMIT_FOCUS)
}
/**
 * 输入框失去焦点
 */
const onBlurHandlder = () => {
  emits(EMIT_BLUR)
}
/**
 * 输入监听行为
 */
watch(inputValue, (val) => {
  emits(EMIT_INPUT, val)
})
// 获取search整个部分
const containerTarget = ref(null)
/**
 * 点击隐藏dropdown
 */
onClickOutside(containerTarget, () => {
  isFoucs.value = false
})
</script>

<style lang="scss" scoped>
.slide-enter-active {
  transition: all 0.5s;
}
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
