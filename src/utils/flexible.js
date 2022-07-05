import { computed } from 'vue'
import { PC_DEVICE_WIDTH, MAX_FONTSIZE } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})

/**
 * 初始化rem基准值，最大为40px
 */
export const useREM = () => {
  // 监听html文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    // 获取html标签
    const html = document.querySelector('html')
    // 获取根元素 fontSize 标准，屏幕宽度 / 10。（以 Iphone 为例 Iphone 6 屏幕宽度为 375，则标准 fontSize 为 37.5
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONTSIZE ? MAX_FONTSIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
