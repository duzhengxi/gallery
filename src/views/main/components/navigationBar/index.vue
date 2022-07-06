<template>
  <moboile-naviagtion-vue v-if="isMobileTerminal"></moboile-naviagtion-vue>
  <pc-naviagtion-vue v-else></pc-naviagtion-vue>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import moboileNaviagtionVue from './moboile/index.vue'
import pcNaviagtionVue from './pc/index.vue'
const store = useStore()
store.dispatch('category/useCategoryDate')
</script>
<style lang="scss" scoped></style>
