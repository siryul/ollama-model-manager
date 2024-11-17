import type { ChatCompletionRole } from 'openai/resources/chat/completions.mjs';

export interface IMessage {
  role: ChatCompletionRole;
  content: string;
}

export interface IChat {
  id: string;
  messages: Array<IMessage>;
}

export enum Category {
  all = 'all',
  embedding = 'embedding',
  vision = 'vision',
  tools = 'tools',
}

export interface ISearchModelParams {
  q?: string;
  c?: Category;
}
