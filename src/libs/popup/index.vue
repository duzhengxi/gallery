<template>
  <div>
    <teleport to="body">
      <!-- 蒙板 -->
      <transition name="fade">
        <div
          class="w-screen h-screen bg-slate-900/80 z-40 fixed top-0 left-0"
          v-if="modelValue"
          @click="emits('update:modelValue', false)"
        ></div>
      </transition>
      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          class="w-screen bg-white z-50 fixed bottom-0 dark:bg-zinc-800"
          v-bind="$attrs"
          v-if="modelValue"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})

// 滚动锁定
const isLocked = useScrollLock(document.body)

// 监听  使什么情况下锁定document.body
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val
  },
  { immediate: true }
)

const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
//蒙版
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 内容
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
