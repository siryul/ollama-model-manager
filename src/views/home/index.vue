<script lang="ts" setup>
import { ref } from 'vue';
import ChatInput from '@/components/ChatInput.vue';

const showTips = ref(true);
</script>

<template>
  <div class="container h-full flex items-center justify-center overflow-hidden">
    <ul class="tips flex gap-3 text-gray-400 select-none" v-if="showTips">
      <li class="border rounded-full p-2 shadow-sm flex items-center">
        <span class="material-icons text-yellow-400 mr-1"> lightbulb </span>构思
      </li>
      <li class="border rounded-full p-2 shadow-sm flex items-center">
        <span class="material-icons text-blue-400 mr-1"> school </span>提供建议
      </li>
      <li class="border rounded-full p-2 shadow-sm flex items-center">
        <span class="material-icons text-green-400 mr-1"> create </span>帮我写
      </li>
      <li class="border rounded-full p-2 shadow-sm flex items-center">
        <span class="material-icons text-orange-400 mr-1"> text_snippet </span>总结文本
      </li>
      <li class="border rounded-full p-2 shadow-sm flex items-center">
        <span class="material-icons text-purple-400 mr-1"> code </span>
        代码
      </li>
    </ul>

    <ChatInput class="fixed right-10 left-96 bottom-6 shadow-lg rounded-lg" />
  </div>
</template>
