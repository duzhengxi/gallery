<template>
  <transition name="down">
    <div
      v-show="isVisable"
      :class="styles[type].containewClass"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="w-1.5 h-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
// 定义消息常量
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'
// 消息类型
const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script setup>
import { onMounted, ref } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'
const props = defineProps({
  // 消息类型
  type: {
    type: String,
    required: true,
    validator(val) {
      //指定的类型是否在typeEnum中
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`指定的type只能是${typeEnum.join('、')}`)
      }
      return result
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  //   展示时长
  duration: {
    type: Number
  },
  //   关闭时的回调
  destory: {
    type: Function
  }
})
// 样式表数据
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containewClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  //   成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containewClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  },
  //   错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    // 包裹的边框
    containewClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  }
}
const duration = '0.5s'
// 控制显示处理
const isVisable = ref(false)
/**
 * 保证动画展示，需要在 mounted 之后进行展示
 */
onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
    setTimeout(() => {
      if (props.destory) {
        props.destory()
      }
    }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all v-bind(duration);
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
