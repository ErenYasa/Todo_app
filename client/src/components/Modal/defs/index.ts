import { ReactNode } from 'react';

export interface BaseModalProps {
  name: string;
  children: ReactNode;
  className?: string;
  title?: string;
  type?: 'confirm';
  kind?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'large';
}
