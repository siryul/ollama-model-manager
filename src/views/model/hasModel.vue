<script setup lang="ts">
import { useModelsStore } from '@/stores/models';
import { storeToRefs } from 'pinia';
import { fromNow } from '@/utils/formatter';
import { deleteModel } from '@/api';

const modelsStore = useModelsStore();
const { list } = storeToRefs(modelsStore);

const deleteModelHandler = async (e: MouseEvent) => {
  e.stopPropagation();
  const target = e.target as HTMLElement;
  if (target.innerText !== 'delete') {
    return;
  }
  const resp = await deleteModel({ model: target.dataset.name! });
  if (resp.status === 'success') {
    modelsStore.updateList();
  }
};
</script>

<template>
  <ul class="m-5 border rounded-md overflow-hidden" @click="deleteModelHandler" v-if="list.length">
    <li class="grid grid-cols-6 justify-between items-center p-2 bg-gray-100 font-medium">
      <span class="col-span-2">名称</span>
      <span class="col-span-2">所属者</span>
      <span class="text-center">操作</span>
      <span class="place-self-end">安装时间</span>
    </li>
    <li
      v-for="l in list"
      :key="l.id"
      class="grid grid-cols-6 justify-between items-center p-2 odd:bg-gray-50"
    >
      <span class="col-span-2">{{ l.id }}</span>
      <span class="col-span-2">{{ l.owned_by }}</span>
      <span
        class="material-icons select-none cursor-pointer text-red-500 place-self-center hover:bg-gray-100 rounded-md"
        :data-name="l.id"
        >delete</span
      >
      <span class="text-sm place-self-end text-zinc-400">{{ fromNow(l.created) }}</span>
    </li>
  </ul>
  <div v-else class="w-full h-full flex items-center justify-center select-none">
    暂无可用模型，先去添加吧
  </div>
</template>
