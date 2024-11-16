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
  <span class="material-icons text-zinc-500"> auto_awesome_motion </span>
</template>

<script lang="ts" setup>
import { useModelsStore } from '@/stores/models';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const showList = ref(false);

const modelsStore = useModelsStore();
const { list, currentModel } = storeToRefs(modelsStore);

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
</script>
