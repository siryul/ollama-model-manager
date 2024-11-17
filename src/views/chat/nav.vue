<script lang="ts" setup>
import { useChatStore } from '@/stores/chat';
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
</script>

<template>
  <ul class="mt-3 overflow-y-auto" @click="switchChat" v-if="chats">
    <li
      class="hover:bg-gray-200 text-sm p-2 rounded-md mb-1 last:mb-0 text-nowrap overflow-hidden text-ellipsis"
      v-for="c in list"
      :key="c.id"
      :class="c.id === currentChat.id ? 'bg-gray-200' : ''"
      :data-id="c.id"
      v-show="c.messages.length"
    >
      {{ c.messages[0]?.content }}
    </li>
  </ul>
</template>
