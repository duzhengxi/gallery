import { h, render } from 'vue'
import messageComponent from './index.vue'

export const message = (type, content, duration = 3000) => {
  //关闭时的回调
  const onDertory = () => {
    // 3.message销毁
    render(null, document.body)
  }
  // 1.构建虚拟DOM
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destory: onDertory
  })
  // 2.渲染
  render(vnode, document.body)
}
