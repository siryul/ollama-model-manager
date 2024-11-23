import axios from 'axios';

export const getImgBase = (img: HTMLImageElement, type: string) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx?.drawImage(img, 0, 0);

  return canvas.toDataURL(type);
};

function uint8Array2Base64(uint8Array: Uint8Array): string {
  let binary = '';

  uint8Array.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export const url2base64 = async (url: string): Promise<string> => {
  const resp = await axios.get(url, { responseType: 'arraybuffer' });
  const type = resp.headers['Content-Type'] ?? 'image/jpeg';

  return `data:${type};base64,${uint8Array2Base64(new Uint8Array(resp.data))}`;
};
