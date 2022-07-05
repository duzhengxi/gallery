<template>
  <div>
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          @click="isOpen = false"
          v-if="isOpen"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isOpen"
          v-bind="$attrs"
          class="w-screen bg-white z-50 fixed bottom-0"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    required: true
  }
})
defineEmits(['update:modelValue'])
// 是一个响应式数据，当isOpen值发生改变时，会自动触发emit修改modelValue
const isOpen = useVModel(props)
// popup显示后锁定body
const lock = useScrollLock(document.body)
watch(
  isOpen,
  (val) => {
    lock.value = val
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-emter-from,
.fade-emter-to {
  opacity: 0;
}
.popup-down-up-enter-active {
  transition: all 0.3s;
}
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
