import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { IEnv } from './interfaces';

dayjs.locale('tr');

export const getEnv = (): IEnv => {
  if (process.env.NODE_ENV === 'development') return 'DEV';
  return 'PROD';
};

export const formatDate = (dateString: Date): string | null => {
  const date = dayjs(dateString);
  return date.isValid() ? date.format('DD.MM.YY - HH:mm') : null;
};
