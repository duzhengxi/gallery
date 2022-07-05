<template>
  <svg area-hidden="true">
    <use :class="fillClass" :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // icon名称
  name: {
    type: String,
    required: true
  },
  //   icon颜色
  color: {
    type: String
  },
  //   icon样式 通过tailwind指定
  fillClass: {
    type: String
  }
})
// 真实现实svg图标名，拼接#icon-
const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>
<style lang="scss" scoped></style>
