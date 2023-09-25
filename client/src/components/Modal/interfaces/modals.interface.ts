import { ReactNode } from 'react';

export interface IBaseModalProps {
  name: string;
  type?: 'confirm';
  className?: string;
  children: ReactNode;
}
