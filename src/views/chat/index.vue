<script lang="ts" setup>
import { computed, ref } from 'vue';
import ChatInput from '@/components/ChatInput.vue';
import type { ChatCompletionChunk, ChatCompletionRole } from 'openai/resources/index.mjs';
import type { Stream } from 'openai/streaming.mjs';
import { useChatStore } from '@/stores/chat';
import { storeToRefs } from 'pinia';
import marked from '@/utils/highlight';

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
    let role: ChatCompletionRole = 'user'; // 初始化仅为不报错
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
  <div class="container relative h-full overflow-x-hidden overflow-y-auto pb-40">
    <ul
      class="tips absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3 text-gray-400 select-none"
      v-if="showTips"
    >
      <li
        class="border rounded-full p-2 shadow-sm flex items-center text-nowrap hover:bg-stone-100"
      >
        <span class="material-icons text-yellow-400 mr-1"> lightbulb </span>构思
      </li>
      <li
        class="border rounded-full p-2 shadow-sm flex items-center text-nowrap hover:bg-stone-100"
      >
        <span class="material-icons text-blue-400 mr-1"> school </span>提供建议
      </li>
      <li
        class="border rounded-full p-2 shadow-sm flex items-center text-nowrap hover:bg-stone-100"
      >
        <span class="material-icons text-green-400 mr-1"> create </span>帮我写
      </li>
      <li
        class="border rounded-full p-2 shadow-sm flex items-center text-nowrap hover:bg-stone-100"
      >
        <span class="material-icons text-orange-400 mr-1"> text_snippet </span>总结文本
      </li>
      <li
        class="border rounded-full p-2 shadow-sm flex items-center text-nowrap hover:bg-stone-100"
      >
        <span class="material-icons text-purple-400 mr-1"> code </span>
        代码
      </li>
    </ul>

    <ul class="pl-4 pr-4 flex flex-col gap-4 mt-4">
      <li
        v-for="(m, i) in currentChat.messages"
        :key="i"
        class="flex gap-2"
        :class="{ 'flex-row-reverse': m.role === 'user' }"
      >
        <div v-if="m.role !== 'user'">
          <span class="material-icons">supervised_user_circle</span>
        </div>
        <div
          v-html="marked.parse(m.content)"
          class="flex flex-col gap-4 bg-stone-100 p-2 rounded-lg border border-double"
        />
      </li>
      <li v-show="showStreamResponse" class="bg-stone-100 p-2 rounded-lg" ref="streamResponse"></li>
    </ul>

    <ChatInput class="fixed right-10 left-96 bottom-6 shadow-2xl rounded-lg" @submit="handSubmit" />
  </div>
</template>
