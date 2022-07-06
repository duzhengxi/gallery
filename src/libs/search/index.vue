<template>
  <div
    ref="containerTarget"
    class="relative group p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        class="h-1.5 w-1.5 absolute top-[50%] translate-y-[-50%] left-2"
        name="search"
        color="#707070"
      ></m-svg-icon>
      <!-- 输入框 -->
      <input
        v-model="inputValue"
        class="dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700 block w-full h-[44px] pl-4 text-zinc-900 text-sm outline-0 bg-zinc-100 caret-zinc-400 rounded-xl tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
        type="text"
        placeholder="搜索"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- 删除按钮 -->
      <m-svg-icon
        v-show="inputValue"
        @click="onClearClick"
        class="h-1.5 w-1.5 absolute top-[50%] translate-y-[-50%] right-9 duration-500 cursor-pointer"
        name="input-delete"
      ></m-svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute top-[50%] translate-y-[-50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO搜索按钮(通用组件) -->
      <m-button
        icon="search"
        class="opacity-0 rounded-full absolute top-[50%] translate-y-[-50%] right-1 group-hover:opacity-100 duration-700"
        iconColor="#fff"
        @click="onSearchHandler"
      ></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="dark:bg-zinc-800 dark:border-zinc-600 w-full max-h-[368px] px-1.5 py-1 text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] rounded border border-zinc-200 duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// 双向数据绑定
const EMITS_UPDATE_MODEVALUE = 'update:modelValue'
// search触发搜索
const EMITS_SEARCH = 'search'
// 输入事件
const EMITS_INPUT = 'input'
// 删除所有文本事件
const EMITS_CLEAR = 'clear'
// 获取焦点事件
const EMITS_FOCUS = 'focus'
// 失去焦点事件
const EMITS_BLUR = 'blur'
</script>
<script setup>
import { useVModel, onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'
/**
 * 输入内容实现双向数据绑定
 * 搜索按钮在hover时暂时
 * 一键清空文本功能
 * 触发搜索功能
 * 控制下拉展示
 * 事件处理
 */
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emits = defineEmits([
  EMITS_UPDATE_MODEVALUE,
  EMITS_SEARCH,
  EMITS_INPUT,
  EMITS_CLEAR,
  EMITS_FOCUS,
  EMITS_BLUR
])
//输入文本
const inputValue = useVModel(props)
//  一键清空文本
const onClearClick = () => {
  inputValue.value = ''
  emits(EMITS_CLEAR)
}
// 搜索按钮事件
const onSearchHandler = () => {
  emits(EMITS_SEARCH, inputValue)
}
//获取焦点行为
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMITS_FOCUS)
}
// 失去焦点行为
const onBlurHandler = () => {
  emits(EMITS_BLUR)
}
/**
 * 点击区域之外隐藏dropdown
 */
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
// 监听输入行为
watch(inputValue, (val) => {
  emits(EMITS_INPUT, val)
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
  transform: translateX(40px);
  opacity: 0;
}
</style>
