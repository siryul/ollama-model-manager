import axios from 'axios';
import * as cheerio from 'cheerio';

interface IModels {
  name: string;
  desc: string;
  tags: string[];
  count: string[];
}

enum Category {
  all = '',
  embedding = 'embedding',
  vision = 'vision',
  tools = 'tools',
}

export interface ISearchModelParams {
  q?: string;
  c?: Category;
}

const BASE_URL = 'https://ollama.com/search';

export const parseHtml = async (params: ISearchModelParams = {}) => {
  const result: IModels[] = [];

  const resp = await axios.get(BASE_URL, {
    params,
  });
  const $ = cheerio.load(resp.data);
  $('#searchresults li').each((i, el) => {
    const name = $(el).find('h2').find('span').text();
    // console.log(name)
    const desc = $(el).find('.mb-1 p').text();
    // console.log(desc)
    const tags: string[] = [];
    $(el)
      .find('.space-x-2 span')
      .each((i, e) => {
        tags.push($(e).text());
      });
    // console.log(tags)
    const count: string[] = [];
    $(el)
      .find('p.my-1 span')
      .each((i, e) => {
        const item = $(e).find('span').text();
        item && count.push(item);
      });
    // console.log(count.filter(i => i !== ''))
    result.push({ name, desc, tags, count });
  });
  return result;
};
