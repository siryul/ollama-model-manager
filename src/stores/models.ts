import type { Model } from 'openai/resources/index.mjs';
import { defineStore } from 'pinia';
import { readonly, ref, computed } from 'vue';
import { getModelList } from '@/api';
import { recoverModel, saveModel } from '@/utils/persistence';

/**
 * A store for managing models.
 */
export const useModelsStore = defineStore('models', () => {
  const _list = ref<Model[]>([]);
  const currentUseId = ref<string>(''); // '' indicates no model is currently in use; a model must be added first.

  /**
   * Computed property to get the current model based on the currentUseId.
   * @returns {Model | null} The current model or null if no model is selected.
   */
  const currentModel = computed<Model | null>(() => {
    const res = _list.value.filter((i) => i.id === currentUseId.value);
    return res.length > 0 ? res[0] : null;
  });

  /**
   * Sets the list of models.
   * @param {Model[]} l - The list of models to set.
   */
  const setList = (l: Model[]) => {
    _list.value = l;
  };

  /**
   * Deletes a model from the list by its ID.
   * @param {string} id - The ID of the model to delete.
   */
  const deleteModel = (id: string) => {
    const newList = _list.value.filter((i) => i.id !== id);
    setList(newList);
  };

  /**
   * Switches the current model to the one with the specified ID.
   * Throws an error if the ID is not valid.
   * @param {string} id - The ID of the model to switch to.
   * @throws {RangeError} If the ID is not valid.
   */
  const switchModel = (id: string) => {
    if (_list.value.some((i) => i.id === id)) {
      currentUseId.value = id;
      saveModel(currentModel.value!);
    } else {
      throw new RangeError(`${id} is not a valid value`);
    }
  };

  /**
   * Updates the list of models by fetching from the API.
   */
  const updateList = async () => {
    const list = await getModelList();
    setList(list);
  };

  /**
   * Initializes the store by updating the model list and setting the first model as the current model if available.
   */
  const init = async () => {
    await updateList();
    const re = recoverModel();
    if (re && _list.value.some((l) => l.id === re.id)) {
      switchModel(re.id);
    } else if (_list.value.length) {
      switchModel(_list.value[0].id);
    } else {
      // TODO： 提醒无可用模型，需先添加模型
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
