<template>
  <div
    class="w-5 flex flex-col items-center justify-center mx-0.5"
    @click="onItemClick"
  >
    <!-- 图标  -->
    <m-svg-icon
      :name="icon"
      :fillClass="iconClass"
      class="w-2 h-2"
    ></m-svg-icon>
    <!-- 文字 -->
    <p :class="textClass" class="text-sm mt-0.5">
      <slot></slot>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  // 图标
  icon: {
    type: String,
    required: true
  },
  // 图标颜色
  iconClass: {
    type: String
  },
  // 字体颜色
  textClass: {
    type: String,
    default: 'text-zinc-900 dark:text-zinc-200'
  },
  //跳转的页面
  to: {
    type: String
  }
})
// 点击item跳转
const onItemClick = () => {
  if (!props.to) {
    return
  }
  router.push(props.to)
}
</script>

<style></style>
