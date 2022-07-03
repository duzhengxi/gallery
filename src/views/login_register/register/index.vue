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
        注册账号
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onRegister">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="registerForm.username"
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
          v-model="registerForm.password"
          :rules="validatePassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <!-- 确认密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="confirmPassword"
          type="password"
          placeholder="确认密码"
          autocomplete="on"
          v-model="registerForm.confirmPassword"
          rules="validateConfirmPassword:@password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <div class="mb-2">
            <a
              class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
              target="__black"
              @click="onToLogin"
            >
              去登录
            </a>
          </div>
          <div class="text-center">
            <a
              class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
              href="http://www.hebghy.com/member/Reg/RegAgreement/s"
              target="__black"
            >
              注册即同意《慕课网注册协议》
            </a>
          </div>
        </div>

        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnim="false"
          :loading="loading"
        >
          立即注册
        </m-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import {
  Form as veeForm,
  Field as veeField,
  ErrorMessage as veeErrorMessage,
  defineRule
} from 'vee-validate'
import { ref } from 'vue-demi'
import { useStore } from 'vuex'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
/**
 * 插入规则
 */
defineRule('validateConfirmPassword', validateConfirmPassword)
// 用户输入的用户名和密码
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
// 注册时的loading
const loading = ref(false)
// 去登录
const onToLogin = () => {
  // 配置跳转方式
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
/**
 * 立即注册
 */
const onRegister = async () => {
  loading.value = true
  try {
    const payload = {
      username: registerForm.value.username,
      password: registerForm.value.password
    }
    //触发注册
    await store.dispatch('user/register', payload)
  } finally {
    loading.value = false
  }
  router.push('/login')
}
</script>

<style></style>
