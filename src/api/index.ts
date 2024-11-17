import OpenAI from 'openai';
import request from '@/utils/request';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';
import type { ISearchModelParams } from '@/types';

const url = new URL(import.meta.url);

const BASE_URL = url.origin + '/v1';

const openai = new OpenAI({
  baseURL: BASE_URL,
  apiKey: 'ollama', // required but unused
  dangerouslyAllowBrowser: true,
});

export const getModelList = async () => {
  const list = await openai.models.list();
  return list.data;
};

export const chat = async (params: ChatCompletionCreateParamsBase) => {
  return await openai.chat.completions.create(params);
};

export const retrieveModel = async (model: string) => {
  return await openai.models.retrieve(model);
};

export const searchModel = async (params: ISearchModelParams = {}) => {
  return await request.get('/api/search', { params });
};
