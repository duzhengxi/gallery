import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备，判断依据为屏幕的宽度是否大于指定值（1280）
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
/**
 * 初始化rem 最大值为40 使字体跟随屏幕定义字体大小 navcation部分
 */
export const useRem = () => {
  //定义最大的font-size
  const MAX_FONT_SIZE = 40
  //监听html文档被解析完成事件
  document.addEventListener('DOMContentLoaded', () => {
    //获取html标签
    const html = document.querySelector('html')
    //获取根元素fontsize标准，屏幕宽度/10
    let fontSize = window.innerWidth / 10
    //获取到的fontsize不允许超过定义的最大值
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    //定义根元素（html）的fontSize大小
    html.style.fontSize = fontSize + 'px'
  })
}
