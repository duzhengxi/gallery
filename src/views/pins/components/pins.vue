<template>
  <div class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl p-2">
    <!-- 移动端下展示的navbar -->
    <m-navbar v-if="isMobileTerminal">
      {{ pexelsData.title }}
      <template #right>
        <m-svg-icon
          name="share"
          class="h-3 w-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <!-- PC端展示关闭图标 -->
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>

    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        :src="pexelsData.photo"
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-90 dark:fill-zinc-200"
          ></m-svg-icon>
          <m-button
            class=""
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexelsData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img class="h-3 w-3 rounded-full" :src="pexelsData.avatar" alt="" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelsData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPexelsFromId } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// 获取详情数据
const pexelsData = ref({})
const getPexelsData = async () => {
  const res = await getPexelsFromId(props.id)
  pexelsData.value = res
}
getPexelsData()
/**
 * 关闭按钮处理事件
 */
const onPop = () => {
  // 移动端下跳转类型
  store.commit('app/changeRouterType', 'back')
  router.back()
}
</script>

<style></style>
