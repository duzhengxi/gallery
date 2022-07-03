<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      v-if="type === TYPE_TEXT"
      type="text"
      v-model="text"
      :maxlength="max"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      v-model="text"
      :maxlength="max"
      rows="5"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }}/{{ max }}</span
    >
  </div>
</template>

<script>
const TYPE_TEXT = 'text' //单行
const TYPE_TEXTAREA = 'textarea' // 多行
</script>
<script setup>
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  // input 框是单行还是多行
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const res = arr.includes(value)
      if (!res) {
        throw new Error(`type的值必须在可选范围内[${arr.join('、')}]`)
      }
      return res
    }
  },
  // 最大字符数
  max: {
    type: [String || Number]
  }
})
//事件声明
defineEmits(['update:modelValue'])
// 输入的字符
const text = useVModel(props)
// 输入的字符数
const currentNumber = computed(() => {
  return text.value?.length
})
</script>

<style></style>
