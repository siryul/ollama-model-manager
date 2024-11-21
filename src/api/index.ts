import OpenAI from 'openai';
import ollama, { type DeleteRequest, type PullRequest } from 'ollama';
import request from '@/utils/request';
import type { ChatCompletionCreateParamsStreaming } from 'openai/resources/chat/completions.mjs';
import type { ISearchModelParams } from '@/types';

const url = new URL(import.meta.url);

const BASE_URL = url.origin + '/v1';

const openai = new OpenAI({
  baseURL: BASE_URL,
  apiKey: 'ollama', // required but unused
  dangerouslyAllowBrowser: true,
});

/**
 * Retrieves a list of available models.
 *
 * @returns {Promise<any>} A promise that resolves to the list of models.
 */
export const getModelList = async () => {
  const list = await openai.models.list();
  return list.data;
};

/**
 * Sends a chat request to the OpenAI API with the specified parameters.
 *
 * When including image data, you must provide either the image URL or its Base64 encoded string.
 * In this scenario, the `content` should be an array rather than a simple string.
 * Each element in the array must explicitly specify its type, such as 'text' or 'image_url'.
 * For 'image_url' type, an object containing the image URL must be provided.
 * Ensure that both text and image/audio data are clearly formatted for proper processing.
 *
 * @param {ChatCompletionCreateParamsStreaming} params - The parameters for creating a chat completion.
 * @returns {Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>>} The response.
 *
 * @example
 * // Example usage:
 * chat({
 *   model: 'llava',
 *   messages: [{
 *       role: 'user',
 *       content: [{
 *           type: 'image_url',
 *           image_url: { url: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSU...' },},
 *         {
 *           type: 'text',
 *           text: 'what is in this image?',
 *       }],
 *   }],
 *   stream: true,
 * }).then(async (resp) => {
 *   let res = '';
 *   for await (const chunk of resp) {
 *     res += chunk.choices[0].delta.content;
 *   }
 *   console.log(res);
 * });
 */
export const chat = async (params: ChatCompletionCreateParamsStreaming) => {
  return await openai.chat.completions.create(params);
};

/**
 * Retrieves details of a specific model.
 *
 * @param {string} model - The name or ID of the model to retrieve.
 * @returns {Promise<any>} A promise that resolves to the model details.
 */
export const retrieveModel = async (model: string) => {
  return await openai.models.retrieve(model);
};

/**
 * Searches for models based on the specified parameters.
 *
 * @param {ISearchModelParams} [params={}] - The parameters for searching models.
 * @returns {Promise<any>} A promise that resolves to the search results.
 */
export const searchModel = async (params: ISearchModelParams = {}) => {
  return await request.get('/api/search', { params });
};

/**
 * Initiates a pull request for a model using the Ollama API.
 *
 * @param {PullRequest} request - The pull request parameters.
 * @returns {Promise<AbortableAsyncIterator<ProgressResponse>>} A promise that resolves to the pull request response.
 */
export const pullModel = async (request: PullRequest) => {
  return await ollama.pull({ ...request, stream: true });
};

export const deleteModel = async (request: DeleteRequest) => {
  return await ollama.delete(request);
};

export const uploadImage = async (
  file: File,
): Promise<{
  success: boolean;
  file: {
    filename: string;
    path: string;
    size: number;
    mimetype: string;
  };
}> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    return await request.post('/api/upload', formData);
  } catch (error) {
    return Promise.reject(error);
  }
};
