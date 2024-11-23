import { IndexedDBHelper } from './IndexedDBHelper';
import type { IChat } from '@/types';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';

const DB_NAME = 'CHATS_HISTORY';
const CHATS_NAME = 'CHATS';

const dbHelper = new IndexedDBHelper(DB_NAME, 1);

/**
 * Opens the database and creates the object store if it does not exist.
 */
export const dbInit = async () => {
  try {
    await dbHelper.openDB((db) => {
      if (!db.objectStoreNames.contains(CHATS_NAME)) {
        db.createObjectStore(CHATS_NAME, { keyPath: 'id' });
      }
    });
    console.log('ChatDB initialized successfully');
  } catch (error) {
    return Promise.reject('Error creating database: ' + error);
  }
};

/**
 * Saves a single chat record to the database.
 * @param {IChat} chat - The chat record to be saved.
 * @returns {Promise<void>}
 */
export const saveSingleChat = async (chat: IChat): Promise<void> => {
  dbHelper.runTransaction(await dbHelper.openDB(), CHATS_NAME, 'readwrite', (store) => {
    return new Promise<void>((resolve, reject) => {
      const request = store.put(chat);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
};

/**
 * Retrieves a chat record by its ID.
 * @param {string} chatId - The ID of the chat record.
 * @returns {Promise<IChat | undefined>}
 */
export const getChatById = async (chatId: string): Promise<IChat | undefined> => {
  return dbHelper.runTransaction(await dbHelper.openDB(), CHATS_NAME, 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.get(chatId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
};

export const getAllChat = async (): Promise<IChat[]> => {
  return new Promise<IChat[]>(async (resolve, reject) => {
    try {
      const db = await dbHelper.openDB();

      const request = db.transaction(CHATS_NAME, 'readonly').objectStore(CHATS_NAME).openCursor();
      const result: IChat[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue();
        } else {
          resolve(result);
        }
      };

      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Adds a message to the specified chat record.
 * @param {string} chatId - The ID of the chat record.
 * @param {ChatCompletionMessageParam} message - The message to be added.
 * @returns {Promise<void>}
 */
export const addMessageToChat = async (chatId: string, message: ChatCompletionMessageParam) => {
  const chat = await getChatById(chatId);
  if (chat) {
    chat.messages.push(message);
    chat.lastUpdated = Date.now();
    return saveSingleChat(chat);
  } else {
    return Promise.reject(new Error('Chat session not found'));
  }
};

/**
 * Deletes a chat record by its ID.
 * @param {string} chatId - The ID of the chat record.
 * @returns {Promise<{ status: boolean; msg: string }>}
 */
export const deleteChat = async (chatId: string): Promise<{ status: boolean; msg: string }> => {
  const chat = await getChatById(chatId);
  if (!chat) {
    return {
      status: false,
      msg: 'Chat does not exist',
    };
  }
  return dbHelper.runTransaction(await dbHelper.openDB(), CHATS_NAME, 'readwrite', (store) => {
    return new Promise<{ status: boolean; msg: string }>((resolve, reject) => {
      const request = store.delete(chatId);
      request.onsuccess = () => resolve({ status: true, msg: '' });
      request.onerror = () => resolve({ status: false, msg: request.error?.message ?? '' });
    });
  });
};
