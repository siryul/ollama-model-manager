<template>
  <div class="txt p-2 bg-gray-100 rounded-md border-double border">
    <textarea
      ref="txt"
      rows="1"
      placeholder="请输入内容..."
      class="txt border bg-transparent w-full border-none outline-none border-gray-300 rounded resize-none overflow-y-auto max-h-40 focus:outline-none"
      @input="autoExpand"
    ></textarea>
    <div class="flex items-center text-gray-500 justify-between">
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

const txt = ref<HTMLElement | null>(null);

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
</script>

<style scoped>
.txt::-webkit-scrollbar {
  display: none;
}
</style>
