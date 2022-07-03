import { h, render } from 'vue'
import confirmComponent from './index.vue'

/**
 *
 * @param {*} title 标题(如果未传入内容，标题将当作标题)
 * @param {*} content 内容(如果没有title，content将作为第一个参数传入)
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    // 允许只传递content
    if (title && !content) {
      content = title
      title = ''
    }
    // 关闭弹窗回调
    const closeHandler = () => {
      render(null, document.body)
    }
    // 取消按钮事件回调
    const cancelHandler = () => {
      // reject(new Error('取消按钮点击'))
    }
    // 确定按钮事件回调
    const confirmHandler = () => {
      resolve()
    }
    // 1.构建虚拟dom
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      closeHandler
    })
    // 2.渲染
    render(vnode, document.body)
  })
}
