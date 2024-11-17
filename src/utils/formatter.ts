import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import de from 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale(de);

export const timeFormatter = (timestamp: number, format = 'YYYY/MM/DD') => {
  return dayjs.unix(timestamp).format(format);
};

export const fromNow = (timestamp: number) => {
  return dayjs(timeFormatter(timestamp)).fromNow();
};
