<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ChatNav from '@/views/chat/nav.vue';
import ModelNav from '@/views/model/nav.vue';
import { useChatStore } from '@/stores/chat';

const router = useRouter();
const chatStore = useChatStore();

const navCompoents = {
  chat: ChatNav,
  model: ModelNav,
};

type nav = 'chat' | 'model';

const navType = ref<nav>('chat');

watch(
  () => router.currentRoute.value.meta,
  (meta) => {
    navType.value = meta.navbarType ? (meta.navbarType as nav) : 'chat';
  },
);

const backToChat = () => {
  router.push({ name: 'chat', params: { id: chatStore.currentChat.id } });
};
</script>

<template>
  <button
    class="absolute right-2 top-3 hover:bg-gray-200 rounded-md outline-1 flex items-center justify-center p-1"
  >
    <span class="material-icons text-gray-400">auto_awesome_mosaic</span>
  </button>
  <div
    @click="backToChat"
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
  <component :is="navCompoents[navType]"></component>
</template>

<style scoped>
.material-icons.logo {
  font-size: 2.25rem;
  line-height: 2.25rem;
}
</style>
