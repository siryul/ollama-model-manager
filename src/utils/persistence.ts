import type { IChat } from '@/types';
import type { Model } from 'openai/resources/models.mjs';

const TOKEN_CHATS = 'CHATS';
const TOKEN_MODELS = 'MODELS';

export const save = (data: Array<IChat>) => {
  localStorage.setItem(TOKEN_CHATS, JSON.stringify(data));
};

export const recover = (): Array<IChat> => {
  const data = localStorage.getItem(TOKEN_CHATS);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const deleteHistory = () => {
  localStorage.removeItem(TOKEN_CHATS);
};

export const saveModel = (m: Model) => {
  localStorage.setItem(TOKEN_MODELS, JSON.stringify(m));
};

export const recoverModel = (): Model | null => {
  const res = localStorage.getItem(TOKEN_MODELS);
  if (res) {
    return JSON.parse(res);
  } else {
    return null;
  }
};
