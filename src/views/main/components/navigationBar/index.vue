<template>
  <moboile-naviagtion-vue
    v-if="isMobileTerminal"
    :date="catgoryList"
  ></moboile-naviagtion-vue>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import moboileNaviagtionVue from './moboile/index.vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { ref } from 'vue'
/**
 * 获取category分类数据
 */
const catgoryList = ref([])
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  catgoryList.value = categorys
  catgoryList.value.unshift(ALL_CATEGORY_ITEM)
}
getCategoryData()
</script>
<style lang="scss" scoped></style>
