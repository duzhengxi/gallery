<template>
  <div class="">
    <div
      v-for="(item, index) in hintData"
      :key="index"
      @click="onItemClick(item)"
      v-html="highlightText(item)"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
    ></div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { ref } from 'vue'
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/shared'

const props = defineProps({
  searchText: {
    type: String,
    requires: true
  }
})
/**
 * item被点击的触发事件
 */
const emits = defineEmits([EMITS_ITEM_CLICK])
const hintData = ref([])
/**
 * 获取搜索提示数据
 */
const gethintData = async () => {
  if (!props.searchText) return
  const res = await getHint(props.searchText)
  hintData.value = res.result
}
/**
 * item被点击事件处理
 * @param {提示数据对象} item
 */
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}

// 监听搜索数据变化
watchDebounced(() => props.searchText, gethintData, {
  immediate: true,
  //每次事件触发延迟时间
  debounce: 500
})
/**
 * 处理关键字高亮
 */
const highlightText = (text) => {
  // 生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
  const reg = new RegExp(props.searchText, 'gi')
  //替换
  return text.replace(reg, highlightStr)
}
</script>

<style></style>
