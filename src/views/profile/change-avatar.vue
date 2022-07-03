<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 px-0.5 m-1 ml-auto"
      @click="close"
    ></m-svg-icon>
    <img :src="blob" ref="imageTarget" alt="" />
    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      @click="onConfirmClick"
      :loading="loading"
      >确定</m-button
    >
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
// PC端配置对象
const pcOptions = {
  // 裁剪框固定纵横比1：1
  aspectRatio: 1
}
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可跳转裁剪大小
  cropBoxResizable: false
}
</script>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { onMounted, ref } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { getOSSClient } from '@/utils/sts'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { putProfile } from '@/api/sys'

const store = useStore()
defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMITS_CLOSE])

const loading = ref(false)
/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
  loading.value = true
  // 获取剪裁后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 剪裁后的blob地址
    putObjectToOSS(blob)
  })
}
/**
 * 进行OSS 上传
 */
let ossClient
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    // 1.存放的路径（包含名称）
    // 2.file
    const res = await ossClient.put(`images/${fileName}`, file)
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
  }
}
/**
 * 上传头像成功
 */
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  // 更新服务器
  await putProfile(store.getters.userInfo)
  // 通知用户更新成功
  message('success', '用户头像更新成功')
  loading.value = false
  // 关闭dialog
  close()
}

/**
 * 关闭按钮事件
 */
const close = () => {
  emits(EMITS_CLOSE)
}
/**
 * 图片剪裁
 */
const imageTarget = ref(null)
let cropper
/**
 * 接收两个参数：
 * 需要剪裁的图片DOM
 * options配置对象
 */
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal ? mobileOptions : pcOptions
  )
})
</script>

<style></style>
