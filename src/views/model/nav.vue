<template>
  <router-link
    v-for="r in routerList"
    :key="r.name"
    class="block hover:bg-gray-200 p-2 text-sm text-ellipsis rounded-md overflow-hidden mb-1 last:mb-0"
    :to="{ name: r.name }"
    >{{ r.show }}</router-link
  >
</template>

<script lang="ts" setup>
const routerList = [
  {
    name: 'hasModel',
    show: '已安装',
  },
  {
    name: 'obtainModel',
    show: '获取模型',
  },
];
</script>

<style scoped>
.router-link-exact-active {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
</style>
