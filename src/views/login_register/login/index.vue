<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图标：PC端 -->
    <!-- <div class="hidden pt-5 h-8 xl:block">
      <img
        v-lazy
        class="m-auto"
        src="https://res.lgdsunday.club/signlogo.png"
        alt=""
      />
    </div> -->
    <div class="hidden pt-5 h-4 xl:block">
      <img
        v-lazy
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        srcset=""
      />
    </div>
    <!-- 头部图标：移动端 -->
    <div class="h-[111px] xl:hidden">
      <img
        v-lazy
        class="dark:hidden"
        src="https://res.lgdsunday.club/login-bg.png"
        alt=""
      />
      <img
        v-lazy
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        alt=""
        srcset=""
      />
    </div>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onLoginHandler">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
          :rules="validateUsername"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        ></vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
          :rules="validatePassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onRegister"
          >
            去注册
          </a>
        </div>

        <m-button
          :isActiveAnim="false"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
        >
          登录
        </m-button>
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
    <!-- 人类验证行为模块 -->
    <slider-captcha-vue
      v-if="isSliderCaptchaVisable"
      @close="isSliderCaptchaVisable = false"
      @success="onCaptchaSuccess"
    ></slider-captcha-vue>
  </div>
</template>

<script setup>
import {
  Form as veeForm,
  Field as veeField,
  ErrorMessage as veeErrorMessage
} from 'vee-validate'
import { ref } from 'vue-demi'
import { useStore } from 'vuex'
import { validateUsername, validatePassword } from '../validate'
import sliderCaptchaVue from './slider-captcha.vue'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
// 用户输入的用户名和密码
const loginForm = ref({
  username: '',
  password: ''
})
// 控制人类行为验证是否展示
const isSliderCaptchaVisable = ref(false)
// 登录时的loading
const loading = ref(false)
// 用户登录行为
const onLogin = async () => {
  loading.value = true
  // 执行登录操作
  try {
    await store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
/**
 * 人类行为通过验证
 */
const onCaptchaSuccess = () => {
  isSliderCaptchaVisable.value = false
  // 执行登录操作
  onLogin()
}
/**
 * 登录触发,表单校验完成后触发
 */
const onLoginHandler = () => {
  isSliderCaptchaVisable.value = true
}
// 去注册
const onRegister = () => {
  // 移动端下跳转的类型
  store.commit('app/changeRouterType', 'push')
  router.push('/register')
}
</script>

<style></style>
