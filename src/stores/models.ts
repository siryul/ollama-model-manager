import type { Model } from 'openai/resources/index.mjs';
import { defineStore } from 'pinia';
import { readonly, ref, computed } from 'vue';
import { getModelList } from '@/api';

export const useModelsStore = defineStore('models', () => {
  const _list = ref<Model[]>([]);
  const currentUseId = ref<string>(''); // '' 代表无模型可用，需先添加模型

  const currentModel = computed<Model | null>(() => {
    const res = _list.value.filter((i) => i.id === currentUseId.value);
    return res.length > 0 ? res[0] : null;
  });

  const setList = (l: Model[]) => {
    _list.value = l;
  };

  const deleteModel = (id: string) => {
    const newList = _list.value.filter((i) => i.id !== id);
    setList(newList);
  };

  const switchModel = (id: string) => {
    if (_list.value.some((i) => i.id === id)) {
      currentUseId.value = id;
    } else {
      throw new RangeError(`${id} is not a valid value`);
    }
  };

  const updateList = async () => {
    const list = await getModelList();
    setList(list);
  };

  const init = async () => {
    await updateList();
    if (_list.value.length) {
      switchModel(_list.value[0].id);
    }
  };

  return {
    list: readonly(_list),
    currentModel,
    setList,
    deleteModel,
    switchModel,
    updateList,
    init,
  };
});
