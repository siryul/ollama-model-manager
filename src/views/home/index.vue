<script lang="ts" setup>
import { computed, ref } from 'vue';
import ChatInput from '@/components/ChatInput.vue';
import type { ChatCompletionChunk, ChatCompletionRole } from 'openai/resources/index.mjs';
import type { Stream } from 'openai/streaming.mjs';
import { useChatStore } from '@/stores/chat';
import { storeToRefs } from 'pinia';

const chatStore = useChatStore();
const { currentChat } = storeToRefs(chatStore);
const showTips = computed(() => {
  return currentChat.value.messages.length === 0;
});
const showStreamResponse = ref(false);

const streamResponse = ref<HTMLElement | null>(null);

const handSubmit = async (stream: Stream<ChatCompletionChunk>) => {
  if (streamResponse.value) {
    showStreamResponse.value = true;
    let innerText = '';
    let role: ChatCompletionRole;
    for await (const chunk of stream) {
      innerText += chunk.choices[0].delta.content;
      role = chunk.choices[0].delta.role!;
      streamResponse.value.innerText = innerText;
    }
    chatStore.updateChat({ role, content: innerText });
    showStreamResponse.value = false;
  }
};
</script>

<template>
  <div class="container h-full overflow-x-hidden overflow-y-auto pb-40">
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

    <ul class="pl-4 pr-4 flex flex-col gap-4 mt-4">
      <li
        class="bg-stone-100 p-2 rounded-lg"
        v-for="(m, i) in currentChat.messages"
        :key="i"
        :class="{ 'text-right': m.role === 'user' }"
      >
        {{ m.content }}
      </li>
      <li v-show="showStreamResponse" class="bg-stone-100 p-2 rounded-lg" ref="streamResponse"></li>
    </ul>

    <ChatInput class="fixed right-10 left-96 bottom-6 shadow-lg rounded-lg" @submit="handSubmit" />
  </div>
</template>
