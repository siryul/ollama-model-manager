import OpenAI from 'openai';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';

const url = new URL(import.meta.url);

const BASE_URL = url.origin + '/v1';

const openai = new OpenAI({
  baseURL: BASE_URL,
  apiKey: 'ollama', // required but unused
  dangerouslyAllowBrowser: true,
});

export const modelList = async () => {
  const list = await openai.models.list();
  return list.data;
};

export const chat = async (params: ChatCompletionCreateParamsBase) => {
  return await openai.chat.completions.create(params);
};
