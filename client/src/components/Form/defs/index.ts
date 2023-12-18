import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactNode;
  name: string;
  kind: 'primary' | 'secondary' | 'danger' | 'success';
  _size: 'small' | 'medium' | 'large';
  noBorder: boolean;
  type: string;
  errors: any;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type PartialTextInputProps = Partial<TextInputProps>;

export interface FormControlProps {
  children: React.ReactNode;
  errors: { [key: string]: any };
  name: string;
  className?: string;
  disabled?: boolean;
}

export interface FormControlErrorProps {
  [key: string]: any;
}
