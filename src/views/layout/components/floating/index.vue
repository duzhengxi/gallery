<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="guide-start w-4 h-4 mb-1 rounded-full bg-white flex justify-center items-center group cursor-pointer dark:bg-zinc-900 border dark:border-0 duration-200 hover:shadow-lg"
      @click="onGuideClick"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
      ></m-svg-icon>
    </div>
    <!-- 吐槽 -->
    <m-popover class="flex items-center guide-feedback">
      <template #reference>
        <div
          class="w-4 h-4 mb-1 rounded-full bg-white flex justify-center items-center group cursor-pointer dark:bg-zinc-900 border dark:border-0 duration-200 hover:shadow-lg"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></m-svg-icon>
        </div>
      </template>
      <!-- 气泡展示  -->
      <div class="w-[140px] overflow-hidden">
        <div
          class="rounded cursor-pointer flex items-center p-1 hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
// 完成功能引导的实现，需要借助一个第三方的包：driver.js 安装好后引入到对应模块
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue-demi'
import steps from './steps'
let driver = null
/**
 * 开始引导
 */
const onGuideClick = () => {
  // 指定引导步骤
  driver.defineSteps(steps)
  driver.start()
}
/**
 * 引导页处理 driver.js 的运行主要依赖于 defineSteps ，所以我们需要先构建出这样的数组
 */

onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一个',
    prevBtnText: '上一个'
  })
})
</script>

<style lang="scss" scoped>
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
