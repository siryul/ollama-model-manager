<script lang="ts" setup>
import { ref } from 'vue';

const chatHistory = ref([
  { id: 'ghjfa', title: 'Mac 疑难杂症', content: [] },
  { id: 'fshjklfsa', title: 'Windows 疑难杂症', content: [] },
]);
const currentChatId = ref('ghjfa');
</script>

<template>
  <button
    class="absolute right-2 top-3 hover:bg-gray-200 rounded-md outline-1 flex items-center justify-center p-1"
  >
    <span class="material-icons text-gray-400">auto_awesome_mosaic</span>
  </button>
  <div
    class="select-none flex items-center text-2xl bg-clip-text font-medium text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
  >
    <span class="material-icons logo">terrain</span>
    <span class="ml-2"> Ollama </span>
  </div>
  <div class="search flex items-center relative mt-4 mb-6 -z-20">
    <span class="material-icons text-gray-400 pointer-events-none ml-1">search</span>
    <input
      type="text"
      class="absolute -z-10 w-full h-8 pl-7 pr-2 font-light bg-gray-100 rounded-md border-double border"
      placeholder="search"
    />
  </div>
  <ul class="mt-3">
    <li
      class="hover:bg-gray-200 text-sm p-2 rounded-md mb-1 last:mb-0 text-nowrap overflow-hidden text-ellipsis"
      v-for="c in chatHistory"
      :key="c.id"
      :class="c.id === currentChatId ? 'bg-gray-200' : ''"
    >
      {{ c.title }}
    </li>
  </ul>
</template>

<style scoped>
.material-icons.logo {
  font-size: 2.25rem;
  line-height: 2.25rem;
}
</style>
