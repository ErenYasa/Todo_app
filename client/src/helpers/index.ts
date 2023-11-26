import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { IEnv } from './interfaces';
import { ReactNode } from 'react';

dayjs.locale('tr');

export const getEnv = (): IEnv => {
  if (process.env.NODE_ENV === 'development') return 'DEV';
  return 'PROD';
};

export const formatDate = (dateString: Date): string | null => {
  const date = dayjs(dateString);
  return date.isValid() ? date.format('DD.MM.YY - HH:mm') : null;
};

export const highlightText = (text: string, highlight: string): ReactNode => {
  const regEx = new RegExp(text, 'gi');

  const newText = highlight.replace(regEx, function (match) {
    return '<span class="highlight" style="font-weight: 600;">' + match + '</span>';
  });

  return newText;
};

// console.log(highlightText('etin par', 'Bu örnekte, JavaScript ile belirli bir metin parçasını vurguluyoruz.'));
