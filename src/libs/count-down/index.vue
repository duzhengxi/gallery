<template>
  <div>
    <slot>
      <p class="text-sm">{{ showTime }}</p>
    </slot>
  </div>
</template>

<script>
// 倒计时结束
const EMITS_FINISH = 'finish'
// 倒计时改变
const EMITS_CHANGE = 'change'
// 倒计时间隔
const INTERVAL_COUNT = 1000
</script>
<script setup>
import { onUnmounted, watch, ref, computed } from 'vue'
import dayjs from './utils'
const props = defineProps({
  // 毫秒时间————时间戳
  time: {
    type: Number,
    required: true
  },
  //   倒计时格式
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

// 倒计时开始
let interval
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}
// 倒计时时长
let duration = ref(0)
// 倒计时行为
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  // 监听结束行为
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}
// 倒计时结束关闭
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  {
    immediate: true
  }
)
/**
 * 处理显示时间
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
/**
 * 组件销毁时，清理倒计时
 */
onUnmounted(() => {
  close()
})
</script>

<style></style>
