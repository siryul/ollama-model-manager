<script lang="ts" setup>
import { useChatStore } from '@/stores/chat';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const chatStore = useChatStore();
const { chats, currentChat } = storeToRefs(chatStore);

const list = computed(() => {
  return chats.value.filter((c) => c.messages.length);
});

const switchChat = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.nodeName === 'LI') {
    const id = target.dataset.id;
    router.push({ name: 'chat', params: { id } });
    chatStore.switchChat(id!);
  }
};

const getTitle = (m: ChatCompletionMessageParam) => {
  if (!m.content) {
    return '';
  }

  if (typeof m.content === 'string') {
    return m.content;
  }

  const res: { [key: string]: any } = {};

  for (const c of m.content) {
    switch (c.type) {
      case 'text':
        res.text = c.text;
        break;
      case 'image_url':
        res.image_url = c.image_url.url;
        break;
      case 'input_audio':
        res.input_audio = c.input_audio.data;
        break;
      case 'refusal':
        res.refusal = c.refusal;
        break;
    }
  }

  if (res.text) {
    return res.text;
  } else if (res.image_url) {
    return res.image_url;
  } else if (res.input_audio) {
    return res.input_audio;
  } else if (res.refusal) {
    return res.refusal;
  } else {
    return '';
  }
};
</script>

<template>
  <ul class="mt-3 overflow-y-auto" @click="switchChat" v-if="list">
    <li
      class="hover:bg-gray-200 text-sm p-2 rounded-md mb-1 last:mb-0 text-nowrap overflow-hidden text-ellipsis"
      v-for="c in list"
      :key="c.id"
      :class="c.id === currentChat.id ? 'bg-gray-200' : ''"
      :data-id="c.id"
      v-show="c.messages.length"
    >
      {{ getTitle(c.messages[0] as any) }}
    </li>
  </ul>
</template>
