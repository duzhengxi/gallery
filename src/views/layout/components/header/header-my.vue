<template>
  <m-popover>
    <template #reference>
      <!-- 登录时的展示头像 -->
      <div
        v-if="$store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="$store.getters.userInfo.avatar"
        />
        <!-- 下箭头 -->
        <m-svg-icon
          name="down-arrow"
          class="w-1.5 h-1.5 ml-0.5"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- VIP图标 -->
        <m-svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          name="vip"
          class="w-1.5 h-1.5 absolute bottom-0 right-[16px]"
        ></m-svg-icon>
      </div>
      <!-- 未登录时的展示 -->
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>

    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArray"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs'
const store = useStore()

const router = useRouter()
// 渲染menu数据源
const menuArray = [
  {
    id: 0,
    icon: 'profile',
    title: '个人资料',
    path: '/profile'
  },
  {
    id: 1,
    icon: 'vip-profile',
    title: '升级 VIP',
    path: '/member'
  },
  {
    id: 2,
    icon: 'logout',
    title: '退出登录',
    path: ''
  }
]
// 跳转去login
const onToLogin = () => {
  // 移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
// meun 退出登录
const onItemClick = (item) => {
  // 退出登录
  if (item.id === 2) {
    // 弹出对话框询问
    confirm('您确定要退出登录吗').then(() => {
      store.dispatch('user/loginOut')
    })
    return
  }
  // 移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push(item.path)
}
</script>

<style></style>
