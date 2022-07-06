<template>
  <div class="h-[80vh] py-2 flex flex-col">
    <h2 class="dark:text-zinc-200 text-xl text-zinc-900 font-bold mb-2 px-1">
      所有分类
    </h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in $store.getters.catgorys"
        :key="item.id"
        @click="$emit('onItemClick', index)"
        class="dark:text-zinc-300 active:dark:bg-zinc-900 text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped></style>
