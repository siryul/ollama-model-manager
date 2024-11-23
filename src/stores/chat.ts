import type { IChat } from '@/types';
import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { recover, save } from '@/utils/persistence';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';
import { addMessageToChat, dbInit, getAllChat, saveSingleChat } from '@/db';

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
    if (_chats.value.length && _chats.value[0].messages.length === 0) {
      return;
    }
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

  const init = async () => {
    // 读取本地存储，恢复历史记录
    let chat: IChat[] = [];
    try {
      await dbInit();
      const chat = await getAllChat();
      // setChat(recover()); // use localstorage
    } catch (error) {
      console.log('🚀 ~ chat init ~ error:', error);
    } finally {
      setChat(chat);
      addNewChat();
      switchChat(_chats.value[0].id);
    }
  };

  const updateChat = (msg: ChatCompletionMessageParam) => {
    const target = _chats.value.filter((c) => c === currentChat.value)[0];
    target.messages.push(msg);
    target.lastUpdated = Date.now();
    if (target.messages.length === 1) {
      // new chat, need add to db first
      saveSingleChat(JSON.parse(JSON.stringify(target)));
      return;
    }
    // save(_chats.value); // use localstorage
    addMessageToChat(target.id, msg);
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
