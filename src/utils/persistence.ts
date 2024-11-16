import type { IChat } from '@/types';

const TOKEN = 'CHATS';

export const save = (data: Array<IChat>) => {
  localStorage.setItem(TOKEN, JSON.stringify(data));
};

export const recover = (): Array<IChat> => {
  const data = localStorage.getItem(TOKEN);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const deleteHistory = () => {
  localStorage.removeItem(TOKEN);
};
