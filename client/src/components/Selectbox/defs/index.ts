import { ReactNode } from 'react';

export type SelectboxContextProps = {
  value: {
    selectedVal: string;
    setSelectedVal: (val: string) => void;
  };
  isListOpen: boolean;
  setIsListOpen: (val: boolean) => void;
  showItemCount?: string;
};

export type SelectboxProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'ghost';
  kind?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  noBorder?: boolean;
  showItemCount?: string;
  errors?: any;
};

export type SelectboxListProps = {
  children: ReactNode;
};

export type SelectboxItemProps = {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  onClick?: (value: string) => void;
};
