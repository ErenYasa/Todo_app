import { ReactNode } from 'react';

export interface IBaseModalProps {
  type?: 'confirm';
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}
