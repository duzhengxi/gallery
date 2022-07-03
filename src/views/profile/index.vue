<template>
  <!-- <header-vue class="h-header" v-if="!isMobileTerminal"></header-vue> -->
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2"
    >
      <!-- 移动端 navbar -->
      <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">
        个人资料
      </m-navbar>
      <!-- pc 端 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <!-- 头像 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >
          <!-- 头像部分 -->
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <img
              v-lazy
              :src="$store.getters.userInfo.avatar"
              alt=""
              class="rounded-[50%] w-full h-full xl:inline-block"
            />
            <div
              class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            v-model="$store.getters.userInfo.nickname"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input
            v-model="$store.getters.userInfo.title"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input
            v-model="$store.getters.userInfo.company"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input
            v-model="$store.getters.userInfo.homePage"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="$store.getters.userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>
        <!-- 保存修改 -->
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onChangProfile"
          :loading="loading"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>
    <!-- PC端 -->
    <m-dialog v-if="!isMobileTerminal" v-model="isDialogVisable">
      <change-avatar-vue
        :blob="isCurrentBlob"
        @close="isDialogVisable = false"
      ></change-avatar-vue>
    </m-dialog>
    <!-- 移动端,在指定时指定高度 -->
    <m-popup
      v-else
      :class="{ 'h-screen': isDialogVisable }"
      v-model="isDialogVisable"
    >
      <change-avatar-vue
        :blob="isCurrentBlob"
        @close="isDialogVisable = false"
      ></change-avatar-vue>
    </m-popup>
  </div>
</template>

<script setup>
import headerVue from '../layout/components/header/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import changeAvatarVue from './change-avatar.vue'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { putProfile } from '@/api/sys'
import { confirm } from '@/libs'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
// 控制dialog展示
const isDialogVisable = ref(false)
// 存储本地图片转为blob url地址
const isCurrentBlob = ref('')
const loading = ref(false)
/**
 * 头像选择之后的回调
 */
const onSelectImgHandler = () => {
  const imgFile = inputFileTarget.value.files[0]
  // 生成一个url
  const blob = URL.createObjectURL(imgFile)
  // 拿到blob
  isCurrentBlob.value = blob
  // 展示
  isDialogVisable.value = true
}
/**
 * 更换头像的点击事件
 */
// 隐藏域
const inputFileTarget = ref(false)
const onAvatarClick = () => {
  inputFileTarget.value.click()
}
// 监听Dialog关闭
watch(isDialogVisable, (val) => {
  if (!val) {
    // 防止change不重复触发
    inputFileTarget.value.value = null
  }
})

/**
 * 移动端退出登录
 */
const onLogoutClick = () => {
  confirm('确定要退出登陆吗?').then(() => {
    store.dispatch('user/loginOut')
  })
}
/**
 * 移动端后退事件
 */
const onNavbarLeftClick = () => {
  // 移动端下跳转类型
  store.commit('app/changeRouterType', 'back')
  router.back()
}
// 数据本地的双向同步
const userInfo = ref(store.getters.userInfo)
/**
 * 保存修改
 */
const onChangProfile = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '用户信息修改成功')
  //   更新vuex
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
/**
 * 数据更新触发vuex中的mutation  如果使用这种方式会造成数据同步问题
 *  只要修改 退出返回来已经是修改了的
 * 因为数据一更新就会触发vuex中的mutation
 */
// const changStoreUserInfo = (key, value) => {
//   store.commit('user/setUserInfo', {
//     ...store.getters.userInfo,
//     [key]: value
//   })
// }
</script>

<style></style>
