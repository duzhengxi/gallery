<template>
  <div class="w-full guide-search">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onSearchHandler"
          >
          </hint-vue>
          <!-- 最近搜索 -->
          <history-vue
            @itemClick="onSearchHandler"
            v-show="!inputValue"
          ></history-vue>
          <!-- 热门推荐 -->
          <theme-vue v-show="!inputValue"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'
import ThemeVue from './theme.vue'

const store = useStore()

const inputValue = ref('')
const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    store.commit('search/addHistory', val)
    // 触发search Text变化
    store.commit('app/changeSearchText', val)
  }
}
</script>

<style></style>
