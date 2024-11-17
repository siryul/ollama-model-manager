<script setup lang="ts">
import { ref } from 'vue';
import { searchModel } from '@/api';
import { useModelsStore } from '@/stores/models';
import { storeToRefs } from 'pinia';
import { Category } from '@/types';

const modelsStore = useModelsStore();
const { list } = storeToRefs(modelsStore);

const searchRes = ref<Array<{ name: string; tags: string[]; desc: string; count: string[] }>>([]);
const selectedType = ref<Category>(Category.all);
const keyword = ref<string>('');

const search = async () => {
  searchRes.value = (await searchModel({ q: keyword.value, c: selectedType.value })) as any;
};

search();

const downloadModel = async () => {
  // TODO download model
};

const tagIcon = ['arrow_downward', 'tag', 'access_time'];

const switchType = async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.nodeName === 'LI') {
    if (target.innerText === selectedType.value) {
      return;
    }
    selectedType.value = target.innerText as any;
    search();
  }
};

const searchHandler = async (e: KeyboardEvent) => {
  if (e.key !== 'Enter') {
    return;
  }
  if (keyword) {
    search();
  }
};
</script>

<template>
  <div class="relative h-full overflow-hidden">
    <div
      class="absolute left-0 top-0 right-0 z-10 flex flex-col justify-center items-center pt-8 pb-4 bg-white/80 backdrop-blur-xl"
    >
      <div class="relative flex items-center w-2/3 z-20">
        <span class="material-icons absolute left-2 text-gray-400 z-20">search</span>
        <input
          type="text"
          class="border border-double rounded-full h-10 w-full pl-9 pr-5 bg-gray-100"
          placeholder="搜索"
          v-model.trim="keyword"
          @keydown="searchHandler"
        />
      </div>
      <ul class="mt-8 border border-double rounded-md flex cursor-pointer" @click="switchType">
        <li
          v-for="c in Object.values(Category)"
          class="rounded-md pl-4 pr-4"
          :class="selectedType === c ? 'bg-gray-100' : ''"
        >
          {{ c }}
        </li>
      </ul>
    </div>
    <ul class="overflow-y-auto h-full p-5 pt-40" v-if="searchRes" style="scrollbar-width: none">
      <li
        v-for="i in searchRes"
        :key="i.name"
        class="mt-4 p-2 border border-double rounded-md bg-gray-50/70"
      >
        <div class="relative">
          <h1 class="font-medium text-lg">{{ i.name }}</h1>
          <span
            class="material-icons absolute right-1 top-1 select-none"
            :class="
              list.some((m) => m.id.split(':')[0] === i.name)
                ? 'text-green-500 hover:text-green-500'
                : 'text-orange-400 hover:text-orange-600 cursor-pointer'
            "
            >{{
              list.some((m) => m.id.split(':')[0] === i.name)
                ? 'check_circle'
                : 'download_for_offline'
            }}</span
          >
          <p>
            <span
              v-for="t in i.tags"
              :key="t"
              class="mr-2 last:mr-0 text-xs bg-blue-100 text-blue-600 p-1 rounded-md select-none"
              >{{ t }}</span
            >
          </p>
          <p class="mt-2 mb-2">{{ i.desc }}</p>
        </div>
        <div class="flex">
          <span
            v-for="(c, index) in i.count"
            class="mr-6 last:mr-0 text-sm text-gray-400 select-none flex items-center"
          >
            <span class="material-icons scale-75">{{ tagIcon[index] }}</span
            >{{ c }}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>
