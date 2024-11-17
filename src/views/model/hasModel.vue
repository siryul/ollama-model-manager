<script setup lang="ts">
import { useModelsStore } from '@/stores/models';
import { storeToRefs } from 'pinia';
import { fromNow } from '@/utils/formatter';

const modelsStore = useModelsStore();
const { list } = storeToRefs(modelsStore);

const deleteModel = (e: MouseEvent) => {
  e.stopPropagation();
  const target = e.target as HTMLElement;
  if (target.innerText !== 'delete') {
    return;
  }
  // TODO deleteModel
  console.log('delete');
};
</script>

<template>
  <ul class="m-3 border rounded-md overflow-hidden" @click="deleteModel">
    <li class="grid grid-cols-6 justify-between items-center p-2 bg-stone-200 font-medium">
      <span class="col-span-2">名称</span>
      <span class="col-span-2">所属者</span>
      <span class="text-center">操作</span>
      <span class="place-self-end">安装时间</span>
    </li>
    <li
      v-for="l in list"
      :key="l.id"
      class="grid grid-cols-6 justify-between items-center p-2 odd:bg-stone-100"
    >
      <span class="col-span-2">{{ l.id }}</span>
      <span class="col-span-2">{{ l.owned_by }}</span>
      <span class="material-icons select-none cursor-pointer text-red-500 place-self-center"
        >delete</span
      >
      <span class="text-sm place-self-end text-zinc-400">{{ fromNow(l.created) }}</span>
    </li>
  </ul>
</template>
