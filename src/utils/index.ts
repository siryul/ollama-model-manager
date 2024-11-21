import axios from 'axios';

export const getImgBase = (img: HTMLImageElement, type: string) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx?.drawImage(img, 0, 0);

  return canvas.toDataURL(type);
};

export const url2base64 = async (url: string): Promise<string> => {
  const resp = await axios.get(url, { responseType: 'arraybuffer' });

  return `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data)))}`;
};
