<template>
  <div
    class="models-selector relative flex items-center cursor-default hover:bg-gray-100 p-1 rounded-md"
    @click="swtichShowList"
  >
    {{ currentModel ? currentModel.id : '' }}
    <span class="material-icons text-zinc-400"> chevron_right </span>
    <ul
      class="absolute top-full left-1/2 -translate-x-1/2 translate-y-2 rounded-lg bg-stone-200/80 backdrop-blur-xl p-1 shadow-lg border border-double border-stone-300"
      v-if="showList"
      @click="switchModel"
    >
      <li v-for="m in list" :key="m.id" class="hover:bg-stone-300/80 p-2 rounded-lg">{{ m.id }}</li>
    </ul>
  </div>
  <div class="flex items-center gap-4 select-none">
    <button
      class="flex items-center hover:bg-stone-100 p-1 rounded-lg cursor-default"
      @click="newChat"
    >
      <span class="material-icons text-zinc-500 scale-75"> content_copy </span>
    </button>
    <router-link
      :to="{ name: 'hasModel' }"
      class="flex items-center hover:bg-stone-100 p-1 rounded-lg cursor-default"
    >
      <span class="material-icons text-zinc-500 scale-75"> extension </span>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from '@/stores/chat';
import { useModelsStore } from '@/stores/models';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showList = ref(false);

const modelsStore = useModelsStore();
const { list, currentModel } = storeToRefs(modelsStore);
const chatStore = useChatStore();
const router = useRouter();

const swtichShowList = () => {
  showList.value = !showList.value;
};

const switchModel = (e: Event) => {
  if (e instanceof PointerEvent) {
    const target = e.target as HTMLElement;
    if (target && target.nodeName === 'LI') {
      modelsStore.switchModel(target.innerText);
    }
  }
};

const newChat = () => {
  chatStore.addNewChat();
  chatStore.switchChat(chatStore.chats[0].id);
  router.push({ name: 'chat', params: { id: chatStore.chats[0].id } });
};
</script>
