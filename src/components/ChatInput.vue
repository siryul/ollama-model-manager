<template>
  <div class="txt p-2 bg-gray-100/90 backdrop-blur-xl rounded-lg border-double border">
    <!-- Image list display with delete functionality -->
    <ul
      class="flex gap-3 mb-2"
      v-if="imgList.length"
      @click="deleteImageHandler"
      ref="imgContainerRef"
    >
      <li v-for="(img, i) in imgList" :key="i" class="relative img-container">
        <span
          class="delete-icon absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 material-icons select-none cursor-pointer text-red-500 scale-50"
          :data-index="i"
          >indeterminate_check_box</span
        >
        <img
          :src="img"
          class="img rounded-md w-20 aspect-square object-cover border border-double"
        />
      </li>
    </ul>
    <!-- Text input area for user messages -->
    <textarea
      ref="txt"
      rows="1"
      placeholder="请输入内容..."
      class="txt border bg-transparent w-full border-none outline-none border-gray-300 rounded resize-none overflow-y-auto max-h-40 focus:outline-none"
      @input="autoExpand"
      v-model.trim="msg"
      @keydown="submit"
    />
    <div class="flex items-center text-gray-500 justify-between select-none">
      <div class="flex items-center relative">
        <!-- Button to toggle attachment options -->
        <label for="img">
          <span class="material-icons-outlined">image</span>
        </label>
        <input
          id="img"
          type="file"
          multiple
          accept="image/*"
          @change="imgInputHandler"
          class="hidden"
        />
      </div>
      <div class="flex items-center">
        <!-- Placeholder for microphone functionality -->
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
import { chat, uploadImage } from '@/api';
import { useModelsStore } from '@/stores/models';
import type { ChatCompletionChunk, ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import type { Stream } from 'openai/streaming.mjs';
import { useChatStore } from '@/stores/chat';
import Message from './Message';
import { getImgBase, url2base64 } from '@/utils';

const txt = ref<HTMLElement | null>(null);
const imgContainerRef = ref<HTMLElement | null>(null);
const msg = ref('');
const modelsStore = useModelsStore();
const chatStore = useChatStore();
const imgList = ref<string[]>([]);

// Emit event for submitting chat messages
const emit = defineEmits<{ submit: [value: Stream<ChatCompletionChunk>] }>();

/**
 * Automatically expands the textarea to fit the content.
 */
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

/**
 * Handles the submission of the chat message.
 * If the message includes images, they are included in the content.
 * @param {KeyboardEvent} e - The keyboard event triggering the submission.
 */
async function submit(e: KeyboardEvent) {
  if (msg.value === '') {
    return;
  }
  if (e.key === 'Enter' && e.shiftKey) {
    e.preventDefault();
    if (!modelsStore.currentModel) {
      // no model
      Message({ message: 'No model to use, please add a model first!', hidden: 3000000 });
      return;
    }

    let message: any[];
    if (imgList.value.length > 0) {
      const content: any[] = await Promise.all(
        imgList.value.map(async (u) => {
          // console.log(u);
          return {
            type: 'image_url',
            image_url: { url: await url2base64(u) },
          };
        }),
      );
      // console.log(content);

      message = content.concat({ type: 'text', text: msg.value });

      const imgMessage: any[] = imgList.value.map((i) => {
        return {
          type: 'image_url',
          image_url: { url: i },
        };
      });

      chatStore.updateChat({
        role: 'user',
        content: imgMessage.concat({ type: 'text', text: msg.value }),
      });
      imgList.value = [];
    } else {
      message = [{ role: 'user', content: msg.value }];
      chatStore.updateChat({ role: 'user', content: msg.value });
    }
    msg.value = '';
    const stream = await chat({
      model: modelsStore.currentModel.id,
      messages: [{ role: 'user', content: message }],
      stream: true,
    });
    emit('submit', stream as Stream<ChatCompletionChunk>);
  }
}

/**
 * Handles image input and converts it to a base64 string.
 * @param {Event} e - The change event from the file input.
 */
async function imgInputHandler(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    for (const file of files) {
      const resp = await uploadImage(file);
      if (resp.success) {
        imgList.value.push(`http://localhost:3000${resp.file.path}`);
      }
    }
  }
}

/**
 * Deletes an image from the list when the delete icon is clicked.
 * @param {MouseEvent} e - The mouse event from clicking the delete icon.
 */
function deleteImageHandler(e: MouseEvent) {
  const target = e.target as HTMLElement;
  e.stopPropagation();
  if (target.nodeName === 'SPAN') {
    const index = target.dataset.index;
    index && imgList.value.splice(+index, 1);
  }
}
</script>

<style scoped>
/* Hide scrollbar for the textarea */
.txt::-webkit-scrollbar {
  display: none;
}

/* Hide delete icon by default */
.material-icons.delete-icon {
  display: none;
}

/* Show delete icon on hover */
.img-container:hover .material-icons.delete-icon {
  display: inline-block;
}

/* Change border color on hover */
.img-container:hover img {
  border-color: #d1d5db;
}
</style>
