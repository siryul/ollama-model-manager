import type { IChat, IMessage } from '@/types';
import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useChatStore = defineStore('chat', () => {
  const _chats = ref<Array<IChat>>([]);
  const _currentChatId = ref<string | null>(null);

  const currentChat = computed(() => {
    return _chats.value.filter((c) => c.id === _currentChatId.value)[0];
  });

  const setChat = (chats: Array<IChat>) => {
    _chats.value = chats;
  };

  const setCurrentChatId = (id: string) => {
    _currentChatId.value = id;
  };

  const addNewChat = () => {
    const oldChat = _chats.value.filter((c) => c.messages.length);
    const nc: IChat = {
      id: uuidv4(),
      messages: [],
    };
    oldChat.unshift(nc);
    setChat(oldChat);
  };

  const switchChat = (id: string) => {
    const target = _chats.value.filter((c) => c.id === id);
    if (target) {
      setCurrentChatId(target[0].id);
    } else {
      throw new Error(`聊天记录 ${id} 不存在`);
    }
  };

  const init = () => {
    // TODO 读取本地存储，恢复历史记录
    addNewChat();
    switchChat(_chats.value[0].id);
  };

  const updateChat = (msg: IMessage) => {
    const target = _chats.value.filter((c) => c === currentChat.value)[0];
    target.messages.push(msg);
  };

  return {
    chats: readonly(_chats),
    currentChat,
    addNewChat,
    init,
    switchChat,
    setCurrentChatId,
    updateChat,
  };
});
