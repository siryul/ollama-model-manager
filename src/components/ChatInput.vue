<template>
  <div class="txt p-2 bg-gray-100/90 backdrop-blur-xl rounded-lg border-double border">
    <textarea
      ref="txt"
      rows="1"
      placeholder="请输入内容..."
      class="txt border bg-transparent w-full border-none outline-none border-gray-300 rounded resize-none overflow-y-auto max-h-40 focus:outline-none"
      @input="autoExpand"
      v-model.trim="msg"
      @keydown="submit"
    ></textarea>
    <div class="flex items-center text-gray-500 justify-between select-none">
      <div class="flex items-center">
        <span class="material-icons">add</span>
      </div>
      <div class="flex items-center">
        <span class="material-icons mr-2">mic</span>
        <span class="material-icons scale-75 voice p-2 bg-slate-700 rounded-full text-slate-50"
          >record_voice_over</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { chat } from '@/api';
import { useModelsStore } from '@/stores/models';
import type { ChatCompletionChunk, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import type { Stream } from 'openai/streaming.mjs';
import { useChatStore } from '@/stores/chat';

const txt = ref<HTMLElement | null>(null);
const msg = ref('');
const modelsStore = useModelsStore();
const chatStore = useChatStore();

const emit = defineEmits<{ submit: [value: Stream<ChatCompletionChunk>] }>();

function autoExpand() {
  if (txt.value) {
    txt.value.style.height = 'auto';
    const maxHeight = parseInt(getComputedStyle(txt.value).maxHeight, 10);
    const contentHeight = txt.value.scrollHeight;

    if (contentHeight <= maxHeight) {
      txt.value.style.height = `${contentHeight}px`;
    } else {
      txt.value.style.height = `${maxHeight}px`;
    }
  }
}

async function submit(e: KeyboardEvent) {
  if (msg.value === '') {
    return;
  }
  if (e.key === 'Enter' && e.shiftKey) {
    e.preventDefault();
    chatStore.updateChat({ role: 'user', content: msg.value });
    msg.value = '';
    const stream = await chat({
      model: modelsStore.currentModel!.id,
      messages: chatStore.currentChat.messages as ChatCompletionMessageParam[],
      stream: true,
    });
    emit('submit', stream as Stream<ChatCompletionChunk>);
  }
}
</script>

<style scoped>
.txt::-webkit-scrollbar {
  display: none;
}
</style>
