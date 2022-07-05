import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    /**
     * 自动导入
     * 1.获取当前路径下所有文件夹中的index.vue
     * 2.遍历获取到的组件模块
     * 3.利用app.component进行组册
     */
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
