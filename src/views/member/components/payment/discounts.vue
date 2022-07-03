<template>
  <div
    v-if="!isCountDownFinish"
    class="flex justify-center items-center py-0.5 bg-orange-100 border-orange-300 border-t xl:border xl:rounded-sm"
  >
    <m-svg-icon
      name="countdown"
      class="w-1.5 h-1.5 mr-1"
      fillClass=" fill-red-600"
    ></m-svg-icon>
    <p class="text-xs text-red-600 font-bold">
      限时特惠|距离结束仅剩
      <m-count-down
        @finish="isCountDownFinish = true"
        :time="29 * 60 * 1000"
        class="inline-block"
      ></m-count-down>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 控制特惠是否展示
const isCountDownFinish = ref(false)
</script>

<style></style>
