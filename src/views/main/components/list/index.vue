<template>
  <m-infinite
    v-model="isLoading"
    :isFinished="isFinished"
    @onLoad="getPexelsData"
  >
    <m-waterfall
      :data="pexelsList"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
      class="w-full px-1"
    >
      <template v-slot="{ item, width }">
        <itemVue :data="item" :width="width" @click="onToPins" />
      </template>
    </m-waterfall>
  </m-infinite>
  <!-- pins -->
  <!-- 大图详情处理 -->
  <transition
    :css="false"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <pins-vue v-if="isVisablePins" :id="currentPins.id" />
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { isMobileTerminal } from '@/utils/flexible.js'
import { useStore } from 'vuex'
import pinsVue from '../../../pins/components/pins.vue'
import { gsap } from 'gsap'
import { useEventListener } from '@vueuse/core'
const store = useStore()
/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
}
// 数据是否在加载中
const isLoading = ref(false)
// 数据是否全部加载完成
let isFinished = ref(false)
// 数据源
const pexelsList = ref([])
/**
 * 加载数据的方法
 */
const getPexelsData = async () => {
  // // 数据全部加载完成则 return
  if (isFinished.value) {
    return
  }
  // 完成第一次请求之后，后续请求让 page 自增
  if (pexelsList.value.length) {
    query.page += 1
  }
  // 触发接口请求
  const res = await getPexelsList(query)
  // // 初始请求清空数据源
  if (query.page === 1) {
    pexelsList.value = res.list
  } else {
    pexelsList.value.push(...res.list)
  }
  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }
  // 修改 loading 标记
  isLoading.value = false
}
/**
 * 通过此方法修改query请求，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished = false
  pexelsList.value = []
}
/**
 * 监听currentCategory的变化
 */
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    //重置请求参数
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)
watch(
  () => store.getters.searchText,
  (val) => {
    // 重置请求数据
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
// 控制pins是否可见
const isVisablePins = ref(false)
// 装有id的变量
const currentPins = ref({})
/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisablePins.value = false
})
/**
 * 进入pins（路由路径改变）
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  isVisablePins.value = true
  currentPins.value = item
}
/**
 * 钩子动画实现
 */
// 动画开始前
const beforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY
  })
}
// 动画过程
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
// 动画离开
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    onComplete: done
  })
}
</script>
